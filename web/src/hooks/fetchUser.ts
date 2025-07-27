import type {
  SelectUserQuery,
  SelectUserQueryVariables,
} from "@/generated/graphql";
import { type GraphQLClientQuery, gql } from "@solid-primitives/graphql";
import { type Accessor, type ResourceReturn, createSignal } from "solid-js";

const fetchUserQuery = gql`
query SelectUser($userId: String!) {
  users_by_pk(id: $userId) {
    id
    name
  }
}
`;

export default function useFetchUser(
  gqlClient: Accessor<GraphQLClientQuery | undefined>,
): [
  ResourceReturn<SelectUserQuery | undefined> | undefined,
  {
    setUserId: (userId: string) => void;
  },
] {
  const [queryVars, setQueryVars] = createSignal<
    SelectUserQueryVariables | undefined
  >();

  const queryResource = gqlClient?.()?.<
    SelectUserQuery,
    SelectUserQueryVariables
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
