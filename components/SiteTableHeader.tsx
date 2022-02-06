import React from 'react';
import {
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading
} from '@chakra-ui/react';
import { AddSiteModal } from './AddSiteModal';

type SiteTableHeaderProps = {
  showAddSite?: boolean;
};

export function SiteTableHeader({ showAddSite = true }: SiteTableHeaderProps) {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink color="gray.700" fontSize="md">
            Sites
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex justify="space-between" alignItems="center" mb="2">
        <Heading>My Sites</Heading>
        {showAddSite ? <AddSiteModal>+ Add Site</AddSiteModal> : null}
      </Flex>
    </>
  );
}
