import React from 'react';
import {
  Flex,
  Link,
  Stack,
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Box,
  Text,
  Button
} from '@chakra-ui/react';
import { LogoIcon } from './Icons';
import { useAuth } from '@/lib/auth';

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
          <Link mr={4}>Account</Link>
          <Avatar size="sm" src={auth?.user.photoUrl} />
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
          <Heading>Sites</Heading>
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
}
