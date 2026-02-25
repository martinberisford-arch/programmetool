'use client';

import { Programme, Question } from '@prisma/client';
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { evaluateLogic, LogicNode } from '@/lib/logic';

type AnswerMap = Record<string, string | string[]>;

export function CheckerFlow({ questions, programmes, preview }: { questions: Question[]; programmes: Programme[]; preview: boolean }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>(() => {
    if (typeof window === 'undefined') return {};
    const saved = localStorage.getItem('checker_answers');
    return saved ? (JSON.parse(saved) as AnswerMap) : {};
  });
  const router = useRouter();

  const current = questions[index];
  const progress = questions.length ? Math.round(((index + 1) / questions.length) * 100) : 0;

  if (!questions.length || !current) {
    return (
      <main className="mx-auto min-h-screen max-w-3xl p-6">
        <Card>
          <CardContent className="p-6">
            <h1 className="text-2xl font-semibold text-nhs-blue">Checker unavailable</h1>
            <p className="mt-2 text-sm text-slate-600">No active questions are configured yet. Please contact the administrator.</p>
          </CardContent>
        </Card>
      </main>
    );
  }

  const matched = useMemo(() => {
    return programmes.filter((programme) => {
      const logic = JSON.parse(programme.logicJson) as LogicNode;
      return evaluateLogic(logic, answers);
    });
  }, [programmes, answers]);

  function saveAnswer(questionId: string, value: string) {
    const next = { ...answers, [questionId]: value, [String(index + 1)]: value };
    setAnswers(next);
    localStorage.setItem('checker_answers', JSON.stringify(next));
  }

  async function finish() {
    localStorage.removeItem('checker_answers');
    const encoded = encodeURIComponent(JSON.stringify(matched.map((p) => ({ name: p.name, slug: p.slug, shortDesc: p.shortDesc, link: p.link }))));
    router.push(`/results?items=${encoded}`);
  }

  return (
    <main className="mx-auto min-h-screen max-w-3xl p-6">
      {preview ? <p className="mb-3 rounded-md bg-amber-100 p-2 text-sm">Preview Mode - You&apos;re viewing as a user would see it.</p> : null}
      <div className="mb-4 h-2 rounded-full bg-slate-200">
        <div className="h-2 rounded-full bg-nhs-blue transition-all" style={{ width: `${progress}%` }} />
      </div>
      <p className="mb-3 text-sm text-slate-500">Question {index + 1} of {questions.length}</p>
      <AnimatePresence mode="wait">
        <motion.div key={current.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}>
          <Card>
            <CardContent className="space-y-4 p-6">
              <h1 className="text-2xl font-semibold">{current.text}</h1>
              {current.helpText ? <p className="text-sm text-slate-500">{current.helpText}</p> : null}
              <div className="space-y-2">
                {(JSON.parse(current.optionsJson) as string[]).map((option) => (
                  <button
                    key={option}
                    className={`w-full rounded-md border p-3 text-left transition ${answers[current.id] === option ? 'border-nhs-blue bg-blue-50' : 'border-slate-200 bg-white hover:bg-slate-50'}`}
                    onClick={() => saveAnswer(current.id, option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setIndex((prev) => Math.max(0, prev - 1))} disabled={index === 0}>Back</Button>
                {index === questions.length - 1 ? (
                  <Button onClick={finish} disabled={!answers[current.id]}>See Results</Button>
                ) : (
                  <Button onClick={() => setIndex((prev) => prev + 1)} disabled={!answers[current.id]}>Next</Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
