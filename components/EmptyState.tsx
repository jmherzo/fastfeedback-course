import React from 'react';
import { Heading, Flex, Text, Button } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

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
          <Heading size="lg" as="h2">
            You haven't added data.
          </Heading>
          <Text>Let's get started.</Text>
        </>
      )}
    </Flex>
  );
}
