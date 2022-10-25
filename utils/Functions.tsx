/**
 *
 * @param date
 * @returns
 */
export function formatedDate(date: string) {
  let data = date.split("-");
  let day = data[0];
  let month = data[1];
  let year = date.split("-")[2].split("T")[0];
  let formated_date = day + "/" + month + "/" + year;
  return formated_date;
}
