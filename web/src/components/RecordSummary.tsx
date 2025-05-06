import RecordDetail from "@/components/RecordDetail";
import { Accordion } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import type { GameWithId } from "@/pages/Top";
import { result } from "@/utils/text.ts";
import { ChevronDownIcon, TrophyIcon } from "lucide-solid";
import { Show } from "solid-js";
import { Box, HStack, VStack } from "../../styled-system/jsx";

type Props = {
  game: GameWithId;
  onDelete: () => void;
};

export default function RecordSummary(props: Props) {
  const wins = props.game.metadata.result?.wins === props.game.player.color;

  return (
    <Card.Root marginBottom={4}>
      <Card.Header>
        <Accordion.Root collapsible={true} borderWidth={0}>
          <Accordion.Item value={props.game.id.toString()}>
            <Accordion.ItemTrigger>
              <HStack gap={10}>
                <Box width="100px" position="relative">
                  <img src="/board.png" alt="board" />
                  <Show when={wins}>
                    <Box
                      color="goldenrod"
                      backgroundColor="rgba(255, 255, 255, 0.7)"
                      position="absolute"
                      top={0}
                      right={0}
                      padding={1}
                    >
                      <TrophyIcon />
                    </Box>
                  </Show>
                </Box>
                <VStack gap={1} alignItems="start">
                  <HStack>
                    <Text color="gray" size="md">
                      {props.game.metadata.date}
                    </Text>
                    <Text color="gray" size="md">
                      {props.game.metadata.name ?? "(無題)"}
                    </Text>
                  </HStack>
                  <HStack alignItems="baseline">
                    <Text size="sm">VS.</Text>
                    <Text size="2xl">
                      {props.game.player.color === "Black"
                        ? props.game.white.name
                        : props.game.black.name}
                    </Text>
                  </HStack>
                  <Text size="sm">{result(props.game.metadata.result)}</Text>
                </VStack>
              </HStack>
              <Accordion.ItemIndicator>
                <ChevronDownIcon />
              </Accordion.ItemIndicator>
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
              <RecordDetail
                sgfText={props.game.rawData}
                onDelete={props.onDelete}
              />
            </Accordion.ItemContent>
          </Accordion.Item>
        </Accordion.Root>
      </Card.Header>
    </Card.Root>
  );
}
