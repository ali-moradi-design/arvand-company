// Runs a built standalone server like production (`pnpm build` first).
// Usage: node scripts/serve.mjs [port] [folder]
//   folder defaults to .next/standalone; out-form is the form fixture build.
import { spawn } from "node:child_process";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const port = process.argv[2] ?? "3100";
const folder = resolve(root, process.argv[3] ?? ".next/standalone");
const child = spawn(process.execPath, [resolve(folder, "server.js")], {
  env: {
    ...process.env,
    PORT: port,
    HOSTNAME: "127.0.0.1",
    NODE_ENV: "production",
  },
  stdio: ["ignore", "inherit", "inherit"],
});
console.log(`standalone server on http://127.0.0.1:${port}`);
for (const signal of ["SIGINT", "SIGTERM"]) process.on(signal, () => child.kill(signal));
child.on("exit", (code) => process.exit(code ?? 0));
