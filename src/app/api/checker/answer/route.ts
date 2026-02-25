import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const schema = z.object({
  sessionId: z.string().min(1),
  questionId: z.string().min(1),
  answer: z.union([z.string(), z.array(z.string())])
});

export async function POST(req: Request) {
  const payload = await req.json();
  const parsed = schema.safeParse(payload);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  await prisma.response.create({
    data: {
      sessionId: parsed.data.sessionId,
      questionId: parsed.data.questionId,
      answerJson: JSON.stringify(parsed.data.answer)
    }
  });

  return NextResponse.json({ ok: true });
}
