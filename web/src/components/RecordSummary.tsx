import Board from "@/components/Board";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import type { GameWithId } from "@/pages/Top";
import { result } from "@/utils/text";
import { TrophyIcon } from "lucide-solid";
import { Show } from "solid-js";
import { Box, HStack, VStack } from "../../styled-system/jsx";

type Props = {
  game: GameWithId;
  onDelete: () => void;
};

export default function RecordSummary(props: Props) {
  const wins = props.game.metadata.result?.wins === props.game.player.color;

  return (
    <Card.Root marginBottom={4} width="full">
      <Card.Header>
        <HStack gap={10} paddingLeft={4}>
          <Box position="relative">
            <Board sgfText={props.game.rawData} size="150px" static />
            <Show when={wins}>
              <Box
                color="darkgoldenrod"
                backgroundColor="palegoldenrod"
                position="absolute"
                border="2px solid white"
                borderRadius="18px"
                top={-4}
                left={-4}
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
      </Card.Header>
    </Card.Root>
  );
}
