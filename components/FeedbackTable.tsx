import React from 'react';
import { Box, Code, Switch } from '@chakra-ui/react';
import { Table, Tr, Th, Td } from './Table';
import { RemoveButton } from './RemoveButton';
import { FeedbackWithId } from '@/lib/db-admin';

type FeedbackTableProps = {
  feedback: FeedbackWithId[];
};

export const FeedbackTable = ({ feedback }: FeedbackTableProps) => {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Feedback</Th>
          <Th>Route</Th>
          <Th>Visible</Th>
          <Th>{''}</Th>
        </Tr>
      </thead>
      <tbody>
        {feedback.map((feedback, i) => (
          <Box as="tr" key={feedback.id + i}>
            <Td fontWeight="medium">{feedback.author}</Td>
            <Td>{feedback.text}</Td>
            <Td>
              <Code>{'/'}</Code>
            </Td>
            <Td>
              <Switch
                defaultChecked={feedback.status === 'active'}
                size="md"
                colorScheme="whatsapp"
              />
            </Td>
            <Td>
              <RemoveButton feedbackId={feedback.id} />
            </Td>
          </Box>
        ))}
      </tbody>
    </Table>
  );
};
