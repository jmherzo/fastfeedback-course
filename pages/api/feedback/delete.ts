import { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '@/lib/firebaseAdmin';
import { deleteFeedback } from '@/lib/db';
import { getUserFeedback } from '@/lib/db-admin';
import { logger } from '@/utils/logger';

export default async function hanlder(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { token } = req.headers as { token: string };
    const user = await auth.verifyIdToken(token);
    if (user) {
      const feedbackId: string = req.body.feedbackId;
      console.log(feedbackId);
      await deleteFeedback(feedbackId);
      const feedback = await getUserFeedback(user.uid);
      res.status(200).json(feedback);
    } else {
      throw Error('User not signed in');
    }
  } catch (error) {
    logger.error(
      {
        request: {
          url: req.url,
          method: req.method
        },
        response: {
          statusCode: res.statusCode
        }
      },
      error instanceof Error ? error.message : `${error}`
    );
    res.status(500).json({ error });
  }
}
