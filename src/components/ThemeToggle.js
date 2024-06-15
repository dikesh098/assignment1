import React from 'react';
import { useColorMode, Button } from '@chakra-ui/react';

function ThemeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button onClick={toggleColorMode}>
      {colorMode === 'light' ? 'Dark' : 'Light'} Mode
    </Button>
  );
}

export default ThemeToggle;
