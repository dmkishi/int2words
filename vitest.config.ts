import { readdirSync } from 'fs';
import { defineConfig } from 'vitest/config';

/**
 * @returns Formatted date-time, e.g. `2022-12-31T23:59:59`.
 */
function formatDate(date = new Date()): string {
  const pad = (num: number) => String(num).padStart(2, '0');
  const YYYY = date.getFullYear();
  const MM = pad(date.getMonth() + 1);
  const DD = pad(date.getDate());
  const hh = pad(date.getHours());
  const mm = pad(date.getMinutes());
  const ss = pad(date.getSeconds());
  return `${YYYY}-${MM}-${DD}T${hh}:${mm}:${ss}`;
};

function previousBenchmark(): string {
  const files = readdirSync('benchmarks/results');
  const previousBenchmark = files.sort().pop() ?? '';
  if (previousBenchmark) console.log(`Compared to: ${previousBenchmark}`);
  return previousBenchmark;
}

export default defineConfig({
  test: {
    benchmark: {
      outputJson: `benchmarks/results/bench-${formatDate()}.json`,
      compare: `benchmarks/results/${previousBenchmark()}`,
    },
  },
});
