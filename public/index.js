function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, function(error){
        alert("Sorry, no position available.");
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

const serverURL = 'http://localhost:3000/'

async function getInfo(latitude, longitude) {
  const resf = await fetch(serverURL + `info/weather?lat=${latitude}&long=${longitude}`, {
    method: 'GET'
  });
  const dataf = await resf.json();
  updateForecast(dataf);
}

function updateForecast(data){
  document.getElementById("day0temp").innerHTML = `Max Temp: ${data.result.forecast.forecastday[0].day.maxtemp_f}F Min Temp: ${data.result.forecast.forecastday[0].day.mintemp_f}F`;
  document.getElementById("day0h").innerHTML = `Average Humididty: ${data.result.forecast.forecastday[0].day.avghumidity}%`;
  document.getElementById("day0w").innerHTML = `Max Wind: ${data.result.forecast.forecastday[0].day.maxwind_mph}mph`;
  document.getElementById("day0UV").innerHTML = `UV index: ${data.result.forecast.forecastday[0].day.uv}`;
  document.getElementById("day0img").src = data.result.forecast.forecastday[0].day.condition.icon;
  document.getElementById("day1temp").innerHTML = `Max Temp: ${data.result.forecast.forecastday[1].day.maxtemp_f}F Min Temp: ${data.result.forecast.forecastday[1].day.mintemp_f}F`;
  document.getElementById("day1h").innerHTML = `Average Humididty: ${data.result.forecast.forecastday[1].day.avghumidity}%`;
  document.getElementById("day1w").innerHTML = `Max Wind: ${data.result.forecast.forecastday[1].day.maxwind_mph}mph`;
  document.getElementById("day1UV").innerHTML = `UV index: ${data.result.forecast.forecastday[1].day.uv}`;
  document.getElementById("day1img").src = data.result.forecast.forecastday[1].day.condition.icon;
  document.getElementById("day2temp").innerHTML = `Max Temp: ${data.result.forecast.forecastday[2].day.maxtemp_f}F Min Temp: ${data.result.forecast.forecastday[1].day.mintemp_f}F`;
  document.getElementById("day2h").innerHTML = `Average Humididty: ${data.result.forecast.forecastday[2].day.avghumidity}%`;
  document.getElementById("day2w").innerHTML = `Max Wind: ${data.result.forecast.forecastday[2].day.maxwind_mph}mph`;
  document.getElementById("day2UV").innerHTML = `UV index: ${data.result.forecast.forecastday[2].day.uv}`;
  document.getElementById("day2img").src = data.result.forecast.forecastday[2].day.condition.icon;
  document.getElementById("location").innerHTML = `Weather Forecast at ${data.result.location.name}`;
  document.querySelector(".forecast").classList.remove("hidden");
  document.querySelector(".forecast").classList.add("show");

}

const cards = document.querySelectorAll(".day-card");

cards.forEach(card => {
    card.addEventListener("click", () => {
        const isOpen = card.getAttribute("data-expanded") === "true";
        card.setAttribute("data-expanded", !isOpen);
    });
});


function success(position) {
  getInfo(position.coords.latitude, position.coords.longitude);
}
getLocation();