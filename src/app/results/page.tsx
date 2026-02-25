import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type ResultItem = { name: string; slug: string; shortDesc: string; link: string };

export default function ResultsPage({ searchParams }: { searchParams: { items?: string } }) {
  const items = searchParams.items ? (JSON.parse(decodeURIComponent(searchParams.items)) as ResultItem[]) : [];

  return (
    <main className="mx-auto min-h-screen max-w-5xl p-6">
      <h1 className="mb-2 text-3xl font-bold text-nhs-blue">Your eligibility results</h1>
      <p className="mb-6 text-slate-600">Based on your answers, these programmes are most relevant.</p>
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <Card key={item.slug}>
            <CardContent className="space-y-3 p-5">
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p className="text-sm text-slate-600">{item.shortDesc}</p>
              <a href={item.link} target="_blank" className="inline-block text-sm font-medium text-nhs-blue underline">Learn more</a>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-6">
        <Link href="/checker"><Button>Start over</Button></Link>
      </div>
    </main>
  );
}
