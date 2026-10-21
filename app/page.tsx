import { redirect } from "next/navigation";
import { routing } from "@/shared/i18n";

// Static export has no middleware: `/` is a prerendered redirect to the default locale.
export default function RootPage() {
  redirect(`/${routing.defaultLocale}/`);
}
