$(document).ready(function() {
  $("#div2").hide();
  $("#div1").on("click",function() {
    $("#div1, #div2").toggle();
  });

function success(pos) {

var long = pos.coords.longitude;
var lat = pos.coords.latitude;

var api="http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&appid=77753c2d407fa67bfab85c37c1e79464";

  $.get(api, function(data) {
    var windSpeed = data.wind.speed;
    var kelvin = data.main.temp;
    var fahrenheit = ((kelvin)*(9/5)-459.67).toFixed(1);
    var celcius = (kelvin -273).toFixed(1);
    var tempSwitch = false;


    $("#city").html(data.name);
    $("#weatherType").html(data.weather[0].description);
    $("#fahrenheit").html(fahrenheit + " &#8457");
    $("#fahrenheit").click(function() {
      if(tempSwitch === false) {
        $("#fahrenheit").html(celcius + " &#8451");
        tempSwitch = true;
      }
      else {
        $("#fahrenheit").html(fahrenheit + " &#8457");
        tempSwitch = false;
      }
    });

    //convert windSpeed from knots to MPH
    windSpeed = (2.237*(windSpeed)).toFixed(1);
    $("#windSpeed").html(windSpeed) + " MPH";

    if(fahrenheit > 80) {
      $("body").css("background-image", "url('http://anyhdwallpaper.com/wp-content/uploads/2016/05/Suuny-Day-of-Summer-Beach-HD-Wallpaper-624x351.jpg')")
    }
    else if(fahrenheit > 60) {
      $("body").css("background-image", "url('https://upload.wikimedia.org/wikipedia/commons/d/d0/Beautiful_autumn_day.jpg')");
    }
    else if(fahrenheit > 40) {
      $("body").css("background-image", "url('http://static-37.sinclairstoryline.com/resources/media/df07b90f-1a37-4031-a0fa-769cf0a377e0-large16x9_sigma_clouds.jpg?1479711606477')")
    }
    else {
      $("body").css("background-image", "url('https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/The_Jachen_stream_on_a_sunny_winter_day_(Bavaria,_Germany).JPG/1280px-The_Jachen_stream_on_a_sunny_winter_day_(Bavaria,_Germany).JPG')");
    }
  });
};

function error(err) {
  alert("Geolocation is not enabled. Please enable to use this feature.");
      $("#div2").hide();
      $("#div1, div2").toggle();
  console.warn('ERROR(' + err.code + '): ' + err.message);
};

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};



  $("#div1").on("click", function() {
  if (navigator.geolocation)navigator.geolocation.getCurrentPosition(success, error, options);
 });
});
