import Link from "next/link";
import { inter } from "@/app";
import "@/app/styles/globals.css";

// Unknown URLs outside a locale (served as 404.html). English, with a link home.
export default function GlobalNotFound() {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        <main className="mx-auto max-w-xl px-6 py-24">
          <p className="text-sm font-semibold">404</p>
          <h1 className="mt-3 text-4xl font-bold">Page not found</h1>
          <p className="mt-4 text-lg">
            <Link className="underline" href="/en/">
              English
            </Link>{" "}
            ·{" "}
            <Link className="underline" href="/fa/">
              فارسی
            </Link>
          </p>
        </main>
      </body>
    </html>
  );
}
