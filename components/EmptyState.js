import React from 'react';
import { Heading, Flex, Text, Button } from '@chakra-ui/react';
import { DashboardShell } from './DashboardShell';
import { AddSiteModal } from './AddSiteModal';

export function EmptyState() {
  return (
    <DashboardShell>
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
        <Text>Welcome, Let's get started.</Text>
        <AddSiteModal />
      </Flex>
    </DashboardShell>
  );
}
