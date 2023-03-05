import Head from 'next/head';
import { useAuth } from '@/lib/auth';
import { Button, Flex, Heading, Stack } from '@chakra-ui/react';
import { Github, Google, Logo } from '@/components/Icons';
import { EmptyState } from '@/components/EmptyState';
import { DashboardShell } from '@/components/DashboardShell';

export default function Home() {
  const { signinWithProvider, isSignedIn } = useAuth();
  return (
    <>
      {isSignedIn ? (
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
          <Logo color="black" boxSize="64px" />
          <Heading size="lg" as="h3" mt={8} textAlign="center">
            This is Fast Feedback by jmherzo
          </Heading>
          <Stack spacing={4} mt={8}>
            <Button
              leftIcon={<Github />}
              onClick={(e) => signinWithProvider?.('Github')}
              backgroundColor="gray.900"
              color="white"
              fontWeight="medium"
              size="md"
              _hover={{ bg: 'gray.700' }}
            >
              Sign in with Github
            </Button>
            <Button
              leftIcon={<Google />}
              onClick={(e) => signinWithProvider?.('Google')}
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
