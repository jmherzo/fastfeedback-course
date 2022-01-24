import { compareDesc, parseISO } from 'date-fns';
import firebase from './firebase-admin';

export async function getAllFeedback(siteId) {
  const snapshot = await firebase
    .collection('feedback')
    .where('siteId', '==', siteId)
    ?.get();
  const feedback = [];
  snapshot?.forEach((doc) => {
    feedback.push({ id: doc.id, ...doc.data() });
  });
  feedback.sort((a, b) =>
    compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
  );
  return { feedback };
}

export async function getAllSites() {
  const snapshot = await firebase.collection('sites')?.get();
  const sites = [];
  snapshot?.forEach((site) => {
    sites.push({ id: site.id, ...site.data() });
  });
  return { sites };
}
