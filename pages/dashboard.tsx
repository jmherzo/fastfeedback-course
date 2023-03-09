import { EmptyState } from '@/components/EmptyState';
import { DashboardShell } from '@/components/DashboardShell';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import useSWR from 'swr';
import { get } from '@/utils/fetcher';
import SiteTable from '@/components/SiteTable';
import { useAuth } from '@/lib/auth';
import { SiteTableHeader } from '@/components/SiteTableHeader';
import { SiteWithId } from '@/lib/db-admin';

function Dashboard() {
  const { user = null } = useAuth();
  const { data } = useSWR<SiteWithId[]>(
    user?.token ? ['/api/sites', user.token] : null,
    ([url, token]: [url: any, token: string]) => get(url, token)
  );
  if (!data) {
    return (
      <DashboardShell>
        <SiteTableHeader />
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }
  return (
    <DashboardShell>
      <SiteTableHeader showAddSite={data?.length > 0} />
      {data?.length ? <SiteTable sites={data} /> : <EmptyState type="site" />}
    </DashboardShell>
  );
}

export default Dashboard;
