// Builds a second copy of the site into out-form/ with a form endpoint
// configured, so the Playwright suite can test the real submit path against a
// mocked endpoint. The endpoint is inlined at build time, so it needs its own build.
import { spawnSync } from "node:child_process";
import { rmSync, renameSync } from "node:fs";

const run = (command, args, env = {}) => {
  const result = spawnSync(command, args, {
    stdio: "inherit",
    env: { ...process.env, ...env },
  });
  if (result.status !== 0) process.exit(result.status ?? 1);
};

rmSync(".next", { recursive: true, force: true });
rmSync("out-form", { recursive: true, force: true });
run("pnpm", ["exec", "next", "build"], {
  NEXT_PUBLIC_FORM_ENDPOINT: "https://forms.example.test/api/forms/contact/responses",
  NEXT_PUBLIC_FORM_TIMEOUT_MS: "1500",
});
renameSync("out", "out-form");
// Leave no stale build cache behind: the normal build must not reuse these values.
rmSync(".next", { recursive: true, force: true });
