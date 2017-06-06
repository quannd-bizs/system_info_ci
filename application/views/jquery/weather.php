
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" ng-app="weatherApp" id="weatherHTML">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<title>Weather App</title>

<script type="text/javascript" src="/js/jquery/1.7.2/jquery.min.js"></script>
<script src="https://maps.googleapis.com/maps/api/js?sensor=false"></script>
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script>

<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css">
	
<style>
  @import 'https://fonts.googleapis.com/css?family=Lato|Open+Sans:300,400';
</style>

<script type="text/javascript">
	var zip;
	var latitude = '';
	var longitude = '';
	var forecast;
	var search = 0;
	var sun = 'https://s3.postimg.org/7mxv89h8z/sun.png';
	var partly_cloudy = 'https://s3.postimg.org/extdkdxn7/cloud_1.png';
	var cloudy = 'https://s3.postimg.org/77mlf8vbn/cloudy.png';
	var rain = 'https://s3.postimg.org/3paliuufn/rain.png';
	var snow = 'https://s19.postimg.org/7lm2essqr/hail.png';
	var sleet = 'https://s19.postimg.org/hf7v5ck8z/cloud_with_sleet.png';
	var fog = 'https://s19.postimg.org/ltbr3g5fn/mist.png';
	var wind = 'https://s19.postimg.org/whfi2afer/wind_1.png';
	var weatherApp = angular.module('weatherApp', []);
	
	function animations() {
	  $('.results').fadeIn('slow');
	  $('html, body').animate({
		scrollTop: $('.location').offset().top
	  }, 500);
	}

	weatherApp.controller('WeatherCtrl', function WeatherCtrl($scope, $timeout, $http) {
	
		$scope.getLocation = function(zip) {
		  $('.results').fadeOut('fast');
		  var geocoder = new google.maps.Geocoder();
		  var zip = String(zip);
		  geocoder.geocode({
			'address': zip
		  }, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
			  latitude = results[0].geometry.location.lat();
			  longitude = results[0].geometry.location.lng();
			  getWeather(latitude, longitude);
			  getReverseGeocodingData(latitude, longitude);
			} else {
			  $('.error').show();
			}
		  });
		}
		
		$scope.getWeather = function(lat, lng) {
		  $.ajax({
			url: 'https://api.forecast.io/forecast/4ab9b71133842f6efb048f64970703dc/' + latitude + ',' + longitude,
			type: 'GET',
			dataType: 'jsonp',
			headers: {
			  "Content-type": "application/json"
			},
			data: {},
			success: function(data) {
			  console.log(data);
			  $('.error').hide();
			  search = 1;
			  forecast = data;
			  animations();
			  $scope.loadWeather();
			}
		  });
		}
		
		$scope.getReverseGeocodingData = function(lat, lng) {
		  var latlng = new google.maps.LatLng(lat, lng);
		  var geocoder = new google.maps.Geocoder();
		  geocoder.geocode({
			'latLng': latlng
		  }, function(results, status) {
			if (status !== google.maps.GeocoderStatus.OK) {
			  alert(status);
			}
			if (status == google.maps.GeocoderStatus.OK) {
			  var address;
			  var arr = results[1].address_components;
			  var length = arr.length;
			  console.log(length);
			  for (i = 0; i < length; i++) {
				if (arr[i].types[0] == 'locality') {
				  var address1 = (arr[i].long_name);
				}
				if (arr[i].types[0] == 'administrative_area_level_1') {
				  var address2 = (arr[i].short_name);
				}
				if (address1 && address2) {
				  address = address1 + ', ' + address2;
				}
			  }
			  $('.location').html(address);
			}
		  });
		}
		
		$scope.loadWeather = function() {
			var httpRequest = $http({
				method: 'POST',
				url: '/echo/json/',
				data: forecast
				
			}).success(function(data, status) {
				console.log('IT WORKS');
				console.log(data);
				$scope.days = data.daily.data;
			}).error(function(e) {
				console.log(e);
			});
		};
		
	});
</script>

<style type="text/css">
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, font, img, ins, kbd, q, s, samp,
small, strike, sub, sup, tt, var,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td {
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  font-weight: inherit;
  font-style: inherit;
  font-size: 100%;
  font-family: inherit;
  vertical-align: baseline;
}

html {
  -webkit-text-size-adjust: none;
}

body {
  line-height: 1;
  color: black;
  background: #F8B195;
  font-family: 'Lato', sans-serif;
  font-size: 16px;
  margin: 0 auto;
  text-align: center;
  padding: 10px;
  position: relative;
}

html {
  width: 100%;
  margin-bottom: 0px;
}

