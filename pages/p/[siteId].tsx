import { FormEvent, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Feedback as FeedBackComponent } from '@/components/Feedback';
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
import { DashboardShell } from '@/components/DashboardShell';
import { type Feedback } from '@/lib/interfaces/Feedback';

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
  // Modify later to put a max limit
  const paths = sites.map((site) => ({
    params: { siteId: site.id }
  }));
  return {
    paths: paths,
    fallback: true
  };
};

function SiteFeedback({ initialFeedback }: SiteFeedbackProps) {
  const auth = useAuth();
  const router = useRouter();
  const inputEl = useRef<HTMLInputElement>(null);
  const toast = useToast();
  const [allFeedback, setAllFeedback] = useState<FeedbackWithId[] | null>(
    initialFeedback
  );

  useEffect(() => {
    // clean the input
    if (inputEl?.current?.value) {
      inputEl.current.value = '';
    }
  }, [allFeedback]);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      const newFeedBack: Feedback = {
        author: auth.user?.name,
        authorId: auth.user?.uid,
        siteId: router.query.siteId as string,
        text: inputEl?.current?.value,
        createdAt: new Date().toISOString(),
        provider: auth.user?.provider,
        status: 'pending'
      };
      //TODO: CHANGE TO MUTATE
      await createFeedback(newFeedBack);
      const newFeedBackWithId: FeedbackWithId = {
        documentId: crypto.randomUUID?.() ?? '',
        ...newFeedBack
      };
      // Using Optimistic UI approach
      if (allFeedback) {
        setAllFeedback([newFeedBackWithId, ...allFeedback]);
      }
    } catch (e) {
      console.log(e);
      toast({
        title: 'Your comment was not added',
        description: 'Please try again.',
        status: 'error',
        duration: 12000,
        isClosable: true
      });
    }
  }
  return (
    <DashboardShell>
      <Box display="flex" flexDirection="column" width="full" maxWidth="700px">
        <Box as="form" onSubmit={onSubmit}>
          <FormControl mb={8}>
            <FormLabel htmlFor="comment">Comment</FormLabel>
            <Input ref={inputEl} id="comment" type="comment" />
            <Button type="submit" mt={2} fontWeight="medium">
              Add comment
            </Button>
          </FormControl>
        </Box>
        {allFeedback?.map((feedback) => (
          <FeedBackComponent
            key={feedback.documentId}
            author={feedback.author}
            text={feedback.text}
            createdAt={feedback.createdAt}
          />
        ))}
      </Box>
    </DashboardShell>
  );
}

export default SiteFeedback;
