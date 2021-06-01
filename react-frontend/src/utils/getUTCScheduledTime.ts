export function getUTCScheduledTime(time: string): string {
  const hours = Number(time.substring(0, 2));
  const minutes = Number(time.substring(3, 5));

  const now = new Date();
  const fullDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours,
    minutes,
    0,
    0
  );

  return `${
    (fullDate.getUTCHours() < 10 ? "0" : "") + fullDate.getUTCHours()
  }:${(fullDate.getUTCMinutes() < 10 ? "0" : "") + fullDate.getUTCMinutes()}`;
}
