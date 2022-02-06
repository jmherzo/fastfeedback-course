import { useMediaQuery } from '@chakra-ui/react';

export function useIsMobile() {
  const [isMobile] = useMediaQuery('(max-width: 30em)');
  return isMobile;
}
