import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const sessions = await prisma.checkerSession.findMany({ include: { responses: true } });
  const csv = ['sessionId,startedAt,completed,completionSeconds,responseCount'];
  for (const session of sessions) {
    csv.push([session.id, session.startedAt.toISOString(), String(session.completed), String(session.completionSeconds ?? ''), String(session.responses.length)].join(','));
  }

  return new NextResponse(csv.join('\n'), {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="analytics-export.csv"'
    }
  });
}
