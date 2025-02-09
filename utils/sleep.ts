export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
export function randomDelay(): Promise<void> {
  const ms = Math.floor(Math.random() * 16 + 1) * 1000;
  return new Promise(resolve => setTimeout(resolve, ms));
}
