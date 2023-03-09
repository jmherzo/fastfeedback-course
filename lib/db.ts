import { User } from './auth';
import firebase from 'firebase/app';
import { Feedback } from './interfaces/Feedback';
import { Site } from './interfaces/Site';

const firestore = firebase.firestore();

export async function createUser(user: User) {
  return await firestore
    .collection('users')
    .doc(user.uid)
    .set({ ...user }, { merge: true });
}

export async function createSite(data: Site) {
  // .add will assign a doc id automatically
  return await firestore.collection('sites').add(data);
  // Error test
  //return Promise.reject('This an error in create site');
}

export async function createFeedback(data: Feedback) {
  return await firestore.collection('feedback').add(data);
}

export async function deleteFeedback(id: string) {
  return await firestore.collection('feedback').doc(id).delete();
}
