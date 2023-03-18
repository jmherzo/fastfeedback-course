import { EmptyState } from '@/components/EmptyState';
import { DashboardShell } from '@/components/DashboardShell';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import SiteTable from '@/components/SiteTable';
import { SiteTableHeader } from '@/components/SiteTableHeader';
import { GetServerSideProps } from 'next';
import { useSites } from 'hooks/useSites';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req } = ctx;
  //TODO manage the token id to verify the token validity https://firebase.google.com/docs/auth/admin/verify-id-tokens
  const isSignedInServer = req.cookies['fast-feedback-auth'] === 'true';
  return {
    props: { isSignedInServer }
  };
};

function Dashboard() {
  const { data, isValidating } = useSites();
  if (isValidating) {
    return (
      <DashboardShell>
        <SiteTableHeader />
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }
  return (
    <DashboardShell>
      <SiteTableHeader showAddSite={data && data.length > 0} />
      {data?.length ? <SiteTable sites={data} /> : <EmptyState type="site" />}
    </DashboardShell>
  );
}

export default Dashboard;
