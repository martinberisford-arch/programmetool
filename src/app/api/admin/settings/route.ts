import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const payload = (await req.json()) as Record<string, string>;

  await Promise.all(
    Object.entries(payload).map(([key, value]) =>
      prisma.setting.upsert({
        where: { key },
        update: { value },
        create: { key, value }
      })
    )
  );

  return NextResponse.json({ ok: true });
}
