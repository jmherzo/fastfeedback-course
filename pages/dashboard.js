import { EmptyState } from '@/components/EmptyState';
import { DashboardShell } from '@/components/DashboardShell';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import useSWR from 'swr';
import { fetcher } from '@/utils/fetcher';
import SiteTable from '@/components/SiteTable';
import { useAuth } from '@/lib/auth';

export default function Dashboard() {
  const { user = null } = useAuth();
  const { data } = useSWR(
    user?.token ? ['/api/sites', user.token] : null,
    fetcher
  );
  if (!data) {
    return (
      <DashboardShell>
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }
  return (
    <DashboardShell>
      {data.sites ? <SiteTable sites={data?.sites} /> : <EmptyState />}
    </DashboardShell>
  );
}
