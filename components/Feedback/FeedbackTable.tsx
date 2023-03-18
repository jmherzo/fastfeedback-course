import React from 'react';
import {
  Box,
  Code,
  Switch,
  Table,
  Thead,
  Th,
  Tr,
  Tbody,
  Td
} from '@chakra-ui/react';
import { RemoveButton } from '../RemoveButton';
import { FeedbackWithId } from '@/lib/db-admin';

type FeedbackTableProps = {
  feedback: FeedbackWithId[];
};

export const FeedbackTable = ({ feedback }: FeedbackTableProps) => {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Feedback</Th>
          <Th>Route</Th>
          <Th>Visible</Th>
          <Th>{''}</Th>
        </Tr>
      </Thead>
      <Tbody>
        {feedback.map((feedback) => (
          <Box as="tr" key={feedback.documentId}>
            <Td fontWeight="medium">{feedback.author}</Td>
            <Td>{feedback.text}</Td>
            <Td>
              <Code>{`/`}</Code>
            </Td>
            <Td>
              <Switch
                defaultChecked={feedback.status === 'active'}
                size="md"
                colorScheme="whatsapp"
              />
            </Td>
            <Td>
              <RemoveButton feedbackId={feedback.documentId} />
            </Td>
          </Box>
        ))}
      </Tbody>
    </Table>
  );
};
