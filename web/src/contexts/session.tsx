import {
  type GraphQLClientQuery,
  createGraphQLClient,
} from "@solid-primitives/graphql";
import {
  type Accessor,
  type JSX,
  createContext,
  createMemo,
  createSignal,
  useContext,
} from "solid-js";

type Store = {
  isSignedIn: Accessor<boolean>;
  userId: Accessor<string | undefined>;
  gqlClient: Accessor<GraphQLClientQuery | undefined>;
  signInWithAuth0: (userId: string, token: string) => void;
  signInLocal: () => void;
  signOut: () => void;
};

const initialValue: Store = {
  isSignedIn: createSignal(false)[0],
  userId: createSignal(undefined)[0],
  gqlClient: createSignal(undefined)[0],
  signInWithAuth0: () => {},
  signInLocal: () => {},
  signOut: () => {},
};

const SessionContext = createContext(initialValue);

type Props = {
  children: JSX.Element;
};

export function SessionProvider(props: Props) {
  const [userId, setUserId] = createSignal<string | undefined>();
  const [gqlClient, setGqlClient] = createSignal<
    GraphQLClientQuery | undefined
  >(undefined);
  const isSignedIn = createMemo(() => userId() !== undefined);

  const value: Store = {
    isSignedIn,
    userId,
    gqlClient,
    signInWithAuth0: (userId: string, token: string) => {
      const client = createGraphQLClient(
        import.meta.env.VITE_GRAPHQL_ENDPOINT,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setGqlClient(() => client);

      setUserId(() => userId);
    },
    signInLocal: () => {
      const DEV_USER_ID = "dev_user";

      const client = createGraphQLClient("http://localhost:20002/v1/graphql", {
        headers: {
          "x-hasura-admin-secret": "hasura",
          "x-hasura-role": "user",
          "x-hasura-user-id": DEV_USER_ID,
        },
      });
      setGqlClient(() => client);

      setUserId(() => DEV_USER_ID);
    },
    signOut: () => {
      setGqlClient(() => undefined);
      setUserId(() => undefined);
    },
  };

  return (
    <SessionContext.Provider value={value}>
      {props.children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}
