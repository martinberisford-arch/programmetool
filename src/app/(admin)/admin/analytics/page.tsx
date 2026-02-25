import { AnalyticsDashboard } from '@/components/admin/analytics-dashboard';
import { prisma } from '@/lib/prisma';

export default async function AnalyticsPage() {
  const [sessions, responses, programmes] = await Promise.all([
    prisma.checkerSession.findMany({ orderBy: { startedAt: 'desc' }, take: 500 }),
    prisma.response.findMany({ include: { question: true }, take: 2000 }),
    prisma.programme.findMany()
  ]);

  return <AnalyticsDashboard sessions={sessions} responses={responses} programmes={programmes} />;
}
