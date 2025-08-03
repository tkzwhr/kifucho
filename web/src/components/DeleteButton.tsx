import { Button } from "@/components/ui/button";
import { Popover } from "@/components/ui/popover";
import { IconButton } from "@/components/ui/styled/icon-button";
import { Text } from "@/components/ui/styled/text";
import { TrashIcon, XIcon } from "lucide-solid";
import { Box, VStack } from "../../styled-system/jsx";

type Props = {
  onDelete: () => void;
};

export default function DeleteButton(props: Props) {
  return (
    <Popover.Root lazyMount unmountOnExit>
      <Popover.Trigger
        asChild={(triggerProps) => (
          <IconButton
            {...triggerProps()}
            aria-label="削除"
            variant="subtle"
            colorPalette="red"
          >
            <TrashIcon />
          </IconButton>
        )}
      />
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Arrow>
            <Popover.ArrowTip />
          </Popover.Arrow>
          <VStack gap={4}>
            <Popover.Title>本当に削除しますか？</Popover.Title>
            <Popover.Description>
              <VStack gap={2}>
                <Text>この操作は取り消せません。</Text>
                <Popover.CloseTrigger
                  asChild={(closeProps) => (
                    <div {...closeProps()}>
                      <Button
                        colorPalette="red"
                        size="xs"
                        onclick={props.onDelete}
                      >
                        削除する
                      </Button>
                    </div>
                  )}
                />
              </VStack>
            </Popover.Description>
          </VStack>
          <Box position="absolute" top="1" right="1">
            <Popover.CloseTrigger
              asChild={(closeProps) => (
                <IconButton
                  {...closeProps()}
                  aria-label="閉じる"
                  variant="ghost"
                  size="sm"
                >
                  <XIcon />
                </IconButton>
              )}
            />
          </Box>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  );
}
