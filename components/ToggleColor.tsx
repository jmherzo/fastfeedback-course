import { useColorMode, Button } from '@chakra-ui/react';

function ToggleColor() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button onClick={toggleColorMode} mr={4} ml={4}>
      Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
    </Button>
  );
}

export { ToggleColor };
