import { useAuth } from '@/lib/auth';
import { Button, Flex, Heading, Stack } from '@chakra-ui/react';
import { Github, Google, Logo } from '@/components/Icons';
import { EmptyState } from '@/components/EmptyState';
import { DashboardShell } from '@/components/DashboardShell';
import { GetServerSideProps } from 'next';
import { ToggleColor } from '@/components/ToggleColor';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req } = ctx;
  //TODO manage the token id to verify the token validity https://firebase.google.com/docs/auth/admin/verify-id-tokens
  const isSignedInServer = req.cookies['fast-feedback-auth'] === 'true';
  return {
    props: { isSignedInServer }
  };
};

function Home({ isSignedInServer }: { isSignedInServer: boolean }) {
  const { signInWithProvider, isSignedIn } = useAuth();
  return (
    <>
      {isSignedIn || isSignedInServer ? (
        <DashboardShell>
          <EmptyState type="site" />
        </DashboardShell>
      ) : (
        <Flex h="100vh" direction="column" p="4">
          <Flex justify="end">
            <ToggleColor />
          </Flex>
          <Flex
            as="main"
            direction="column"
            align="center"
            justify="center"
            flexGrow="1"
          >
            <Logo color="black" boxSize="64px" />
            <Heading size="lg" as="h3" mt={8} textAlign="center">
              This is Fast Feedback by jmherzo
            </Heading>
            <Stack spacing={4} mt={8}>
              <Button
                leftIcon={<Github />}
                onClick={() => signInWithProvider?.('Github')}
                fontWeight="medium"
                size="md"
                variant="outline"
              >
                Sign in with Github
              </Button>
              <Button
                leftIcon={<Google />}
                onClick={() => signInWithProvider?.('Google')}
                variant="outline"
                fontWeight="medium"
                size="md"
              >
                Sign in with Google
              </Button>
            </Stack>
          </Flex>
        </Flex>
      )}
    </>
  );
}

export default Home;
