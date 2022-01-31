import React from 'react';
import { Heading, Box, Text, Button } from '@chakra-ui/react';
import { DashboardShell } from './DashboardShell';

export function FreePlanEmptyState() {
  return (
    <DashboardShell>
      <Box backgroundColor="white" borderRadius="8px" p={8}>
        <Heading size="md" as="h2">
          Get feedback on your site instantly
        </Heading>
        <Text>Start today, then grow with us</Text>
        <Button variant="solid" size="md" mt={4}>
          Upgrade to Starter
        </Button>
      </Box>
    </DashboardShell>
  );
}
