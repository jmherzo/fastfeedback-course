import { getAllFeedback } from '@/lib/db-admin';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { siteId } = req.query as { siteId: string };
    const feedback = await getAllFeedback(siteId);
    res.status(200).json({ feedback });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ error: 'Internal server error getting requested feedback' });
  }
}
