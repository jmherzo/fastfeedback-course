import React from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Link,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Heading
} from '@chakra-ui/react';
// import { Table, Tr, Th, Td } from './Table';
import { format, parseISO } from 'date-fns';
import NextLink from 'next/link';
import { useIsMobile } from '@/utils/useIsMobile';

interface Site {
  id: string;
  name: string;
  url: string;
  createdAt: string;
}

interface SiteTableProps {
  sites: Site[];
}

const SiteTable = ({ sites }: SiteTableProps) => {
  const isMobile = useIsMobile();
  return isMobile ? (
    <Accordion allowMultiple allowToggle mt={4} bg="whiteAlpha">
      {sites.map((site) => (
        <AccordionItem key={site.id}>
          <Box as="h1" bg="whiteAlpha.500">
            <AccordionButton borderBottom="1" p={4}>
              <Box flex="1" textAlign="left">
                <Heading size="md" fontWeight="normal">
                  {site.name}
                </Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </Box>
          <AccordionPanel>
            <Stack spacing={4}>
              <Box flexDirection="column">
                <Heading size="sm" fontWeight="semibold">
                  Url:
                </Heading>
                <Link isExternal href={site.url} variant="primary">
                  {site.url}
                </Link>
              </Box>
              <Box flexDirection="column">
                <Heading size="sm" fontWeight="semibold">
                  Date Added:
                </Heading>
                {format(parseISO(site.createdAt), 'PPpp')}
              </Box>
              <NextLink href="/p/[siteId]" as={`/p/${site.id}`} passHref>
                <Link variant="primary">View Feedback</Link>
              </NextLink>
              {site.createdAt}
            </Stack>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  ) : (
    <Table>
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Site Link</Th>
          <Th>Feedback Link</Th>
          <Th>Date Added</Th>
          <Th>{''}</Th>
        </Tr>
      </Thead>
      <Tbody>
        {sites.map((site, i) => (
          <Tr key={site.id + i}>
            <Td fontWeight="medium">{site.name}</Td>
            <Td>
              <Link isExternal href={site.url}>
                {site.url}
              </Link>
            </Td>
            <Td>
              <NextLink href="/p/[siteId]" as={`/p/${site.id}`} passHref>
                <Link variant="primary">View Feedback</Link>
              </NextLink>
            </Td>
            <Td>{format(parseISO(site.createdAt), 'PPpp')}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default SiteTable;
