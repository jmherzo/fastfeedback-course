import { getUserSites } from '@/lib/db-admin';
import { auth } from '@/lib/firebase-admin';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const user = await auth.verifyIdToken(req.headers?.token as string);
    const sites = await getUserSites(user.uid);
    res.status(200).json(sites);
  } catch (error) {
    res.status(500).json({ error });
  }
};
