'use client';

import { Question } from '@prisma/client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export function QuestionManager({ initialQuestions }: { initialQuestions: Question[] }) {
  const [questions, setQuestions] = useState(initialQuestions);
  const [text, setText] = useState('');

  async function addQuestion() {
    const response = await fetch('/api/admin/questions', {
      method: 'POST',
      body: JSON.stringify({ text, type: 'SINGLE', options: ['Yes', 'No'] })
    });
    if (!response.ok) return;
    setQuestions((prev) => [...prev, (await response.json()) as Question]);
    setText('');
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-nhs-blue">Question Management</h1>
      <Card>
        <CardHeader>
          <h2 className="font-semibold">Add Question</h2>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Question text" />
          <Button onClick={addQuestion} disabled={!text}>Add</Button>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="space-y-3 p-4">
          {questions.map((question) => (
            <div key={question.id} className="rounded-md border border-slate-200 p-3">
              <p className="font-medium">{question.text}</p>
              <p className="text-xs text-slate-500">Type: {question.type}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
