import { ColorModeScript, ColorModeWithSystem } from '@chakra-ui/react';
import { Html, Head, Main, NextScript } from 'next/document';
import theme from '@/styles/theme';

function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <ColorModeScript
          initialColorMode={
            theme.config.initialColorMode as ColorModeWithSystem
          }
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default Document;
