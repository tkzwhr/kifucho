import logo from "@/assets/logo.svg";
import { Button } from "@/components/ui/button";
import { Menu } from "@/components/ui/menu";
import { Text } from "@/components/ui/styled/text";
import { useSession } from "@/contexts/session";
import { isLocal } from "@/utils/env";
import { useAuth0 } from "@afroze9/solid-auth0";
import { useNavigate } from "@solidjs/router";
import { BookPlus } from "lucide-solid";
import { Show, createEffect } from "solid-js";
import { Flex, HStack } from "../../styled-system/jsx";

type Props = {
  isModal?: boolean;
};

export default function Header(props: Props) {
  const { isSignedIn, signInWithAuth0, signInLocal, signOut } = useSession();
  const navigate = useNavigate();
  const auth0 = useAuth0();

  const execSignIn = () => {
    if (isLocal()) {
      signInLocal();
    } else {
      if (auth0) {
        auth0?.loginWithRedirect();
      }
    }
  };

  const execSignOut = async () => {
    if (!isLocal()) {
      await auth0?.logout();
    }
    signOut();
  };

  createEffect(async () => {
    if (auth0?.isAuthenticated()) {
      const userId = auth0?.user?.()?.sub ?? "";
      const token = await auth0?.getToken();
      signInWithAuth0(userId, token);
    }
  });

  return (
    <Flex
      backgroundColor={props.isModal ? "indigo.3" : "white"}
      position="fixed"
      top={0}
      left={0}
      width="100%"
      height="60px"
      justify="center"
      alignItems="center"
      boxShadow="0 1px 2px lightgray"
      zIndex={9999}
    >
      <Flex
        width="1280px"
        padding="0 20px"
        justify="space-between"
        alignItems="center"
      >
        <HStack>
          <div>
            <img src={logo} alt="Logo" width="40px" />
          </div>
          <Text size="2xl">棋譜帳</Text>
        </HStack>
        <HStack>
          <Show
            when={isSignedIn()}
            fallback={<Button onclick={execSignIn}>ログイン</Button>}
          >
            <Show
              when={!props.isModal}
              fallback={
                <Button
                  variant="outline"
                  onclick={() => navigate("/", { replace: true })}
                >
                  閉じる
                </Button>
              }
            >
              <Menu.Root
                onSelect={(details) =>
                  navigate(`/import/${details.value}`, { replace: true })
                }
              >
                <Menu.Trigger
                  asChild={(triggerProps) => (
                    <Button {...triggerProps()}>
                      棋譜を追加する
                      <BookPlus />
                    </Button>
                  )}
                />
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.ItemGroup>
                      <Menu.Item value="file">ファイルから</Menu.Item>
                      <Menu.Item value="text">テキストから</Menu.Item>
                    </Menu.ItemGroup>
                  </Menu.Content>
                </Menu.Positioner>
              </Menu.Root>
              <Button variant="outline" onclick={execSignOut}>
                ログアウト
              </Button>
            </Show>
          </Show>
        </HStack>
      </Flex>
    </Flex>
  );
}
