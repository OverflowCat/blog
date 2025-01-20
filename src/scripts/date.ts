export function formatPostDate(date?: Date): string {
  if (!date) return "No date";
  const mm = date.getUTCMonth() + 1;
  const dd = date.getUTCDate();
  return `${mm}&thinsp;月&thinsp;${dd}&thinsp;日&thinsp;`;
}
