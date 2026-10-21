// The <html> element lives in app/[locale]/layout.tsx so it can carry lang and dir.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
