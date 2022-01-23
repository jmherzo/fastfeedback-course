import React from 'react';
import {
  Flex,
  Link,
  Stack,
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading
} from '@chakra-ui/react';
import { LogoIcon } from './Icons';
import { useAuth } from '@/lib/auth';
import { AddSiteModal } from './AddSiteModal';

export function DashboardShell({ children }) {
  const auth = useAuth();
  return (
    <Flex flexDirection="column">
      <Flex id="navbar" justifyContent="space-between" p={4}>
        <Stack spacing={4} isInline alignItems="center">
          <LogoIcon boxSize="32px" />
          <Link>Feedback</Link>
          <Link>Sites</Link>
        </Stack>
        <Flex
          alignItems="center"
          justifyContent="space-between"
          flexDirection="row"
        >
          {auth?.user ? (
            <Link mr={4} onClick={() => auth.signout()}>
              Log Out
            </Link>
          ) : null}
          <Avatar size="sm" src={auth?.user?.photoUrl} />
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
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink color="gray.700" fontSize="md">
                Sites
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Flex justify="space-between" alignItems="center" mb="2">
            <Heading>My Sites</Heading>
            <AddSiteModal>+ Add Site</AddSiteModal>
          </Flex>
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
}
