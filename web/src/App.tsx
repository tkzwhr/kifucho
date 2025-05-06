import Header from "@/components/Header";
import { Spinner } from "@/components/ui/spinner";
import { useGqlClient } from "@/drivers/gqlClient";
import LogoutPage from "@/pages/Logout";
import TopPage from "@/pages/Top";
import { useRecordRepo } from "@/repos/record";
import { useUserRepo } from "@/repos/user";
import { isLocal } from "@/utils/env";
import { useAuth0 } from "@afroze9/solid-auth0";
import { Show, createEffect } from "solid-js";
import { Box, Center } from "../styled-system/jsx";

export default function App() {
  const auth0 = useAuth0();
  const [, isSignedIn, setToken] = useGqlClient();
  const [user, setUserId1] = useUserRepo().select;
  const [, setUserId2] = useRecordRepo().select;

  createEffect(async () => {
    if (isLocal() && isSignedIn()) {
      setUserId1("dev_user");
      setUserId2("dev_user");
    } else if (!isLocal() && auth0?.isAuthenticated()) {
      const token = await auth0.getToken();
      setToken(token);
      const userId = auth0?.user?.()?.sub;
      if (userId) {
        setUserId1(userId);
        setUserId2(userId);
      }
    }
  });

  const executeLogin = () => {
    if (isLocal()) {
      setToken("dev_user");
    } else {
      auth0.loginWithRedirect().then();
    }
  };

  const executeLogout = () => {
    if (isLocal()) {
      setToken("");
    } else {
      auth0.logout().then();
    }
  };

  return (
    <Show
      when={auth0 === undefined || !auth0.isLoading()}
      fallback={
        <Center width="full" height={200}>
          <Spinner />
        </Center>
      }
    >
      <Header onLogin={executeLogin} onLogout={executeLogout} />
      <Box padding="20px" marginTop="80px">
        <Show
          when={user()?.[0]?.()?.users_by_pk?.id !== undefined}
          fallback={<LogoutPage />}
        >
          <TopPage />
        </Show>
      </Box>
    </Show>
  );
}
