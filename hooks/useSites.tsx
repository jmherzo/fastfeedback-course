import { useAuth } from '@/lib/auth';
import { SiteWithId } from '@/lib/db-admin';
import useSWR from 'swr';
import { get } from '@/utils/fetcher';

export function useSites() {
  const { user = null } = useAuth();
  return useSWR<SiteWithId[]>(
    user?.jwt ? ['/api/sites', user.jwt] : null,
    ([url, token]: [url: string, token: string]) => get(url, token),
    {
      revalidateOnReconnect: false
    }
  );
}
