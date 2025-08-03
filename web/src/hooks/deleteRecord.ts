import type {
  DeleteRecordMutation,
  DeleteRecordMutationVariables,
} from "@/generated/graphql";
import { type GraphQLClientQuery, gql } from "@solid-primitives/graphql";
import { type Accessor, type ResourceReturn, createSignal } from "solid-js";

const deleteRecordMutation = gql`
mutation DeleteRecord($id: Int!) {
  delete_records_by_pk(id: $id) {
    id
  }
}
`;

export default function useDeleteRecord(
  gqlClient: Accessor<GraphQLClientQuery | undefined>,
): [
  ResourceReturn<DeleteRecordMutation | undefined> | undefined,
  {
    setData: (id: number) => void;
  },
] {
  const [queryVars, setQueryVars] = createSignal<
    DeleteRecordMutationVariables | undefined
  >();
  return [
    gqlClient?.()?.<DeleteRecordMutation, DeleteRecordMutationVariables>(
      deleteRecordMutation,
      queryVars,
    ),
    {
      setData: (id) => {
        setQueryVars(() => ({
          id,
        }));
      },
    },
  ];
}
