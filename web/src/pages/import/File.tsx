import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/ui/file-upload";
import { type Game, parse } from "@/dto/sgf";
import ImporterPage from "@/pages/import/Importer";
import type { FileUploadFileAcceptDetails } from "@ark-ui/solid";
import { createSignal } from "solid-js";

export default function ImportFilePage() {
  const [game, setGame] = createSignal<Game | undefined>();

  const fileAccept = async (details: FileUploadFileAcceptDetails) => {
    if (details.files.length === 1) {
      const text = await details.files[0].text();
      const games = parse(text);
      if (games.length > 0) {
        setGame(games[0]);
      }
    }
  };

  return (
    <ImporterPage game={game()}>
      <FileUpload.Root onFileAccept={fileAccept}>
        <FileUpload.Dropzone>
          <FileUpload.Label>
            ここにファイルをドラッグ＆ドロップしてください
          </FileUpload.Label>
          <FileUpload.Trigger
            asChild={(triggerProps) => (
              <Button size="sm" {...triggerProps()}>
                開く...
              </Button>
            )}
          />
        </FileUpload.Dropzone>
        <FileUpload.HiddenInput />
      </FileUpload.Root>
    </ImporterPage>
  );
}
