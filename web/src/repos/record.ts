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
query SelectRecords($userId: String!) {
  users_by_pk(id: $userId) {
    records {
      id
      sgf_text
    }
  }
}
`;

const insertMutation = gql`
mutation InsertRecord($sgfText: String!) {
  insert_records_one(object: {sgf_text: $sgfText}) {
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

function createRecordRepo(): {
  select: [
    Accessor<ResourceReturn<SelectRecordsQuery | undefined> | undefined>,
    Setter<string | undefined>,
  ];
  insert: [
    Accessor<ResourceReturn<InsertRecordMutation | undefined> | undefined>,
    Setter<string | undefined>,
  ];
  delete: [
    Accessor<ResourceReturn<InsertRecordMutation | undefined> | undefined>,
    Setter<number | undefined>,
  ];
} {
  const [client] = useGqlClient();

  // Select
  const [userId, setUserId] = createSignal<string | undefined>();
  const records = createMemo(() => {
    const uid = userId();
    if (uid) {
      return client?.()?.<SelectRecordsQuery, SelectRecordsQueryVariables>(
        selectQuery,
        {
          userId: uid,
        },
      );
    }
  });

  // Insert
  const [sgfText, setSgfText] = createSignal<string | undefined>();
  const insertResult = createMemo(() => {
    const text = sgfText();
    if (text) {
      return client?.()?.<InsertRecordMutation, InsertRecordMutationVariables>(
        insertMutation,
        {
          sgfText: text,
        },
      );
    }
  });
  createEffect(() => {
    const r = insertResult();
    if (r && r[0].state === "ready") {
      records()?.[1].refetch();
    }
  });

  // Delete
  const [deleteRecordId, setDeleteRecordId] = createSignal<
    number | undefined
  >();
  const deleteResult = createMemo(() => {
    const drid = deleteRecordId();
    if (drid) {
      return client?.()?.<DeleteRecordMutation, DeleteRecordMutationVariables>(
        deleteMutation,
        {
          id: drid,
        },
      );
    }
  });
  createEffect(() => {
    const r = deleteResult();
    if (r && r[0].state === "ready") {
      records()?.[1].refetch();
    }
  });

  return {
    select: [records, setUserId],
    insert: [insertResult, setSgfText],
    delete: [deleteResult, setDeleteRecordId],
  };
}

const RecordRepo = createRoot(createRecordRepo);

export function useRecordRepo() {
  return RecordRepo;
}
