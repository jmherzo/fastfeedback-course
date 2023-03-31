import { useAuth } from '@/lib/auth';
import { FeedbackWithId } from '@/lib/db-admin';
import { get } from '@/utils/fetcher';
import useSWR from 'swr';

export function useFeedback() {
  const { user = null } = useAuth();
  return useSWR<FeedbackWithId[] | undefined>(
    user?.jwt ? ['/api/feedback', user.jwt] : null,
    ([url, token]: [url: string, token: string]) => get(url, token),
    {
      revalidateOnReconnect: false,
      revalidateOnFocus: false
    }
  );
}
