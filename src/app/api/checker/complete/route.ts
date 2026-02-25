import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const schema = z.object({ sessionId: z.string().min(1) });

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const session = await prisma.checkerSession.findUnique({ where: { id: parsed.data.sessionId } });
  if (!session) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const seconds = Math.max(1, Math.floor((Date.now() - session.startedAt.getTime()) / 1000));
  await prisma.checkerSession.update({
    where: { id: session.id },
    data: { completed: true, completedAt: new Date(), completionSeconds: seconds }
  });

  return NextResponse.json({ ok: true });
}
