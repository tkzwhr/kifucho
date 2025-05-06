import { Button } from "@/components/ui/button";
import { createSignal } from "solid-js";
import { Box, Center, VStack } from "../styled-system/jsx";

export default function Sandbox() {
  const [count, setCount] = createSignal(0);

  return (
    <Center height="100vh">
      <VStack gap={5}>
        <Box>Count: {count()}</Box>
        <Button onclick={() => setCount((v) => v + 1)}>Count up</Button>
      </VStack>
    </Center>
  );
}
