import React from 'react';
import { Box, Code, IconButton, Switch, Tooltip } from '@chakra-ui/react';
import { Table, Tr, Th, Td } from './Table';

const FeedbackTable = ({ feedbacks }) => {
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
        {feedbacks?.map((feedback, i) => (
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
              <Tooltip label="remove">
                <IconButton
                  variant="ghost"
                  aria-label="Remove feedback"
                  icon="delete"
                />
              </Tooltip>
            </Td>
          </Box>
        ))}
      </tbody>
    </Table>
  );
};

export default FeedbackTable;
