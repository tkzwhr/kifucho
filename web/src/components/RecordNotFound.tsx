import { Alert } from "@/components/ui/alert";
import { InfoIcon } from "lucide-solid";

export default function RecordNotFound() {
  return (
    <Alert.Root width="full">
      <Alert.Icon asChild={(iconProps) => <InfoIcon {...iconProps()} />} />
      <Alert.Content>
        <Alert.Title>棋譜がありません。</Alert.Title>
        <Alert.Description />
      </Alert.Content>
    </Alert.Root>
  );
}
