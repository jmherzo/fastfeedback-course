import { getAllFeedback } from '@/lib/db-admin';
import { logger } from '@/utils/logger';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const siteId = req.query.siteId;
    if (typeof siteId === 'string') {
      const feedback = await getAllFeedback(siteId);
      res.status(200).json({ feedback });
    } else {
      throw TypeError('SiteId is not a string');
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
