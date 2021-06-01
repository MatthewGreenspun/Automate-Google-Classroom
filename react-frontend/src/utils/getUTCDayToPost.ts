import { nextDay } from "date-fns";
import { numberToStringWeekday } from "./numberToStringWeekday";

export function getUTCDayToPost(day: WeekDay, time: string) {
  const hours = Number(time.substring(0, 2));
  const minutes = Number(time.substring(3, 5));

  day = day.toLowerCase() as WeekDay;
  let numericDay = 0;

  if (day === "mon") numericDay = 1;
  else if (day === "tue") numericDay = 2;
  else if (day === "wed") numericDay = 3;
  else if (day === "thu") numericDay = 4;
  else if (day === "fri") numericDay = 5;
  else if (day === "sat") numericDay = 6;

  const nextDate = nextDay(new Date(), numericDay as Day);

  const fullDate = new Date(
    nextDate.getFullYear(),
    nextDate.getMonth(),
    nextDate.getDate(),
    hours,
    minutes,
    0,
    0
  );

  return numberToStringWeekday(fullDate.getUTCDay());
}
