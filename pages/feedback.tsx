import { EmptyState } from '@/components/EmptyState';
import { DashboardShell } from '@/components/DashboardShell';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import useSWR from 'swr';
import { fetcher } from '@/utils/fetcher';
import FeedbackTable from '@/components/FeedbackTable';
import { useAuth } from '@/lib/auth';
import { FeedbackTableHeader } from '@/components/FeedbackTableHeader';

function Feedback() {
  const { user = null } = useAuth();
  const { data } = useSWR(
    user?.token ? ['/api/feedbacks', user.token] : null,
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
      {data.feedbacks?.length ? (
        <FeedbackTable feedbacks={data?.feedbacks} />
      ) : (
        <EmptyState />
      )}
    </DashboardShell>
  );
}

export default Feedback;
