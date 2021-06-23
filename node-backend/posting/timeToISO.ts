export function timeToISO(time: string): string {
  const hours = Number(time.substring(0, 2));
  const minutes = Number(time.substring(3, 5));

  const now = new Date();
  const fullDate = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      hours,
      minutes,
      0,
      0
    )
  );

  return fullDate.toISOString();
}
