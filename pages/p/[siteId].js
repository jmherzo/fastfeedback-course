import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Feedback from '@/components/Feedback';
import { useAuth } from '@/lib/auth';
import { getAllFeedback, getAllSites } from '@/lib/db-admin';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast
} from '@chakra-ui/react';
import { createFeedback } from '@/lib/db';

export async function getStaticProps(context) {
  const siteId = context.params.siteId;
  // Add error handling
  const { feedback } = await getAllFeedback(siteId);
  return {
    props: {
      initialFeedback: feedback
    }
  };
}

export async function getStaticPaths() {
  const { sites } = await getAllSites();
  const paths = sites.map((site) => ({
    params: { siteId: site.id.toString() }
  }));
  return {
    paths: paths,
    fallback: false
  };
}

export default function SiteFeedback({ initialFeedback }) {
  const auth = useAuth();
  const router = useRouter();
  const inputEl = useRef(null);
  const toast = useToast();
  const [allFeedback, setAllFeedback] = useState(initialFeedback);
  async function onSubmit(e) {
    //To prevent the page from reloading
    e.preventDefault();
    try {
      const newFeedBack = {
        author: auth.user.name,
        authorId: auth.user.uid,
        siteId: router.query.siteId,
        text: inputEl.current.value,
        createdAt: new Date().toISOString(),
        provider: auth.user.provider,
        status: 'pending'
      };
      await createFeedback(newFeedBack);
      // Using Optimistic UI approach
      setAllFeedback([newFeedBack, ...allFeedback]);
    } catch (e) {
      console.log(e);
      toast({
        title: 'Comment not added',
        description: 'There was a problem adding your comment.',
        status: 'error',
        duration: 12000,
        isClosable: true
      });
    }
  }
  return (
    <Box
      display="flex"
      flexDirection="column"
      width="full"
      maxWidth="700px"
      margin="0 auto"
    >
      <Box as="form" onSubmit={onSubmit}>
        <FormControl my={8}>
          <FormLabel htmlFor="comment">Comment</FormLabel>
          <Input ref={inputEl} id="comment" type="comment" />
          <Button mt={2} type="submit" fontWeight="medium">
            Add comment
          </Button>
        </FormControl>
      </Box>
      {allFeedback.map((feedback) => (
        <Feedback key={feedback.id} {...feedback} />
      ))}
    </Box>
  );
}
