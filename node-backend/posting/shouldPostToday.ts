export function shouldPostToday(postingDays: string[]) {
  const today = new Date().toUTCString().substring(0, 3).toLowerCase();
  return postingDays.includes(today);
}
