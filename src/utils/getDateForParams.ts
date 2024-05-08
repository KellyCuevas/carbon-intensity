//function that takes a date object and returns a string in the format needed for the API (YYYY-MM-DDTHH:MMZ)

export default function getDateForParams(date: Date) {
  let dateISO = date.toISOString();
  dateISO = `${dateISO.slice(0, 11)}${dateISO.slice(11, 16)}Z`;

  return dateISO;
}
