$(document).ready(function() {
  var cityName = $("#cityName");
  var searchButton = $("#searchbtn");

  searchButton.on("click", function(event) {
    cityName = $("#cityName").val();
    var queryURL =
      "http://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&APPID=66b38c70f7e47f3330c092ef356a429f";
    console.log(cityName);
    $.ajax({ url: queryURL, method: "GET" }).then(function getData(response) {
      console.log(response);
    });
  });
});
