import { FormEvent, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Feedback from '@/components/Feedback';
import { useAuth } from '@/lib/auth';
import { FeedbackWithId, getAllFeedback, getAllSites } from '@/lib/db-admin';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast
} from '@chakra-ui/react';
import { createFeedback } from '@/lib/db';
import { GetStaticProps, GetStaticPaths } from 'next';
import { Feedback as FeedbackType } from '@/lib/interfaces/Feedback';

type SiteFeedbackProps = {
  initialFeedback: FeedbackWithId[] | null;
};

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const siteId = context?.params?.siteId as string;
    const feedback = await getAllFeedback(siteId);
    return {
      props: {
        initialFeedback: feedback
      },
      revalidate: 1
    };
  } catch (e) {
    console.log(e);
    return {
      props: {
        initialFeedback: null
      }
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const sites = await getAllSites();
  const paths = sites.map((site) => ({
    params: { siteId: site.id }
  }));
  return {
    paths: paths,
    fallback: false
  };
};

export default function SiteFeedback({ initialFeedback }: SiteFeedbackProps) {
  const auth = useAuth();
  const router = useRouter();
  const inputEl = useRef<HTMLInputElement>(null);
  const toast = useToast();
  const [allFeedback, setAllFeedback] = useState<FeedbackWithId[] | null>(
    initialFeedback
  );
  async function onSubmit(event: FormEvent) {
    //To prevent the page from reloading
    event.preventDefault();
    try {
      const newFeedBack: FeedbackType = {
        author: auth.user?.name,
        authorId: auth.user?.uid,
        siteId: router.query.siteId as string,
        text: inputEl?.current?.value,
        createdAt: new Date().toISOString(),
        provider: auth.user?.provider,
        status: 'pending'
      };
      await createFeedback(newFeedBack);
      // Using Optimistic UI approach
      if (allFeedback) {
        setAllFeedback([newFeedBack as FeedbackWithId, ...allFeedback]);
      }
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
      {allFeedback?.map((feedback) => (
        <Feedback
          key={feedback.id}
          author={feedback.author}
          text={feedback.text}
          createdAt={feedback.createdAt}
        />
      ))}
    </Box>
  );
}
