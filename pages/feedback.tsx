import { EmptyState } from '@/components/EmptyState';
import { DashboardShell } from '@/components/DashboardShell';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import { FeedbackTable } from '@/components/Feedback/FeedbackTable';
import { FeedbackTableHeader } from '@/components/Feedback/FeedbackTableHeader';
import { useFeedback } from 'hooks/useFeedback';

function Feedback() {
  const { data, isValidating } = useFeedback();
  if (isValidating) {
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
