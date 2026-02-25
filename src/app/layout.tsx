import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Programme Eligibility Checker',
  description: 'Professional healthcare training programme eligibility tool'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
