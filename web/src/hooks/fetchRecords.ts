import type {
  SelectRecordsQuery,
  SelectRecordsQueryVariables,
} from "@/generated/graphql";
import { type GraphQLClientQuery, gql } from "@solid-primitives/graphql";
import {
  type Accessor,
  type ResourceReturn,
  createEffect,
  createSignal,
} from "solid-js";

type Records = Exclude<
  SelectRecordsQuery["users_by_pk"],
  undefined | null
>["records"];

const fetchRecordsQuery = gql`
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

export default function useFetchRecords(
  gqlClient: Accessor<GraphQLClientQuery | undefined>,
): [
  ResourceReturn<SelectRecordsQuery | undefined> | undefined,
  {
    records: Accessor<Records>;
    last: Accessor<boolean>;
  },
  {
    setUserId: (userId: string) => void;
    next: () => void;
    reset: () => void;
  },
] {
  const NUMBER_OF_PAGES = 10;
  const [queryVars, setQueryVars] = createSignal<
    SelectRecordsQueryVariables | undefined
  >();
  const [records, setRecords] = createSignal<Records>([]);
  const [last, setLast] = createSignal(false);

  const queryResource = gqlClient?.()?.<
    SelectRecordsQuery,
    SelectRecordsQueryVariables
  >(fetchRecordsQuery, queryVars);

  createEffect(() => {
    const r = queryResource?.[0]?.()?.users_by_pk?.records ?? [];
    if (r.length > 0) {
      setRecords((p) => [...p, ...r]);
    }
    setLast(() => r.length === 0);
  });

  return [
    queryResource,
    {
      records,
      last,
    },
    {
      setUserId: (userId) => {
        setQueryVars(() => ({
          userId,
          limit: NUMBER_OF_PAGES,
          offset: 0,
        }));
      },
      next: () => {
        setQueryVars((p) => ({
          userId: p?.userId ?? "",
          limit: NUMBER_OF_PAGES,
          offset: (p?.offset ?? 0) + NUMBER_OF_PAGES,
        }));
      },
      reset: () => {
        setQueryVars((p) => ({
          userId: p?.userId ?? "",
          limit: NUMBER_OF_PAGES,
          offset: 0,
        }));
        setRecords(() => []);
        setLast(() => false);
      },
    },
  ];
}
