export function formatPostDate(date?: Date): string {
  if (!date) return "No date";
  const offset = date.getTimezoneOffset();
  date = new Date(date.getTime() - offset * 60 * 1000);
  const mm /* 2 digits */ = `0${date.getMonth() + 1}`.slice(-2);
  const dd /* 2 digits */ = `0${date.getDate()}`.slice(-2);
  return `${mm}-${dd}`;
}
