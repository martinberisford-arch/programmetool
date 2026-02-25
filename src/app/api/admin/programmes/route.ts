import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const programmeSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2)
});

export async function POST(req: Request) {
  const payload = await req.json();
  const parsed = programmeSchema.safeParse(payload);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const order = await prisma.programme.count();
  const programme = await prisma.programme.create({
    data: {
      name: parsed.data.name,
      slug: parsed.data.slug,
      shortDesc: 'Short description pending',
      longDesc: '<p>Long description pending</p>',
      link: 'https://example.org',
      contactEmail: 'info@example.org',
      order: order + 1
    }
  });

  return NextResponse.json(programme);
}
