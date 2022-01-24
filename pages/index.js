import Head from 'next/head';
import { useAuth } from '@/lib/auth';
import { Button, Code, Flex, Icon, Text } from '@chakra-ui/react';
import { LogoIcon } from '@/components/Icons';
import { EmptyState } from '@/components/EmptyState';

export default function Home() {
  const auth = useAuth();
  return (
    <Flex
      as="main"
      direction="column"
      align="center"
      justify="center"
      h="100vh"
    >
      <Head>
        <title>FastFeedback</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <LogoIcon color="black" boxSize="64px" />
      {auth?.user ? (
        <>
          <EmptyState />
          {/* <Button mt={4} onClick={(e) => auth.signout()}>
            {'Sign out'}
          </Button> */}
        </>
      ) : (
        <Button
          variant="ghost"
          size="sm"
          mt={4}
          onClick={(e) => auth.signinWithGithub()}
        >
          {'Sign in with Github'}
        </Button>
      )}
    </Flex>
  );
}
