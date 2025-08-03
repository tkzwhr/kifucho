import Board from "@/components/Board";
import { IconButton } from "@/components/ui/icon-button";
import {
  FastForwardIcon,
  RewindIcon,
  StepBackIcon,
  StepForwardIcon,
} from "lucide-solid";
import { createSignal } from "solid-js";
import { HStack, VStack } from "../../styled-system/jsx";

type Props = {
  sgfText: string;
};

export default function RecordDetail(props: Props) {
  const [move, setMove] = createSignal<number | undefined>();

  return (
    <VStack gap={4} paddingRight={10}>
      <Board
        sgfText={props.sgfText}
        size="100%"
        static={false}
        move={move}
        setMove={setMove}
      />
      <HStack>
        <IconButton
          variant="outline"
          aria-label="最初へ"
          onclick={() => setMove(-9999)}
        >
          <RewindIcon />
        </IconButton>
        <IconButton
          variant="outline"
          aria-label="1手前へ"
          onclick={() => setMove(-1)}
        >
          <StepBackIcon />
        </IconButton>
        <IconButton
          variant="outline"
          aria-label="1手次へ"
          onclick={() => setMove(1)}
        >
          <StepForwardIcon />
        </IconButton>
        <IconButton
          variant="outline"
          aria-label="最後へ"
          onclick={() => setMove(9999)}
        >
          <FastForwardIcon />
        </IconButton>
      </HStack>
    </VStack>
  );
}