.open_sans {
  font-family: 'Open Sans', sans-serif;
  font-weight: 300;
}

h2 {
  font-size: 1.5em;
  font-family: 'Open Sans', sans-serif;
  font-weight: 300;
}

p {
  font-size: 1em;
  font-family: 'Lato', sans-serif;
  line-height: 1.2;
  padding-bottom: 0.25em;
}

input[type="text"] {
  border: 1px solid #F67280;
  border-radius: 3px;
  clear: both;
  display: block;
  font-family: 'Open Sans', sans-serif;
  font-weight: 300;
  font-size: 0.875em;
  color: #FFFFFF;
  margin: 10px auto;
  outline: 0;
  padding: 3px 1%;
  background: transparent;
}

button {
  background: #F67280;
  border: 0;
  border-radius: 3px;
  display: block;
  color: #FFFFFF;
  cursor: pointer;
  padding: 6px 57px;
  text-decoration: none;
  text-transform: uppercase;
  font-family: 'Open Sans', sans-serif;
  font-weight: 300;
  font-size: 0.875em;
  -webkit-appearance: none;
  margin: 10px auto;
}

.error {
  display: none;
  font-family: 'Open Sans', sans-serif;
  font-weight: 300;
  color: red;
  font-size: 0.75em;
}

.search_form {}

.results {
  width: 100%;
  display: none;
  margin: 1em 0 0;
  color: #FFFFFF;
  position: relative;
}

.current_weather h2 {
  padding: 0.5em 0 0.25em;
}

.weekly_forecast {
  margin-top: 2em;
  padding-bottom: 1em;
}

.day {
  width: 18%;
  display: inline-block;
  vertical-align: top;
  position: relative;
  margin: 2% 1%;
}

.day h2 {
  padding-bottom: 0.125em;
}

.location {
  margin: 1em 0 0.25em;
  font-size: 1.75em;
}

.summary {
  font-size: 0.875em;
}

.current_icon {
  width: 100px;
  height: 100px;
  display: inline-block;
  margin: 0.5em auto;
}

.icon {
  width: 50px;
  height: 50px;
  display: inline-block;
  margin: 0.5em auto;
}

.disclaimer {
  color: #FFFFFF;
  font-size: 0.5em;
  position: absolute;
  bottom: 0;
  width: 100%;
} 

@media only screen and (max-width: 767px) {
  body {
    font-size: 16px;
    font-size: 5vw;
  }
  h2 {
    font-size: 1.125em;
  }
  p {
    font-size: 0.875em;
  }
  input[type="text"] {
    width: 40%;
  }
  button {
    width: 42%;
    padding: 3px;
  }
  .day {
    width: 70%;
    margin: 5% auto;
  }
  .summary {
    font-size: 0.6875em;
  }
  .current_icon {
    width: 5em;
    height: 5em;
  }
  .icon {
    width: 2.5em;
    height: 2.5em;
  }
  .disclaimer {
    font-size: 0.35em;
  }
}
</style>

</head>

<body ng-controller="WeatherCtrl">
  <div class="container"> 
	<?php
		if(isset($_POST['submit']))
		{
			$zip = $_POST["zip"];
			echo '<script type="text/javascript">zip = String(' . $zip . '); window.onload = function (){angular.element(document.getElementById("weatherHTML")).controller().getLocation("' . $zip . '");}</script>';
		} 
	?>
    <form class="search_form" action="" method="post" ng-submit="processForm()">
      <p class="error">Please enter a valid zip code.</p>
      <input id="zip" name="zip" value="" type="text" required />
      <button type="submit" name="submit">Search</button>
    </form>
    <div class="results">
      <h2 class="location"></h2>
      <div class="current_weather">
        <h2>Current Weather</h2>
		  <p class="current_conditions open_sans">{{weather.currently.current_conditions}}</p>
		  <p class="current_temp open_sans">{{weather.currently.temperature}}</p>
		  <div class="current_icon icon_8">{{weather.currently.icon}}</div>
      </div>
      <div class="weekly_forecast">
        <h2>Weekly Forecast</h2>
		<div class="day" ng-repeat="day in daily">
			<h2 class="day_title">
				Monday
			</h2>
			<p class="high_temp_0 open_sans">{{day.temperatureMax}}</p>
			<p class="low_temp_0 open_sans">{{day.temperatureMin}}</p>
			<div class="icon_0 icon">{{day.icon}}</div>
			<p class="summary_0 summary">{{day.summary}}</p>
		</div>
      </div>
      <p class="disclaimer">
        Icons designed by Freepik, Vignesh Oviyan, Madebyoliver, Lucy G and Iconnice from Flaticon.
      </p>
    </div>
  </div>
</body>
</html>