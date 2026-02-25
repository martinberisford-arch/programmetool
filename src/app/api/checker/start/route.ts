import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const body = (await req.json()) as { deviceType?: string; referrer?: string; userAgent?: string };
  const session = await prisma.checkerSession.create({
    data: {
      sessionToken: crypto.randomUUID(),
      deviceType: body.deviceType ?? 'unknown',
      referrer: body.referrer,
      userAgent: body.userAgent
    }
  });
  return NextResponse.json({ sessionId: session.id, token: session.sessionToken });
}
