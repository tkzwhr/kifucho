import { Alert } from "@/components/ui/alert";
import Base from "@/pages/Base";
import { InfoIcon } from "lucide-solid";

export default function SignInPage() {
  return (
    <Base>
      <Alert.Root>
        <Alert.Icon asChild={(iconProps) => <InfoIcon {...iconProps()} />} />
        <Alert.Content>
          <Alert.Title>ログインしてください</Alert.Title>
          <Alert.Description />
        </Alert.Content>
      </Alert.Root>
    </Base>
  );
}
