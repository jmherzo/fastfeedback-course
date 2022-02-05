import React from 'react';
import { Box, Link } from '@chakra-ui/react';
import { Table, Tr, Th, Td } from './Table';
import { format, parseISO } from 'date-fns';
import NextLink from 'next/link';

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
  return (
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
        {sites?.map((site, i) => (
          <Box as="tr" key={site.id + i}>
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
          </Box>
        ))}
      </tbody>
    </Table>
  );
};

export default SiteTable;