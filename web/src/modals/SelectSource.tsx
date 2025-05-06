import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { FileUpload } from "@/components/ui/file-upload";
import { IconButton } from "@/components/ui/icon-button";
import { Textarea } from "@/components/ui/textarea";
import { useImportRecord } from "@/store/importRecord";
import type { FileUploadFileAcceptDetails } from "@ark-ui/solid";
import { XIcon } from "lucide-solid";
import { createMemo, createSignal } from "solid-js";
import { Dynamic } from "solid-js/web";
import { Stack, VStack } from "styled-system/jsx";

function ImportByFile() {
  const [, setImportRecord] = useImportRecord();

  const fileAccept = (details: FileUploadFileAcceptDetails) => {
    if (details.files.length === 1) {
      setImportRecord({
        mode: "selected",
        type: "file",
        file: details.files[0],
      });
    }
  };

  return (
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
  );
}

function ImportByText() {
  const [text, setText] = createSignal("");
  const [, setImportRecord] = useImportRecord();

  const submit = () => {
    setImportRecord({
      mode: "selected",
      type: "text",
      text: text(),
    });
    setText("");
  };

  return (
    <VStack>
      <Textarea
        id="description"
        placeholder="(;GM[1]FF[4]SZ[9];B[cc];W[gg];B[gc];W[cg])"
        rows={5}
        onkeyup={(ev) => setText(ev.currentTarget.value)}
      >
        {text()}
      </Textarea>
      <Stack gap="3" direction="row" width="full">
        <Button width="full" disabled={text().length === 0} onclick={submit}>
          次へ
        </Button>
      </Stack>
    </VStack>
  );
}

export default function SelectSourceModal() {
  const [importRecordValue, setImportRecord] = useImportRecord();
  const type = createMemo(() => {
    const v = importRecordValue();
    if (v?.mode === "select") {
      return v?.type;
    }
  });

  const components = {
    file: () => <ImportByFile />,
    text: () => <ImportByText />,
    nothing: () => <div />,
  };

  return (
    <Dialog.Root
      open={type() !== undefined}
      lazyMount={true}
      closeOnInteractOutside={false}
    >
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content width="40%">
          <Stack gap="10" p="5">
            <Stack gap="5">
              <Dialog.Title>棋譜を追加する</Dialog.Title>
              <Dialog.Description>
                <Dynamic component={components[type() ?? "nothing"]} />
              </Dialog.Description>
            </Stack>
          </Stack>
          <Dialog.CloseTrigger
            asChild={() => (
              <IconButton
                aria-label="閉じる"
                variant="ghost"
                size="sm"
                position="absolute"
                top="2"
                right="2"
                onclick={() => setImportRecord(undefined)}
              >
                <XIcon />
              </IconButton>
            )}
          />
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
