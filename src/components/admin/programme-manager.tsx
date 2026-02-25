'use client';

import { Programme } from '@prisma/client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { slugify } from '@/lib/utils';

export function ProgrammeManager({ initialProgrammes }: { initialProgrammes: Programme[] }) {
  const [programmes, setProgrammes] = useState(initialProgrammes);
  const [name, setName] = useState('');

  async function addProgramme() {
    const payload = { name, slug: slugify(name) };
    const response = await fetch('/api/admin/programmes', { method: 'POST', body: JSON.stringify(payload) });
    if (!response.ok) return;
    const created = (await response.json()) as Programme;
    setProgrammes((prev) => [...prev, created]);
    setName('');
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-nhs-blue">Programme Management</h1>
      <Card>
        <CardHeader>
          <h2 className="font-semibold">Add Programme</h2>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Input placeholder="Programme name" value={name} onChange={(e) => setName(e.target.value)} />
          <Button onClick={addProgramme} disabled={!name}>Add</Button>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="space-y-3 p-4">
          {programmes.map((programme) => (
            <div key={programme.id} className="flex items-center justify-between rounded-md border border-slate-200 p-3 text-sm">
              <div>
                <p className="font-medium">{programme.name}</p>
                <p className="text-slate-500">{programme.slug}</p>
              </div>
              <span className="rounded-full bg-slate-100 px-2 py-1 text-xs">{programme.status}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
