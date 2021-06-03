export function getLocalScheduledTime(utcTime: string) {
  const utcHours = Number(utcTime.substring(0, 2));
  const utcMinutes = Number(utcTime.substring(3, 5));

  const now = new Date();
  const localDate = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDay(),
      utcHours,
      utcMinutes,
      0,
      0
    )
  );

  const localHours = localDate.getHours();
  const localMinutes = localDate.getMinutes();

  return `${
    (localHours < 10 ? "0" : "") +
    (localHours < 13 ? localHours : localHours - 12)
  }:${(localMinutes < 10 ? "0" : "") + localMinutes}${
    localHours < 12 ? "am" : "pm"
  }`;
}
