import { useGqlClient } from "@/drivers/gqlClient";
import type {
  DeleteRecordMutation,
  DeleteRecordMutationVariables,
  InsertRecordMutation,
  InsertRecordMutationVariables,
  SelectRecordsQuery,
  SelectRecordsQueryVariables,
} from "@/generated/graphql";
import { gql } from "@solid-primitives/graphql";
import {
  type Accessor,
  type ResourceReturn,
  type Setter,
  createEffect,
  createMemo,
  createRoot,
  createSignal,
} from "solid-js";

const selectQuery = gql`
query SelectRecords($userId: String!, $limit: Int!, $offset: Int!) {
  users_by_pk(id: $userId) {
    records(order_by: {played_at: desc}, limit: $limit, offset: $offset) {
      id
      played_at
      sgf_text
    }
  }
}
`;

const insertMutation = gql`
mutation InsertRecord($playedAt: date!, $sgfText: String!) {
  insert_records_one(object: {played_at: $playedAt, sgf_text: $sgfText}) {
    id
  }
}
`;

const deleteMutation = gql`
mutation DeleteRecord($id: Int!) {
  delete_records_by_pk(id: $id) {
    id
  }
}
`;

type Records = Exclude<
  SelectRecordsQuery["users_by_pk"],
  undefined | null
>["records"];

function createRecordRepo(): {
  setUserId: Setter<string | undefined>;
  select: [
    Accessor<ResourceReturn<SelectRecordsQuery | undefined> | undefined>,
    Accessor<Records>,
    Accessor<boolean>,
    Setter<number>,
  ];
  insert: [
    Accessor<ResourceReturn<InsertRecordMutation | undefined> | undefined>,
    Setter<[Date, string] | undefined>,
  ];
  delete: [
    Accessor<ResourceReturn<InsertRecordMutation | undefined> | undefined>,
    Setter<number | undefined>,
  ];
} {
  const [client] = useGqlClient();
  const [userId, setUserId] = createSignal<string | undefined>();

  // Select
  const NUMBER_OF_PAGES = 10;
  const [selectedPage, setSelectedPage] = createSignal(0);
  const [records, setRecords] = createSignal<Records>([]);
  const [last, setLast] = createSignal(false);
  const recordsResource = createMemo(() => {
    const page = selectedPage();
    if (page === 0) {
      setRecords([]);
      setLast(false);
    }

    const uid = userId();
    if (uid) {
      return client?.()?.<SelectRecordsQuery, SelectRecordsQueryVariables>(
        selectQuery,
        {
          userId: uid,
          limit: NUMBER_OF_PAGES,
          offset: page * NUMBER_OF_PAGES,
        },
      );
    }
  });
  createEffect(() => {
    const r = recordsResource?.()?.[0]?.()?.users_by_pk?.records ?? [];
    if (r.length > 0) {
      setRecords((p) => [...p, ...r]);
    }
    setLast(r.length === 0);
  });

  // Insert
  const [insertParams, setInsertParams] = createSignal<
    [Date, string] | undefined
  >();
  const insertResult = createMemo(() => {
    const uid = userId();
    const params = insertParams();
    if (uid && params) {
      return client?.()?.<InsertRecordMutation, InsertRecordMutationVariables>(
        insertMutation,
        {
          playedAt: params[0],
          sgfText: params[1],
        },
      );
    }
  });
  createEffect(() => {
    const r = insertResult();
    if (r && !r[0].loading) {
      setSelectedPage(0);
    }
  });

  // Delete
  const [deleteRecordId, setDeleteRecordId] = createSignal<
    number | undefined
  >();
  const deleteResult = createMemo(() => {
    const uid = userId();
    const param = deleteRecordId();
    if (uid && param) {
      return client?.()?.<DeleteRecordMutation, DeleteRecordMutationVariables>(
        deleteMutation,
        {
          id: param,
        },
      );
    }
  });
  createEffect(() => {
    const r = deleteResult();
    if (r && !r[0].loading) {
      const id = r[0]?.()?.delete_records_by_pk?.id;
      if (id) {
        setRecords((p) => p.filter((d) => d.id !== id));
      }
    }
  });

  // Clean up
  createEffect(() => {
    if (userId() === undefined) {
      setSelectedPage(0);
      setLast(false);
      setRecords([]);
    }
  });

  return {
    setUserId,
    select: [recordsResource, records, last, setSelectedPage],
    insert: [insertResult, setInsertParams],
    delete: [deleteResult, setDeleteRecordId],
  };
}

const RecordRepo = createRoot(createRecordRepo);

export function useRecordRepo() {
  return RecordRepo;
}
