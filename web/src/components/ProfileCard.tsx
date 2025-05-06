import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/styled/text";
import { HStack } from "../../styled-system/jsx";

type Props = {
  name: string;
};

export default function ProfileCard(props: Props) {
  return (
    <Card.Root width="full">
      <Card.Header>
        <HStack gap={5}>
          <Avatar name={props.name} size="2xl" />
          <Text size="lg">{props.name}</Text>
        </HStack>
      </Card.Header>
    </Card.Root>
  );
}
