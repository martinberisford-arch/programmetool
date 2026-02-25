'use client';

import { Setting } from '@prisma/client';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export function SettingsPanel({ initialSettings }: { initialSettings: Setting[] }) {
  const mapped = useMemo(() => Object.fromEntries(initialSettings.map((item) => [item.key, item.value])), [initialSettings]);
  const [title, setTitle] = useState(mapped.tool_title ?? 'Programme Eligibility Checker');
  const [primaryColor, setPrimaryColor] = useState(mapped.primary_color ?? '#005EB8');

  async function saveSettings() {
    await fetch('/api/admin/settings', {
      method: 'POST',
      body: JSON.stringify({ tool_title: title, primary_color: primaryColor })
    });
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-nhs-blue">Settings</h1>
      <Card>
        <CardHeader><h2 className="font-semibold">Branding</h2></CardHeader>
        <CardContent className="space-y-3">
          <div>
            <label className="mb-1 block text-sm">Tool title</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-sm">Primary color</label>
            <Input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="h-10 w-28" />
          </div>
          <Button onClick={saveSettings}>Save settings</Button>
        </CardContent>
      </Card>
    </div>
  );
}
