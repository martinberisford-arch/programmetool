import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center gap-8 p-6">
      <section className="max-w-2xl space-y-4 text-center">
        <h1 className="text-4xl font-bold text-nhs-blue">Healthcare Training Hub</h1>
        <p className="text-lg text-slate-600">Find programmes matched to your profile in about 2 minutes.</p>
        <div className="flex justify-center gap-3">
          <Link href="/checker">
            <Button>Start Checker <ArrowRight className="ml-2 h-4 w-4" /></Button>
          </Link>
          <Link href="/admin">
            <Button variant="outline">Admin Panel</Button>
          </Link>
        </div>
      </section>
      <Card className="w-full max-w-3xl">
        <CardContent className="grid gap-4 p-6 md:grid-cols-3">
          <div>
            <p className="text-sm font-semibold text-nhs-blue">Secure</p>
            <p className="text-sm text-slate-600">NextAuth-protected admin and server-side validation.</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-nhs-blue">Insightful</p>
            <p className="text-sm text-slate-600">Analytics dashboard with completion, match and usage trends.</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-nhs-blue">Maintainable</p>
            <p className="text-sm text-slate-600">Type-safe Prisma schema, seeding and deployment docs.</p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
