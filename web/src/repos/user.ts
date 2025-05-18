import { useGqlClient } from "@/drivers/gqlClient";
import type {
  SelectUserQuery,
  SelectUserQueryVariables,
} from "@/generated/graphql";
import { gql } from "@solid-primitives/graphql";
import {
  type Accessor,
  type ResourceReturn,
  type Setter,
  createMemo,
  createRoot,
  createSignal,
} from "solid-js";

const selectQuery = gql`
query SelectUser($userId: String!) {
  users_by_pk(id: $userId) {
    id
    name
  }
}
`;

function createUserRepo(): {
  select: [
    Accessor<ResourceReturn<SelectUserQuery | undefined> | undefined>,
    Setter<string | undefined>,
  ];
} {
  const [client] = useGqlClient();
  const [userId, setUserId] = createSignal<string | undefined>();
  const user = createMemo(() => {
    const uid = userId();
    if (uid) {
      return client?.()?.<SelectUserQuery, SelectUserQueryVariables>(
        selectQuery,
        {
          userId: uid,
        },
      );
    }
  });

  return {
    select: [user, setUserId],
  };
}

const UserRepo = createRoot(createUserRepo);

export function useUserRepo() {
  return UserRepo;
}
