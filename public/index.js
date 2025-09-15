function getLocation() {
  if (navigator.geolocation) {
    console.log("getting position")
    navigator.geolocation.getCurrentPosition(success, function(error){
        alert("Sorry, no position available.");
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

const serverURL = 'http://localhost:3000/'

async function getInfo(latitude, longitude) {
  const res = await fetch(serverURL + `info/weather?lat=${latitude}&long=${longitude}`, {
    method: 'GET'
  });
  console.log(res);
  const data = await res.json();
  console.log(data);
  const location = data.result.location.name;
  const temp_c = data.result.current.temp_c;
  const temp_f = data.result.current.temp_f;
  document.getElementById("location").innerHTML = `Weather at ${location} is:`;
  document.getElementById("degrees").innerHTML = `${temp_c} celcius ${temp_f} fahrenheiht`
}


function success(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  getInfo(position.coords.latitude, position.coords.longitude);
}
console.log("script running")
getLocation();