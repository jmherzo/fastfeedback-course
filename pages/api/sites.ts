import { getUserSites } from '@/lib/db-admin';
import { auth } from '@/lib/firebase-admin';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { token } = req.headers as { token: string };
    const user = await auth.verifyIdToken(token);
    const sites = await getUserSites(user.uid);
    res.status(200).json(sites);
  } catch (error) {
    res.status(500).json({ error });
  }
}
