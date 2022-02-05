import { getUserFeedback } from '@/lib/db-admin';
import { auth } from '@/lib/firebase-admin';
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
    res.status(500).json({ error });
  }
}
