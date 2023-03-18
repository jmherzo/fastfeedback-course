import {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode,
  useCallback
} from 'react';
import { firebase } from '@/lib/firebase';
import { createUser } from './db';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useToast } from '@chakra-ui/react';
import { cookieNames } from '@/utils/cookienames';

type ProviderType = 'Google' | 'Github';

interface Authentication {
  user?: User | null;
  isSignedIn?: boolean;
  signInWithProvider?(providerType: ProviderType): Promise<void>;
  signout?: () => Promise<void>;
}

export interface User {
  email: string | null;
  name: string | null;
  photoUrl: string | null;
  provider?: string;
  jwt: string;
  uid: string;
}

const AuthContext = createContext<Authentication>({});

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuthProvider();
  return <AuthContext.Provider value={auth}> {children} </AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

const formatUser = async (user: firebase.User): Promise<User> => ({
  uid: user.uid,
  email: user.email,
  name: user.displayName,
  jwt: await user.getIdToken(),
  provider: user.providerData?.[0]?.providerId,
  photoUrl: user.photoURL
});

function useAuthProvider(): Authentication {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const toast = useToast();
  // TODO: change to determine signed in state in server and in client via jwt
  const isSignedIn = Cookies.get(cookieNames.auth) === 'true';
  const handleUser = useCallback(
    async (userFromProvider: firebase.User | null) => {
      if (userFromProvider) {
        const newUser = await formatUser(userFromProvider);
        await createUser(newUser);
        // TODO: store jwt token in cookie
        Cookies.set(cookieNames.auth, 'true', {});
        setUser(newUser);
        return newUser;
      } else {
        setUser(null);
        Cookies.remove(cookieNames.auth);
        return null;
      }
    },
    []
  );

  const signInWithProvider = async (providerType: ProviderType) => {
    let provider: firebase.auth.AuthProvider;
    switch (providerType) {
      case 'Github':
        provider = new firebase.auth.GithubAuthProvider();
        break;
      case 'Google':
        provider = new firebase.auth.GoogleAuthProvider();
        break;
      default:
        // TODO: improve logic
        provider = new firebase.auth.GithubAuthProvider();
    }
    return firebase
      .auth()
      .signInWithPopup(provider)
      .then((response) => {
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
        toast({
          title: 'Sorry, there was a problem!',
          description: 'We could not log you in. Please contact support.',
          status: 'error',
          duration: 12000,
          isClosable: true
        });
      });
  };

  const signout = async () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        handleUser(null);
        router.push('/');
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
    isSignedIn,
    signInWithProvider,
    signout
  };
}
