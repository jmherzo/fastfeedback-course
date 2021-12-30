import { useAuth } from '@/lib/auth';
import { EmptyState } from '@/components/EmptyState';

export default function Dashboard() {
  const auth = useAuth();
  if (!auth?.user) {
    return 'loading...';
  }
  return <EmptyState />;
}
