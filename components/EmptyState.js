import React from 'react';
import { Heading, Flex, Text } from '@chakra-ui/react';
import { AddSiteModal } from './AddSiteModal';

export function EmptyState() {
  return (
    <Flex
      id="EmptyState"
      flexDirection="column"
      alignItems="center"
      backgroundColor="white"
      borderRadius="8px"
      p={12}
      mt={4}
    >
      <Heading size="lg" as="h2">
        You haven't added any sites.
      </Heading>
      <Text>Let's get started.</Text>
      <AddSiteModal> Add your first site </AddSiteModal>
    </Flex>
  );
}
