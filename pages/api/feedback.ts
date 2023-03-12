import { getUserFeedback } from '@/lib/db-admin';
import { auth } from '@/lib/firebaseAdmin';
import { logger } from '@/utils/logger';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function hanlder(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { token } = req.headers as { token: string };
    const user = await auth.verifyIdToken(token);
    const feedback = await getUserFeedback(user.uid);
    res.status(200).json(feedback);
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
