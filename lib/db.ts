import firebase from 'firebase';
import { User } from './auth';
import { Feedback } from './interfaces/Feedback';
import { Site } from './interfaces/Site';

const firestore = firebase.firestore();

export function createUser(user: User) {
  return firestore
    .collection('users')
    .doc(user.uid)
    .set({ ...user }, { merge: true });
}

export function createSite(data: Site) {
  // .add will assign a doc id automatically
  return firestore.collection('sites').add(data);
  // Error test
  //return Promise.reject('This an error in create site');
}

export function createFeedback(data: Feedback) {
  return firestore.collection('feedback').add(data);
}

export function deleteFeedback(id: string) {
  return firestore.collection('feedback').doc(id).delete();
}
