import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { Popover } from "@/components/ui/popover";
import { Text } from "@/components/ui/text";
import {
  FastForwardIcon,
  RewindIcon,
  StepBackIcon,
  StepForwardIcon,
  TrashIcon,
  XIcon,
} from "lucide-solid";
import { Box, HStack, VStack } from "../../styled-system/jsx";

type Props = {
  sgfText: string;
  onDelete: () => void;
};

export default function RecordDetail(props: Props) {
  props;
  return (
    <VStack gap={4} position="relative">
      <Popover.Root lazyMount={true}>
        <Popover.Trigger
          asChild={(triggerProps) => (
            <IconButton
              {...triggerProps()}
              aria-label="削除"
              variant="subtle"
              colorPalette="red"
              position="absolute"
              top={2}
              right={2}
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
      <Box width="50%">
        <img src="/board.png" alt="go" />
      </Box>
      <HStack>
        <IconButton size="xs" variant="outline" aria-label="最初へ">
          <RewindIcon />
        </IconButton>
        <IconButton size="xs" variant="outline" aria-label="1手前へ">
          <StepBackIcon />
        </IconButton>
        <IconButton size="xs" variant="outline" aria-label="1手次へ">
          <StepForwardIcon />
        </IconButton>
        <IconButton size="xs" variant="outline" aria-label="最後へ">
          <FastForwardIcon />
        </IconButton>
      </HStack>
    </VStack>
  );
}
