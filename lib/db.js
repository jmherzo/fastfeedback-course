import firebase from 'firebase';

const firestore = firebase.firestore();

export function createUser(uid, data) {
  return firestore
    .collection('users')
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
}

export function createSite(data) {
  // .add will assign a doc id automatically
  return firestore.collection('sites').add(data);
  // Error test
  //return Promise.reject('This an error in create site');
}

export function createFeedback(data) {
  return firestore.collection('feedback').add(data);
}
