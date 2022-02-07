import { EmptyState } from '@/components/EmptyState';
import { DashboardShell } from '@/components/DashboardShell';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import useSWR from 'swr';
import { fetcher } from '@/utils/fetcher';
import { FeedbackTable } from '@/components/FeedbackTable';
import { useAuth } from '@/lib/auth';
import { FeedbackTableHeader } from '@/components/FeedbackTableHeader';
import { FeedbackWithId } from '@/lib/db-admin';

function Feedback() {
  const { user = null } = useAuth();
  const { data } = useSWR<FeedbackWithId[]>(
    user?.token ? ['/api/feedback', user.token] : null,
    fetcher
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
