import {
  type Game,
  parse as parseSgf,
  stringify as stringifySgf,
} from "@/dto/sgf";
import { useRecordRepo } from "@/repos/record";
import {
  type Accessor,
  type Setter,
  createEffect,
  createRoot,
  createSignal,
} from "solid-js";

export type ImportRecordActions =
  | {
      mode: "select";
      type: "file" | "text";
    }
  | {
      mode: "selected";
      type: "file";
      file: File;
    }
  | {
      mode: "selected";
      type: "text";
      text: string;
    }
  | { mode: "confirm"; games: Game[] }
  | { mode: "execute"; games: Game[] }
  | undefined;

function createImportRecord(): [
  Accessor<ImportRecordActions>,
  Setter<ImportRecordActions>,
] {
  const [value, setValue] = createSignal<ImportRecordActions>();
  const [, insertSgfText] = useRecordRepo().insert;

  createEffect(() => {
    const data = value();
    if (data?.mode === "selected") {
      if (data?.type === "file") {
        data.file.text().then((text) => {
          setValue({
            mode: "confirm",
            games: parseSgf(text),
          });
        });
      } else {
        setValue({
          mode: "confirm",
          games: parseSgf(data.text),
        });
      }
    } else if (data?.mode === "execute") {
      for (const g of data.games) {
        const sgfText = stringifySgf(g);
        insertSgfText(sgfText);
      }
    }
  });

  return [value, setValue];
}

const ImportRecord = createRoot(createImportRecord);

export function useImportRecord() {
  return ImportRecord;
}
