import logo from "@/assets/logo.svg";
import { Button } from "@/components/ui/button";
import { Menu } from "@/components/ui/menu";
import { Text } from "@/components/ui/styled/text";
import { useUserRepo } from "@/repos/user";
import { useImportRecord } from "@/store/importRecord";
import type { MenuSelectionDetails } from "@ark-ui/solid";
import { BookPlus } from "lucide-solid";
import { Show } from "solid-js";
import { Flex, HStack } from "../../styled-system/jsx";

type Props = {
  onLogin: () => void;
  onLogout: () => void;
};

export default function Header(props: Props) {
  const [, setImportRecord] = useImportRecord();
  const [user] = useUserRepo().select;

  const select = (details: MenuSelectionDetails) => {
    setImportRecord({
      mode: "select",
      type: details.value as "file" | "text",
    });
  };

  return (
    <Flex
      backgroundColor="white"
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
          <Menu.Root onSelect={select}>
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
          <Show
            when={user()?.[0]?.()?.users_by_pk?.id !== undefined}
            fallback={
              <Button
                colorPalette="gray"
                variant="outline"
                onclick={props.onLogin}
              >
                ログイン
              </Button>
            }
          >
            <Button
              colorPalette="gray"
              variant="outline"
              onclick={props.onLogout}
            >
              ログアウト
            </Button>
          </Show>
        </HStack>
      </Flex>
    </Flex>
  );
}
