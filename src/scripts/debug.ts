// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function timeIt<T extends (...args: any[]) => Promise<any>>(fn: T, msg: any = "TimeIt:"): Promise<ReturnType<T>> {
  console.debug(msg, "Starting...");
  const start = performance.now();
  try {
    const res = await fn();
    const end = performance.now();
    console.log(msg, `Time: ${(end - start).toFixed(1)}ms`);
    return res;
  } catch (error) {
    const end = performance.now();
    console.log(msg, `Time: ${end - start}ms`);
    console.error('Error:', error);
    throw error;
  }
}