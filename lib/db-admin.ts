import { compareDesc, parseISO } from 'date-fns';
import { firestore } from './firebase-admin';
import { Feedback } from './interfaces/Feedback';
import { Site } from './interfaces/Site';

export interface FeedbackWithId extends Feedback {
  id: string;
}

export interface SiteWithId extends Site {
  id: string;
}

export async function getAllFeedback(siteId: string) {
  const snapshot = await firestore
    .collection('feedback')
    .where('siteId', '==', siteId)
    ?.get();
  const feedback: FeedbackWithId[] = [];
  snapshot?.forEach((doc) => {
    feedback.push({ id: doc.id, ...doc.data() } as FeedbackWithId);
  });
  feedback.sort((a, b) =>
    compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
  );
  return feedback;
}

export async function getAllSites() {
  const snapshot = await firestore.collection('sites')?.get();
  const sites: SiteWithId[] = [];
  snapshot?.forEach((site) => {
    sites.push({ id: site.id, ...site.data() } as SiteWithId);
  });
  return sites;
}

export async function getUserSites(uid: string) {
  const snapshot = await firestore
    .collection('sites')
    ?.where('authorId', '==', uid)
    ?.get();
  const sites: SiteWithId[] = [];
  snapshot?.forEach((site) => {
    sites.push({ id: site.id, ...site.data() } as SiteWithId);
  });
  sites.sort((a, b) =>
    compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
  );
  return sites;
}

export async function getUserFeedback(uid: string) {
  const snapshot = await firestore
    .collection('feedback')
    ?.where('authorId', '==', uid)
    ?.get();
  const feedback: FeedbackWithId[] = [];
  snapshot?.forEach((doc) => {
    feedback.push({ id: doc.id, ...doc.data() } as FeedbackWithId);
  });
  return feedback;
}
