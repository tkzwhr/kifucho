import Header from "@/components/Header2";
import { Spinner } from "@/components/ui/spinner";
import { useSession } from "@/contexts/session";
import { isLocal } from "@/utils/env.ts";
import { useAuth0 } from "@afroze9/solid-auth0";
import { useLocation, useNavigate } from "@solidjs/router";
import { type JSX, Show, createEffect, createMemo } from "solid-js";
import { Box, Center } from "../../styled-system/jsx";

type Props = {
  children: JSX.Element;
  isModal?: boolean;
};

export default function Base(props: Props) {
  const auth = useAuth0();
  const { isSignedIn } = useSession();
  const navigate = useNavigate();
  const location = useLocation();
  const loading = createMemo(() => {
    if (isLocal()) {
      return false;
    }

    return auth?.isLoading();
  });

  createEffect(() => {
    if (!isSignedIn() && location.pathname !== "/sign-in") {
      navigate("/sign-in", { replace: true });
    } else if (isSignedIn() && location.pathname === "/sign-in") {
      navigate("/", { replace: true });
    }
  });

  return (
    <Show
      when={!loading()}
      fallback={
        <Center width="full" height="100vh">
          <Spinner />
        </Center>
      }
    >
      <Header isModal={props.isModal} />
      <Box padding="20px" marginTop="80px">
        {props.children}
      </Box>
    </Show>
  );
}
