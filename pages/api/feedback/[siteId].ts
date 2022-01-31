import { getAllFeedback } from '@/lib/db-admin';

export default async (req, res) => {
  try {
    const siteId = req.query.siteId;
    const { feedback } = await getAllFeedback(siteId);
    res.status(200).json({ feedback });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ error: 'Internal server error getting requested feedback' });
  }
};
