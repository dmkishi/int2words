/**
 * Chunk integer into groups of digits of given length starting from the least
 * significant digit and padded with zeroes if necessary.
 *
 * Chunk `54321` into 4 → `[["4", "3", "2", "1"], ["0", "0", "0", "5"]]`;
 */
export function toChunks<T extends string[]>(integer: number, targetLength: number): T[]{
  const chunks: T[] = [];
  const reversedDigits = String(integer).split('').reverse();
  for (let index = 0; ; index += targetLength) {
    const reversedChunk = reversedDigits.slice(index, index + targetLength);
    const chunk = reversedChunk.reverse();
    if (chunk.length === targetLength) {
      chunks.push(chunk as T);
    } else {
      if (chunk.length > 0) {
        const pad = Array<string>(targetLength - chunk.length).fill('0');
        const paddedChunk = [...pad, ...chunk];
        chunks.push(paddedChunk as T);
      }
      break;
    }
  }
  return chunks;
}
