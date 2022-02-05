import Head from 'next/head';
import { useAuth } from '@/lib/auth';
import { Button, Flex, Heading, Stack } from '@chakra-ui/react';
import { GithubIcon, GoogleIcon, LogoIcon } from '@/components/Icons';
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
        <title>FastFeedback by jmherzo</title>
        {/* <script
          dangerouslySetInnerHTML={{
            __html: `
          if (document.cookie && document.cookie.includes('auth')) {
            window.location.href = "/dashboard"
          }
        `
          }}
        /> */}
      </Head>

      <LogoIcon color="black" boxSize="64px" />
      <Heading size="lg" as="h3" mt={4}>
        You are in Fast Feedback by jmherzo
      </Heading>
      {auth?.user ? (
        <>
          <EmptyState />
        </>
      ) : (
        <Stack>
          <Button
            leftIcon={<GithubIcon />}
            mt={4}
            onClick={(e) => auth.signinWithGithub?.()}
            backgroundColor="gray.900"
            color="white"
            fontWeight="medium"
            size="md"
            _hover={{ bg: 'gray.700' }}
          >
            Sign in with Github
          </Button>
          <Button
            leftIcon={<GoogleIcon />}
            mt={4}
            onClick={(e) => auth.signinWithGithub?.()}
            variant="outline"
            fontWeight="medium"
            size="md"
          >
            Sign in with Google
          </Button>
        </Stack>
      )}
    </Flex>
  );
}
