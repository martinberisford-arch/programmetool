export const dynamic = 'force-dynamic';

import { QuestionManager } from '@/components/admin/question-manager';
import { prisma } from '@/lib/prisma';

export default async function QuestionsPage() {
  const questions = await prisma.question.findMany({ orderBy: { order: 'asc' } });
  return <QuestionManager initialQuestions={questions} />;
}
