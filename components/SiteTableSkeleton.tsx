import React from 'react';
import { Accordion, AccordionItem, Box, Skeleton } from '@chakra-ui/react';
import { Table, Tr, Th, Td } from './Table';
import { useIsMobile } from '@/utils/useIsMobile';

type SkeletonRowProps = {
  width: string;
};

const SkeletonRow = ({ width }: SkeletonRowProps) => (
  <Box as="tr">
    <Td>
      <Skeleton height="10px" w={width} my={4} />
    </Td>
    <Td>
      <Skeleton height="10px" w={width} my={4} />
    </Td>
    <Td>
      <Skeleton height="10px" w={width} my={4} />
    </Td>
    <Td>
      <Skeleton height="10px" w={width} my={4} />
    </Td>
  </Box>
);

const SiteTableSkeleton = () => {
  const isMobile = useIsMobile();
  return isMobile ? (
    <Accordion>
      <AccordionItem>
        <Skeleton height="20px" minWidth="100%" my={4} />
      </AccordionItem>
      <AccordionItem>
        <Skeleton height="20px" minWidth="100%" my={4} />
      </AccordionItem>
      <AccordionItem>
        <Skeleton height="20px" minWidth="100%" my={4} />
      </AccordionItem>
      <AccordionItem>
        <Skeleton height="20px" minWidth="100%" my={4} />
      </AccordionItem>
    </Accordion>
  ) : (
    <Table>
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Site Link</Th>
          <Th>Feedback Link</Th>
          <Th>Date Added</Th>
          <Th>{''}</Th>
        </Tr>
      </thead>
      <tbody>
        <SkeletonRow width="75px" />
        <SkeletonRow width="125px" />
        <SkeletonRow width="50px" />
        <SkeletonRow width="100px" />
        <SkeletonRow width="75px" />
      </tbody>
    </Table>
  );
};

export default SiteTableSkeleton;
