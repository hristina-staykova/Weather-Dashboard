$(document).ready(function() {
  var cityName = $("#cityName");
  var searchButton = $("#searchbtn");
  var toDay = moment().format("DD/M/YYYY");

  function indexUVcolor(a) {
    if (0.0 <= a && a <= 2.99) {
      $("#uv").addClass("green");
    }

    if (3.0 <= a && a <= 5.99) {
      $("#uv").addClass("yellow");
    }

    if (6.0 <= a && a <= 7.99) {
      $("#uv").addClass("orange");
    }

    if (8.0 <= a && a <= 10.99) {
      $("#uv").addClass("red");
    }

    if (11 <= a) {
      $("#uv").addClass("purple");
    }
  }

  function getDailyData() {
    $("#cityNameEl").text(cityName + " " + toDay);
    var queryURLday =
      "http://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&units=metric&APPID=66b38c70f7e47f3330c092ef356a429f";

    var queryURLfiveDay =
      "http://api.openweathermap.org/data/2.5/forecast?q=" +
      cityName +
      "&units=metric&APPID=66b38c70f7e47f3330c092ef356a429f";

    //calling the current weather forecast information
    $.ajax({ url: queryURLday, method: "GET" }).then(function getData(
      response
    ) {
      var cityTemperature = response.main.temp.toFixed();
      var cityHumidity = response.main.humidity;
      var cityWindSpeed = response.wind.speed;
      var cityLat = response.coord.lat;
      var cityLon = response.coord.lon;

      //getting the UV index & display
      var queryUVurl =
        "http://api.openweathermap.org/data/2.5/uvi?appid=66b38c70f7e47f3330c092ef356a429f&lat=" +
        cityLat +
        "&lon=" +
        cityLon;
      $.ajax({ url: queryUVurl, method: "GET" }).then(function(response) {
        $("#uv").text("UV Index: " + response.value);
        indexUVcolor(response.value);
      });

      $("#temperature").text("Temperature: " + cityTemperature + " C");
      $("#humidity").text("Humidity: " + cityHumidity + "%");
      $("#speed").text("Wind Speed: " + cityWindSpeed + " MPH");

      //getting the icon and displaying it
      var imageLink =
        "http://openweathermap.org/img/wn/" +
        response.weather[0].icon +
        "@2x.png";
      $("#currentImage").attr("src", imageLink);
      $("#currentImage").attr("alt", response.weather[0].main);
    });
  }

  searchButton.on("click", function(event) {
    event.preventDefault();
    cityName = cityName.val();
    getDailyData();
  });
});

// calling 5 day forecast information
// $.ajax({ url: queryURLfiveDay, method: "GET" }).then(function getFiveDayData(
//   response
// ) {
//   console.log(response);
// });
