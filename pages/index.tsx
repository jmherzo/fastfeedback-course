import Head from 'next/head';
import { useAuth } from '@/lib/auth';
import { Button, Flex, Heading, Stack } from '@chakra-ui/react';
import { GithubIcon, GoogleIcon, LogoIcon } from '@/components/Icons';
import { EmptyState } from '@/components/EmptyState';
import { DashboardShell } from '@/components/DashboardShell';
import Cookies from 'js-cookie';
import { cookieNames } from '@/utils/cookienames';

export default function Home() {
  const auth = useAuth();
  return (
    <>
      {Cookies.get(cookieNames.auth) ? (
        <DashboardShell>
          <EmptyState type="site" />
        </DashboardShell>
      ) : (
        <Flex
          as="main"
          direction="column"
          align="center"
          justify="center"
          h="100vh"
        >
          <LogoIcon color="black" boxSize="64px" />
          <Heading size="lg" as="h3" mt={8} textAlign="center">
            You are in Fast Feedback by jmherzo
          </Heading>
          <Stack spacing={4} mt={8}>
            <Button
              leftIcon={<GithubIcon />}
              onClick={(e) => auth.signinWithProvider?.('Github')}
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
              onClick={(e) => auth.signinWithProvider?.('Google')}
              variant="outline"
              fontWeight="medium"
              size="md"
            >
              Sign in with Google
            </Button>
          </Stack>
        </Flex>
      )}
    </>
  );
}
