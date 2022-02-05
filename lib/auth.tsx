import {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode,
  useCallback
} from 'react';
import firebase from '@/lib/firebase';
import { createUser } from './db';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

interface Authentication {
  user?: User | null;
  signinWithGithub?: () => Promise<void>;
  signout?: () => Promise<void>;
}

export interface User {
  email: string | null;
  name: string | null;
  photoUrl: string | null;
  provider?: string;
  token: string;
  uid: string;
}

const authContext = createContext<Authentication>({});

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}> {children} </authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

const formatUser = async (user: firebase.User): Promise<User> => ({
  uid: user.uid,
  email: user.email,
  name: user.displayName,
  token: await user.getIdToken(),
  provider: user.providerData?.[0]?.providerId,
  photoUrl: user.photoURL
});

function useProvideAuth(): Authentication {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const handleUser = useCallback(
    async (userFromProvider: firebase.User | null) => {
      if (userFromProvider) {
        const newUser = await formatUser(userFromProvider);
        await createUser(newUser);
        Cookies.set('fast-feedback-auth', 'true', {
          expires: 1
        });
        setUser(newUser);
        return newUser;
      } else {
        setUser(null);
        Cookies.remove('fast-feedback-auth');
        // router.push('/');
        return null;
      }
    },
    []
  );

  const signinWithGithub = async () => {
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then((response) => {
        const credential = response.credential;
        const tokne = response.user?.getIdToken();
        if (!response.user) {
          console.log('Missing from response');
          throw new Error('Missing user from response');
        }
        if (!response.user?.email) {
          console.log('Missing property email');
          throw new Error('Missing property email');
        }
        if (!response.user?.displayName) {
          console.log('Missing property displayname');
          throw new Error('Missing property displayname');
        }
        handleUser(response.user);
        router.push('/dashboard');
      })
      .catch((error) => {
        console.log({ error });
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
  }, [handleUser]);

  return {
    user,
    signinWithGithub,
    signout
  };
}
