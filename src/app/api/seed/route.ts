import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({ message: 'Use `npm run db:seed` from server runtime for controlled seeding.' });
}
