let fetchBtn = document.getElementById("fetch-btn");
let map = document.querySelector(".map");
const weatherDataSheet = document.querySelector(".weatherData");

// console.log(weatherDataSheet);
map.style.display = "none";

// console.log(map)
// console.log(fetchBtn);
// -----------------------------------------------------------------------------------------------
// Fetching the data through API
/*


//example (format) of making call through api

https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

*/
let long;
let lat;
const API_Key = "817be66d01179f3bb7beacc17d6bad60";
async function weatherData() {
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_Key}`;
  let response = await fetch(url);
  let data = await response.json();
  // console.log(data.);

  // extracting data from server response data object
  let location = data.name + ", " + data.sys.country;
  let latitude = data.coord.lat;
  let longitude = data.coord.lon;
  let timezone = data.timezone / 60 / 60 + " HRS from UTC";
  let speed = ((data.wind.speed * 18) / 5).toFixed(2) + "  KM/HRS";
  let pressure = ((data.main.pressure * 100) / 1000).toFixed(3) + " KPa";
  let humidity = data.main.humidity + "%";
  let gust = data.wind.gust + " m/sec";
  let feels_like = (data.main.feels_like - 273).toFixed(3) + " Celcius";
  weatherDataSheet.innerHTML = ``;
  weatherDataSheet.innerHTML += `<div class="boxLeft">

  <li>Location: ${location}</li>
  <li >Latitude:${latitude}</li>
  <li >Longitude:${longitude}</li>
  <li>TimeZone: ${timezone}</li>
  <li>Wind Speed:${speed}</li>
</div>
<div class="boxRight">

 <li>Pressure:${pressure}</li>
<li>Humidity: ${humidity}</li>
<li>Wind  Gust :${gust}</li>
<li>Feel Like: ${feels_like}</li>
 </div>`;

  // data=
  /* 
  {
  "coord": {
    "lon": 78.1388,
    "lat": 29.369
  },
  "weather": [
    {
      "id": 800,
      "main": "Clear",
      "description": "clear sky",
      "icon": "01d"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 305.01,
    "feels_like": 303.92,
    "temp_min": 305.01,
    "temp_max": 305.01,
    "pressure": 1008,
    "humidity": 31,
    "sea_level": 1008,
    "grnd_level": 982
  },
  "visibility": 10000,
  "wind": {
    "speed": 2.53,
    "deg": 172,
    "gust": 1.72
  },
  "clouds": {
    "all": 0
  },
  "dt": 1683189857,
  "sys": {
    "country": "IN",
    "sunrise": 1683158611,
    "sunset": 1683206696
  },
  "timezone": 19800,
  "id": 1275679,
  "name": "Bijnor",
  "cod": 200
}
*/
}

function CatchLocation(position) {
  lat = position.coords.latitude;
  long = position.coords.longitude;
  //   console.log("Lat :" + lat);
  //   console.log("Long:" + long);
  document.getElementById("lat").innerText = `Lat: ${lat}`;
  document.getElementById("long").innerText = `Long: ${long}`;

  let mapbox = document.querySelector(".map");
  let iframeEle = document.createElement("iframe");

  let mapUrl = `https://maps.google.com/maps?q=${lat},${long}&z=15&output=embed`;

  iframeEle.setAttribute("src", mapUrl);

  iframeEle.setAttribute("scrolling", "no");
  // console.log(iframeEle);

  mapbox.appendChild(iframeEle);
  weatherData();
}
// finding the Latitude and longitude here
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(CatchLocation);
  } else {
    console.log("not pointing any location");
    return;
  }
}
function FetchDataBtn() {
  // console.log(event);
  fetchBtn.style.display = "none";
  map.style.display = "flex";

  //call for finding the lat and long here
  getLocation();
}
// --------------------------------------------------------------------------------------------------
