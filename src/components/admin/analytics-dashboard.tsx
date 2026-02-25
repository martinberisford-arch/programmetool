'use client';

import { CheckerSession, Programme, Question, Response } from '@prisma/client';
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

type ResponseWithQuestion = Response & { question: Question };

export function AnalyticsDashboard({
  sessions,
  responses,
  programmes
}: {
  sessions: CheckerSession[];
  responses: ResponseWithQuestion[];
  programmes: Programme[];
}) {
  const completionRate = sessions.length ? Math.round((sessions.filter((s) => s.completed).length / sessions.length) * 100) : 0;
  const usageByDay = sessions.reduce<Record<string, number>>((acc, session) => {
    const key = session.startedAt.toISOString().slice(0, 10);
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});

  const usageChart = Object.entries(usageByDay).map(([date, count]) => ({ date, count }));
  const questionChart = responses.slice(0, 10).map((entry) => ({
    question: entry.question.text.slice(0, 28),
    answers: 1
  }));

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-nhs-blue">Analytics</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <Metric title="Total sessions" value={String(sessions.length)} />
        <Metric title="Completion rate" value={`${completionRate}%`} />
        <Metric title="Programmes" value={String(programmes.length)} />
      </div>
      <Card>
        <CardHeader><h2 className="font-semibold">Usage over time</h2></CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={usageChart}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#005EB8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><h2 className="font-semibold">Question response samples</h2></CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={questionChart}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="question" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="answers" fill="#007f6d" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

function Metric({ title, value }: { title: string; value: string }) {
  return (
    <Card>
      <CardContent className="p-4">
        <p className="text-sm text-slate-500">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}
