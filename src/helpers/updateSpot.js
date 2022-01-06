export default function updateSpot(dayString, daysArray, value) {
  return daysArray.map((day) => {
    if (dayString === day.name) {
      day.spots += value;
    }
    return day;
  });
}
