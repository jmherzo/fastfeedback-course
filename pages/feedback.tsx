import { EmptyState } from '@/components/EmptyState';
import { DashboardShell } from '@/components/DashboardShell';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import useSWR from 'swr';
import { get } from '@/utils/fetcher';
import { FeedbackTable } from '@/components/Feedback/FeedbackTable';
import { useAuth } from '@/lib/auth';
import { FeedbackTableHeader } from '@/components/Feedback/FeedbackTableHeader';
import { FeedbackWithId } from '@/lib/db-admin';

function Feedback() {
  const { user = null } = useAuth();
  const { data } = useSWR<FeedbackWithId[]>(
    user?.jwt ? ['/api/feedback', user.jwt] : null,
    ([url, token]: [url: string, token: string]) => get(url, token)
  );
  if (!data) {
    return (
      <DashboardShell>
        <FeedbackTableHeader />
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }
  return (
    <DashboardShell>
      <FeedbackTableHeader />
      {data.length ? (
        <FeedbackTable feedback={data} />
      ) : (
        <EmptyState type="feedback" />
      )}
    </DashboardShell>
  );
}

export default Feedback;
