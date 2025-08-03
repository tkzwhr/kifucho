import { NumberInput } from "@/components/ui/number-input";
import { Select, createListCollection } from "@/components/ui/select";
import type { Game } from "@/dto/sgf";
import { CheckIcon, ChevronDownIcon } from "lucide-solid";
import { For, Show, createEffect, createSignal } from "solid-js";
import { HStack } from "../../../styled-system/jsx";

const colorCollection = createListCollection({
  items: [
    { label: "黒", value: "Black" },
    { label: "白", value: "White" },
    { label: "持碁", value: "Draw" },
  ],
});

const resignCollection = createListCollection({
  items: [
    { label: "中押し勝ち", value: "Resign" },
    { label: "目勝ち", value: "Points" },
  ],
});

type Props = {
  gameResult?: Game["metadata"]["result"];
  setGameResult?: (value: Game["metadata"]["result"]) => void;
};

export default function GameResult(props: Props) {
  const [colorValue, setColorValue] = createSignal<
    ("Black" | "White" | "Draw")[]
  >([]);
  const [resignValue, setResignValue] = createSignal<("Resign" | "Points")[]>(
    [],
  );
  const [pointValue, setPointValue] = createSignal(0.5);

  if (props.gameResult) {
    if (props.gameResult.wins === "Draw") {
      setColorValue(["Draw"]);
    } else {
      setColorValue([props.gameResult.wins]);
      if (props.gameResult.by === "Resign") {
        setResignValue(["Resign"]);
      } else {
        setResignValue(["Points"]);
        setPointValue(props.gameResult.by);
      }
    }
  }

  createEffect(() => {
    if (colorValue().length === 0 || resignValue().length === 0) {
      return;
    }

    if (colorValue().includes("Draw")) {
      props.setGameResult?.({ wins: "Draw" });
    } else if (resignValue().includes("Resign")) {
      props.setGameResult?.({ wins: colorValue()[0], by: "Resign" });
    } else {
      props.setGameResult?.({ wins: colorValue()[0], by: pointValue() });
    }
  });

  return (
    <HStack>
      <Select.Root
        collection={colorCollection}
        value={colorValue()}
        onValueChange={(vcd) =>
          setColorValue(vcd.value as ("Black" | "White" | "Draw")[])
        }
      >
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText />
            <ChevronDownIcon />
          </Select.Trigger>
        </Select.Control>
        <Select.Positioner>
          <Select.Content>
            <Select.ItemGroup>
              <For each={colorCollection.items}>
                {(item) => (
                  <Select.Item item={item}>
                    <Select.ItemText>{item.label}</Select.ItemText>
                    <Select.ItemIndicator>
                      <CheckIcon />
                    </Select.ItemIndicator>
                  </Select.Item>
                )}
              </For>
            </Select.ItemGroup>
          </Select.Content>
        </Select.Positioner>
      </Select.Root>
      <Show
        when={colorValue().includes("Black") || colorValue().includes("White")}
      >
        <Show when={resignValue().includes("Points")}>
          <NumberInput
            value={pointValue().toString(10)}
            onValueChange={(vcd) => setPointValue(vcd.valueAsNumber)}
            min={0.5}
            step={0.5}
            allowMouseWheel={true}
            width="7rem"
          />
        </Show>
        <Select.Root
          collection={resignCollection}
          value={resignValue()}
          onValueChange={(vcd) =>
            setResignValue(vcd.value as ("Resign" | "Points")[])
          }
        >
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText />
              <ChevronDownIcon />
            </Select.Trigger>
          </Select.Control>
          <Select.Positioner>
            <Select.Content>
              <Select.ItemGroup>
                <For each={resignCollection.items}>
                  {(item) => (
                    <Select.Item item={item}>
                      <Select.ItemText>{item.label}</Select.ItemText>
                      <Select.ItemIndicator>
                        <CheckIcon />
                      </Select.ItemIndicator>
                    </Select.Item>
                  )}
                </For>
              </Select.ItemGroup>
            </Select.Content>
          </Select.Positioner>
        </Select.Root>
      </Show>
    </HStack>
  );
}
