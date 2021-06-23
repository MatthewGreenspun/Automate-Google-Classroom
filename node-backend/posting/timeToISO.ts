export function timeToISO(time: string): string {
  const hours = Number(time.substring(0, 2));
  const minutes = Number(time.substring(3, 5));

  const now = new Date();
  const fullDate = new Date(
    Date.UTC(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      hours,
      minutes,
      0,
      0
    )
  );
  console.log(fullDate.toISOString());
  return fullDate.toISOString();
}
