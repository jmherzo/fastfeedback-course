import { AuthProvider } from '@/lib/auth';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '@/styles/theme';
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
