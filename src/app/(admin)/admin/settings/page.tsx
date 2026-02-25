import { SettingsPanel } from '@/components/admin/settings-panel';
import { prisma } from '@/lib/prisma';

export default async function SettingsPage() {
  const settings = await prisma.setting.findMany();
  return <SettingsPanel initialSettings={settings} />;
}
