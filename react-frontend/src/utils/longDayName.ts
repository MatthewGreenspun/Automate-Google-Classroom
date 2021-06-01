export function longDayName(day: WeekDay) {
  day = day.toLowerCase() as WeekDay;
  if (day === "sun") return "Sunday";
  else if (day === "mon") return "Monday";
  else if (day === "tue") return "Tuesday";
  else if (day === "wed") return "Wednesday";
  else if (day === "thu") return "Thursday";
  else if (day === "fri") return "Friday";
  return "Saturday";
}
