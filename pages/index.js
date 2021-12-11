import Head from 'next/head';
import { useAuth } from '@/lib/auth';
import { Button, Code, Heading, Text } from '@chakra-ui/react';

export default function Home() {
  const auth = useAuth();
  return (
    <div>
      <Head>
        <title>FastFeedback</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Heading>Fast Feedback </Heading>
        {auth?.user ? (
          <>
            <Text>
              Current user mail
              <Code>{auth?.user?.email}</Code>
            </Text>
            <Button onClick={(e) => auth.signout()}>{'Sign out'}</Button>
          </>
        ) : (
          <Button onClick={(e) => auth.signinWithGithub()}>
            {'Sign in with Github'}
          </Button>
        )}
      </main>
    </div>
  );
}
