export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/prisma';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default async function AdminOverviewPage() {
  const [sessionCount, completionCount, programmes] = await Promise.all([
    prisma.checkerSession.count({ where: { startedAt: { gte: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30) } } }),
    prisma.checkerSession.count({ where: { completed: true } }),
    prisma.programme.findMany({ orderBy: { order: 'asc' }, take: 5 })
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-nhs-blue">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-4">
        <Stat title="Total Uses (30d)" value={String(sessionCount)} />
        <Stat title="Completion Rate" value={`${sessionCount ? Math.round((completionCount / sessionCount) * 100) : 0}%`} />
        <Stat title="Matched Programmes" value={String(programmes.length)} />
        <Stat title="Avg. Completion Time" value="~2m 10s" />
      </div>
      <Card>
        <CardHeader>
          <h2 className="font-semibold">Recent Programmes</h2>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          {programmes.map((programme) => (
            <p key={programme.id}>{programme.name}</p>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function Stat({ title, value }: { title: string; value: string }) {
  return (
    <Card>
      <CardContent className="p-4">
        <p className="text-sm text-slate-500">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}
