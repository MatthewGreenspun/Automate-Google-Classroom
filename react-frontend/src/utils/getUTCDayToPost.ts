import { nextDay } from "date-fns";
import { numberToStringWeekday } from "./numberToStringWeekday";
import { stringToNumberWeekday } from "./stringToNumberWeekday";

export function getUTCDayToPost(day: WeekDay, time: string) {
  const hours = Number(time.substring(0, 2));
  const minutes = Number(time.substring(3, 5));

  day = day.toLowerCase() as WeekDay;
  const numericDay = stringToNumberWeekday(day);
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
