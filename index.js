const Index = () => {
  const today = new Date();
  const date = today.getDate();
  let mon = today.getMonth();
  const yr = today.getFullYear();
  switch (mon) {
    case 0:
      mon = "Jan";
      break;
    case 1:
      mon = "Feb";
      break;
    case 2:
      mon = "Mar";
      break;
    case 3:
      mon = "Apr";
      break;
    case 4:
      mon = "May";
      break;
    case 5:
      mon = "June";
      break;
    case 6:
      mon = "July";
      break;
    case 7:
      mon = "Aug";
      break;
    case 8:
      mon = "Sep";
      break;
    case 9:
      mon = "Oct";
      break;
    case 10:
      mon = "Nov";
      break;
    case 11:
      mon = "Dec";
      break;
    default:
      break;
  }

  const changelocation = () => {
    document.querySelector(".editlocation").classList.add("hide");
  };

  const submitlocation = () => {
    document.querySelector(".editlocation").classList.remove("hide");
    document.querySelector(".right").classList.add("show");
    const name = document.querySelector("input").value;
    document.querySelector("input").value = "";

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=cd8ba3aac0daee3d19f3b1549a2c32e4`
    )
      .then((res) => res.json())
      .then((data) => {
        document.querySelector(".cityname").innerHTML = data.name;
        document.querySelector(".climate").innerHTML =
          data.weather[0].description;
        document.querySelector(".temp").innerHTML = `${(
          data.main.temp / 10
        ).toFixed(2)}&#176C`;
        const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        document.querySelector(
          ".icon"
        ).innerHTML = ` <img class="city-icon" src=${icon} alt=${data.weather[0].icon}>`;
        document.querySelector(
          ".wind"
        ).innerHTML = `<h2>Wind Speed</h2><h3>${data.wind.speed} km/h</h3>`;
        document.querySelector(
          ".humidity"
        ).innerHTML = `<h2>Humidity</h2><h3>${data.main.humidity} %</h3>`;
        document.querySelector(
          ".pressure"
        ).innerHTML = `<h2>Air Pressure </h2><h3>${data.main.pressure} PS</h3>`;
        document.querySelector(
          ".long"
        ).innerHTML = `<h3>Long: ${data.coord.lon.toFixed(2)}</h3>`;
        document.querySelector(
          ".lat"
        ).innerHTML = `<h3>Lat: ${data.coord.lat.toFixed(2)}</h3>`;
        let sunrise1 = data.sys.sunrise;
        let day1 = new Date(sunrise1 * 1000);
        let sunrise =
          day1.getHours() > 12 ? day1.getHours() - 12 : day1.getHours();
        document.querySelector(
          ".sunrise"
        ).innerHTML = `<h3>Sun Rise ${sunrise} : ${day1.getMinutes()}
        </h3>`;
        let sunset1 = data.sys.sunset;
        let day = new Date(sunset1 * 1000);
        let sunset = day.getHours() > 12 ? day.getHours() - 12 : day.getHours();
        document.querySelector(
          ".sunset"
        ).innerHTML = `<h3>Sun Set ${sunset} : ${day.getMinutes()}
        </h3>`;
        document.querySelector(".date").innerHTML = mon + " " + date + " " + yr;
        console.log(data);
        if (data.weather[0].description === "haze") {
          document.querySelector("body").classList.add("haze");
          document.querySelector("body").classList.remove("clear");
          document.querySelector("body").classList.remove("cloudy");
        }
        if (data.weather[0].description === "clear sky") {
          document.querySelector("body").classList.remove("haze");
          document.querySelector("body").classList.add("clear");
          document.querySelector("body").classList.remove("cloudy");
        }
        if (data.weather[0].main === "Clouds") {
          document.querySelector("body").classList.remove("haze");
          document.querySelector("body").classList.add("cloudy");
          document.querySelector("body").classList.remove("clear");
        }
      });
  };
  return (
    <div class="container">
      <div class="left">
        <i class="icon"></i>
        <h2 class="climate"></h2>
        <h2 class="cityname"></h2>
        <h2 class="temp">
          <span class="temp"></span>
        </h2>
        <span class="changelocation" onClick={changelocation}>
          <i class="fas fa-map-marker-alt"></i>
          <span> Changelocation</span>
        </span>
      </div>
      <div class="right">
        <p class="humidity"></p>
        <p class="pressure"></p>
        <p class="wind"></p>
      </div>
      <div class="lonlat">
        <h2 class="long"></h2>
        <h2 class="lat"></h2>
      </div>
      <div class="sun">
        <h2 class="sunrise"></h2>
        <h2 class="sunset"></h2>
      </div>
      <h2 class="date"></h2>
      <div class="editlocation">
        <input type="text" placeholder="Enter city" />
        <button onClick={submitlocation}>submit</button>
      </div>
    </div>
  );
};

const domContainer = document.querySelector("#root");
ReactDOM.render(<Index />, domContainer);
