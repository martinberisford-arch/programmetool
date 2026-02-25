export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/prisma';
import { CheckerFlow } from '@/components/checker/checker-flow';

export default async function CheckerPage({ searchParams }: { searchParams: { preview?: string } }) {
  const [questions, programmes] = await Promise.all([
    prisma.question.findMany({ where: { status: 'ACTIVE' }, orderBy: { order: 'asc' } }),
    prisma.programme.findMany({ where: { status: 'ACTIVE' }, orderBy: { order: 'asc' } })
  ]);

  return <CheckerFlow questions={questions} programmes={programmes} preview={searchParams.preview === '1'} />;
}
