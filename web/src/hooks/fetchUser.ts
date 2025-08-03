import type {
  FetchUserQuery,
  FetchUserQueryVariables,
} from "@/generated/graphql";
import { type GraphQLClientQuery, gql } from "@solid-primitives/graphql";
import { type Accessor, type ResourceReturn, createSignal } from "solid-js";

const fetchUserQuery = gql`
query FetchUser($userId: String!) {
  users_by_pk(id: $userId) {
    id
    name
  }
}
`;

export default function useFetchUser(
  gqlClient: Accessor<GraphQLClientQuery | undefined>,
): [
  ResourceReturn<FetchUserQuery | undefined> | undefined,
  {
    setUserId: (userId: string) => void;
  },
] {
  const [queryVars, setQueryVars] = createSignal<
    FetchUserQueryVariables | undefined
  >();

  const queryResource = gqlClient?.()?.<
    FetchUserQuery,
    FetchUserQueryVariables
  >(fetchUserQuery, queryVars);

  return [
    queryResource,
    {
      setUserId: (userId) => {
        setQueryVars(() => ({
          userId,
        }));
      },
    },
  ];
}
