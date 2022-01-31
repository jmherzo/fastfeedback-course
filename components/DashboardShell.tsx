import React from 'react';
import { Flex, Link, Stack, Avatar } from '@chakra-ui/react';
import { LogoIcon } from './Icons';
import { useAuth } from '@/lib/auth';
import NextLink from 'next/link';

export function DashboardShell({ children }) {
  const { user = null, signout } = useAuth();
  return (
    <Flex flexDirection="column">
      <Flex id="navbar" justifyContent="space-between" p={4}>
        <Stack spacing={4} isInline alignItems="center">
          <NextLink href="/" passHref>
            <a>
              <LogoIcon boxSize="32px" />
            </a>
          </NextLink>
          <NextLink href="/dashboard" passHref>
            <Link>Sites</Link>
          </NextLink>
          <NextLink href="/feedback" passHref>
            <Link>Feedback</Link>
          </NextLink>
        </Stack>
        <Flex
          alignItems="center"
          justifyContent="space-between"
          flexDirection="row"
        >
          {user ? (
            <Link mr={4} onClick={() => signout()}>
              Log Out
            </Link>
          ) : null}
          <Avatar size="sm" src={user?.photoUrl} />
        </Flex>
      </Flex>
      <Flex
        id="GrayContainer"
        flexDirection="column"
        backgroundColor="gray.50"
        alignItems="center"
        p={8}
        h="100vh"
      >
        <Flex id="MainContent" flexDirection="column" maxWidth="800px" w="100%">
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
}
