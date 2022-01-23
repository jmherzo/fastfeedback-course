import db from '@/lib/firebase-admin';

export default async (_, res) => {
  try {
    const sitesCollection = await db.collection('sites')?.get();

    const sites = [];
    sitesCollection.forEach((site) => {
      sites.push({ id: site.id, ...site.data() });
    });
    res.status(200).json({ sites });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Internal server error getting the sites' });
  }
};
