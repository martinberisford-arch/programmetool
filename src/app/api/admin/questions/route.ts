import { NextResponse } from 'next/server';
import { QuestionType } from '@prisma/client';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const questionSchema = z.object({
  text: z.string().min(5),
  type: z.nativeEnum(QuestionType),
  options: z.array(z.string()).min(1)
});

export async function POST(req: Request) {
  const payload = await req.json();
  const parsed = questionSchema.safeParse(payload);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const order = await prisma.question.count();
  const question = await prisma.question.create({
    data: {
      text: parsed.data.text,
      type: parsed.data.type,
      optionsJson: JSON.stringify(parsed.data.options),
      order: order + 1
    }
  });

  return NextResponse.json(question);
}
