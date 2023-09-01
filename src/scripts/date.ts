export function formatPostDate(date?: Date): string {
  if (!date) return "No date";
  const offset = date.getTimezoneOffset();
  date = new Date(date.getTime() - offset * 60 * 1000);
  // mm-dd
  return `${date.getMonth() + 1}-${date.getDate()}`;
}
