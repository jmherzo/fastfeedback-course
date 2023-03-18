import React from 'react';
import {
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading
} from '@chakra-ui/react';

export function FeedbackTableHeader() {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink color="gray.700" fontSize="md">
            Feedback
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex justify="space-between" alignItems="center" mb="2">
        <Heading>My Feedback</Heading>
      </Flex>
    </>
  );
}
