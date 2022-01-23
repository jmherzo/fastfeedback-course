import { EmptyState } from '@/components/EmptyState';
import { DashboardShell } from '@/components/DashboardShell';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import useSWR from 'swr';
import { fetcher } from '@/utils/fetcher';
import SiteTable from '@/components/SiteTable';
export default function Dashboard() {
  const { data } = useSWR('/api/sites', fetcher);
  if (data?.sites === 0) {
    <DashboardShell>
      <EmptyState />
    </DashboardShell>;
  }
  return (
    <DashboardShell>
      {data?.sites ? <SiteTable sites={data?.sites} /> : <SiteTableSkeleton />}
    </DashboardShell>
  );
}
