import Head from 'next/head';
import { useAuth } from '../lib/auth';
import styles from '../styles/Home.module.css';

export default function Home() {
  const auth = useAuth();
  console.log(auth.user);
  return (
    <div className={styles.container}>
      <Head>
        <title>Fastfeedback</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>This is Fastfeedback!</h1>
        {auth?.user ? (
          <button onClick={(e) => auth.signout()}>{'Sign out'}</button>
        ) : (
          <button onClick={(e) => auth.signinWithGithub()}>
            {'Sign in with Github'}
          </button>
        )}

        <div>{auth?.user?.email}</div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
