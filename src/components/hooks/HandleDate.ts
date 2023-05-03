import { month } from "../helpers/constants";

export default function HandleDate(date: Date) {
  const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  return `${month[date.getMonth()]} ${date.getDate()}, ${hours}:${minutes}`;
}
