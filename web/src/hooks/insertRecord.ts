import type {
  InsertRecordMutation,
  InsertRecordMutationVariables,
} from "@/generated/graphql";
import { type GraphQLClientQuery, gql } from "@solid-primitives/graphql";
import { type Accessor, type ResourceReturn, createSignal } from "solid-js";

const insertRecordMutation = gql`
mutation InsertRecord($playedAt: date!, $sgfText: String!) {
  insert_records_one(object: {played_at: $playedAt, sgf_text: $sgfText}) {
    id
  }
}
`;

export default function useInsertRecord(
  gqlClient: Accessor<GraphQLClientQuery | undefined>,
): [
  ResourceReturn<InsertRecordMutation | undefined> | undefined,
  {
    setData: (playedAt: string, sgfText: string) => void;
  },
] {
  const [queryVars, setQueryVars] = createSignal<
    InsertRecordMutationVariables | undefined
  >();
  return [
    gqlClient?.()?.<InsertRecordMutation, InsertRecordMutationVariables>(
      insertRecordMutation,
      queryVars,
    ),
    {
      setData: (playedAt, sgfText) => {
        setQueryVars(() => ({
          playedAt,
          sgfText,
        }));
      },
    },
  ];
}
