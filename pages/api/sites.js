import { getAllSites } from '@/lib/db-admin';

export default async (_, res) => {
  try {
    const { sites } = await getAllSites();
    res.status(200).json({ sites });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Internal server error getting the sites' });
  }
};
