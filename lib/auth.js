import React, { useState, useEffect, useContext, createContext } from 'react';
import firebase from '@/lib/firebase';
import { createUser } from './db';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}> {children} </authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

const formatUser = (user) => ({
  uid: user.uid,
  email: user.email, // Handle with try catch
  name: user.displayName,
  token: user.za, // JWT from firebase
  provider: user.providerData?.[0]?.providerId,
  photoUrl: user.photoURL
});

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const handleUser = (rawUser) => {
    if (rawUser) {
      const user = formatUser(rawUser);
      const { token, ...userWithoutToken } = user;

      // Creating user in DB wihtout token as DB was not designed to have that field
      createUser(user.uid, userWithoutToken);
      Cookies.set('fast-feedback-auth', true, {
        expires: 1
      });
      setUser(user);

      return user;
    } else {
      setUser(null);
      Cookies.remove('fast-feedback-auth');
      router.push('/');
      return null;
    }
  };

  const signinWithGithub = async () => {
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then((response) => {
        handleUser(response.user);
        router.push('/dashboard');
      });
  };

  const signout = async () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        handleUser(null);
      });
  };

  useEffect(() => {
    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged((user) => handleUser(user));

    return () => unsubscribe();
  }, []);

  return {
    user,
    signinWithGithub,
    signout
  };
}
