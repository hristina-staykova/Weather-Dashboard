$(document).ready(function() {
  var cityName = $("#cityName");
  var searchButton = $("#searchbtn");
  var toDay = moment().format("DD/M/YYYY");

  searchButton.on("click", function(event) {
    cityName = cityName.val();
    $("#cityNameEl").text(cityName + " " + toDay);
    var queryURL =
      "http://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&units=metric&APPID=66b38c70f7e47f3330c092ef356a429f";
    $.ajax({ url: queryURL, method: "GET" }).then(function getData(response) {
      console.log(response);
      var cityTemperature = response.main.temp;
      var cityHumidity = response.main.humidity;
      var cityWindSpeed = response.wind.speed;
      var cityLat = response.coord.lat;
      var cityLon = response.coord.lon;

      $("#temperature").text("Temperature: " + cityTemperature) + " C";
      $("#humidity").text("Humidity: " + cityHumidity + "%");
      $("#speed").text("Wind Speed: " + cityWindSpeed + "km/h");
      $("#uv").text("UN Index: ");
    });
  });
});
