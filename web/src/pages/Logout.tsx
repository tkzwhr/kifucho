import { Alert } from "@/components/ui/alert";
import { InfoIcon } from "lucide-solid";

export default function LogoutPage() {
  return (
    <Alert.Root width="full">
      <Alert.Icon asChild={(iconProps) => <InfoIcon {...iconProps()} />} />
      <Alert.Content>
        <Alert.Title>ログインしてください</Alert.Title>
        <Alert.Description />
      </Alert.Content>
    </Alert.Root>
  );
}
