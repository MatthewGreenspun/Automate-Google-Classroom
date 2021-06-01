import { stringToNumberWeekday } from "./stringToNumberWeekday";
import { numberToStringWeekday } from "./numberToStringWeekday";
import { longDayName } from "./longDayName";
import { nextDay } from "date-fns";

export function getLocalDayToPost(utcDay: WeekDay, utcTime: string) {
  const hours = utcTime.substring(0, 2);
  const minutes = utcTime.substring(3, 5);

  const numericDay = stringToNumberWeekday(utcDay);
  const nextDayDate = nextDay(new Date(), numericDay);
  const utcDateString = `${utcDay} ${
    nextDayDate.getMonth() + 1
  } ${nextDayDate.getDate()} ${nextDayDate.getFullYear()} ${hours}:${minutes}:00 GMT`;

  const now = new Date(utcDateString);
  return longDayName(numberToStringWeekday(now.getDay()));
}
