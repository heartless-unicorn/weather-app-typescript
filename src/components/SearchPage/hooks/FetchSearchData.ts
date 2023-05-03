import axios from "axios";
import { API_ID_KEY } from "../../helpers/constants";

// export default async function FetchSearchData(props: String) {
//   const url = `https://api.openweathermap.org/data/2.5/weather?q=${props}&appid=${API_ID_KEY}&units=metric`;
//   let weatherDescriber;
//   await axios.get(url).then((res) => {
//     weatherDescriber = {
//       name: res.data.name,
//       country: res.data.sys.country,
//       icon_id: res.data.weather[0].icon,
//       temp: Math.round(res.data.main.temp),
//       description: res.data.weather[0].description,
//       date: new Date(),
//     };
//   });
//   return weatherDescriber;
// }
