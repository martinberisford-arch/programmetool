export const dynamic = 'force-dynamic';

import { ProgrammeManager } from '@/components/admin/programme-manager';
import { prisma } from '@/lib/prisma';

export default async function ProgrammesPage() {
  const programmes = await prisma.programme.findMany({ orderBy: { order: 'asc' } });
  return <ProgrammeManager initialProgrammes={programmes} />;
}
