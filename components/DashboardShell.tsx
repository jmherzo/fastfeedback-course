import React, { ReactNode } from 'react';
import { Flex, Link as ChakraLink, Stack, Avatar, Box } from '@chakra-ui/react';
import { Logo } from './Icons';
import { useAuth } from '@/lib/auth';
import NextLink from 'next/link';

type DashboardShellProps = {
  children: ReactNode;
};

export function DashboardShell({ children }: DashboardShellProps) {
  const { user, signout } = useAuth();
  return (
    <Flex flexDirection="column">
      <Flex id="navbar" justifyContent="space-between" p={4}>
        <Stack spacing={4} isInline alignItems="center">
          <ChakraLink as={NextLink} href="/" passHref>
            <Logo boxSize="32px" />
          </ChakraLink>
          <ChakraLink as={NextLink} href="/dashboard">
            Sites
          </ChakraLink>
          <ChakraLink as={NextLink} href="/feedback">
            Feedback
          </ChakraLink>
        </Stack>
        <Flex
          alignItems="center"
          justifyContent="space-between"
          flexDirection="row"
        >
          {user ? (
            <ChakraLink mr={4} onClick={() => signout?.()}>
              Log Out
            </ChakraLink>
          ) : null}
          <Avatar size="sm" src={user?.photoUrl ?? ''} />
        </Flex>
      </Flex>
      <Flex
        id="GrayContainer"
        flexDirection="column"
        backgroundColor="gray.50"
        alignItems="center"
        p={8}
        minHeight="100vh"
      >
        <Box id="MainContent" flexDirection="column" maxWidth="800px" w="100%">
          {children}
        </Box>
      </Flex>
    </Flex>
  );
}
