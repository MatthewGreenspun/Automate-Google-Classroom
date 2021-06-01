export function stringToNumberWeekday(day: string) {
  day = day.toLowerCase();
  if (day === "sun") return 0;
  else if (day === "mon") return 1;
  else if (day === "tue") return 2;
  else if (day === "wed") return 3;
  else if (day === "thu") return 4;
  else if (day === "fri") return 5;
  return 6;
}
