import { AuthProvider } from '@/lib/auth';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import baseTheme from '@/styles/theme';

const theme = extendTheme({
  ...baseTheme,
  useSystemColorMode: true
});

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
