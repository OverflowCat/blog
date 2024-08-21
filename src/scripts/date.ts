export function formatPostDate(date?: Date): string {
  if (!date) return "No date";
  const offset = date.getTimezoneOffset();
  const res = new Date(date.getTime() - offset * 60 * 1000);
  // mm-dd
  return `${res.getMonth() + 1}-${res.getDate()}`;
}
