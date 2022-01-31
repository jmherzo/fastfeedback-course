import React from 'react';
import { Box, Heading, Text, Divider } from '@chakra-ui/react';
import { format, parseISO } from 'date-fns';

const Feedback = ({ author, text, createdAt }) => {
  const authorColor = {
    light: 'gray.900',
    dark: 'gray.200'
  };
  const textColor = {
    light: 'gray.800',
    dark: 'gray.300'
  };
  const dividerColor = {
    light: 'gray.200',
    dark: 'gray.700'
  };

  return (
    <Box borderRadius={4} maxWidth="700px" w="full">
      <Heading
        size="sm"
        as="h3"
        mb={0}
        color={authorColor['light']}
        fontWeight="medium"
      >
        {author}
      </Heading>
      <Text color="gray.500" mb={4} fontSize="xs">
        {format(parseISO(createdAt), 'PPpp')}
      </Text>
      <Text color={textColor['light']}>{text}</Text>
      <Divider borderColor={dividerColor['light']} mt={6} mb={6} />
    </Box>
  );
};

export default Feedback;
