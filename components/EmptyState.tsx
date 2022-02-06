import React from 'react';
import { Heading, Flex, Text, Button } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { AddSiteModal } from './AddSiteModal';

export function EmptyState() {
  const router = useRouter();
  return (
    <Flex
      id="EmptyState"
      flexDirection="column"
      alignItems="center"
      backgroundColor="white"
      borderRadius="8px"
      p={8}
    >
      {router.asPath === '/' ? (
        <>
          <Heading size="lg" as="h2">
            Fast Feedback by jmherzo
          </Heading>
          <NextLink href="/dashboard">
            <Button mt={8} colorScheme="blue">
              Go to Dashboard
            </Button>
          </NextLink>
        </>
      ) : (
        <>
          <Heading size="md" as="h3" display="flex" textAlign="left" mb={8}>
            {'You have not added any sites.'}
          </Heading>
          <AddSiteModal>+ Add Site</AddSiteModal>
        </>
      )}
    </Flex>
  );
}
