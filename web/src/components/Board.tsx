import Kaya from "@tkzwhr/kaya";
import { type Accessor, type Setter, createEffect } from "solid-js";
import { Box } from "../../styled-system/jsx";

type Props = {
  sgfText: string;
  size: string;
} & (
  | {
      static: true;
    }
  | {
      static: false;
      move: Accessor<number | undefined>;
      setMove: Setter<number | undefined>;
    }
);

export default function Board(props: Props) {
  let board: HTMLDivElement | undefined;
  let kaya: Kaya | undefined;

  createEffect(() => {
    if (board) {
      if (props.static) {
        kaya = new Kaya(board, {
          sgfText: props.sgfText,
          enableWheel: false,
          enableKeyboard: false,
        });
        kaya.navigate(9999);
      } else {
        kaya = new Kaya(board, {
          sgfText: props.sgfText,
        });
      }
    }
  });

  createEffect(() => {
    if (!props.static) {
      const m = props.move();
      if (m !== undefined) {
        kaya?.navigate(m);
      }
      props.setMove(undefined);
    }
  });

  return (
    <Box style={{ width: props.size, height: props.size }}>
      <div ref={board} />
    </Box>
  );
}
