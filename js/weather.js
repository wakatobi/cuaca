function removeWeatherData (x) {
    var elementToRemove = document.getElementById(x);
    if(elementToRemove){
        elementToRemove.parentNode.removeChild(elementToRemove);
    }
}

function getWeatherData (url) {
    fetch(url).then(function(response){
        return response.json();
    }).then(function(weatherData){
        var temp = weatherData.main.temp;
        var weather = weatherData.weather[0].main;
        var description = weatherData.weather[0].description;
        temp = convert(temp);
        temp = temp.toFixed();

        if(document.getElementById("weatherObject")){
            var id1 = "weatherObject";
            var id2 = "celsius";
            var id3 = "fahrenheit";

            removeWeatherData(id1);
            removeWeatherData(id2);
            removeWeatherData(id3);
        }

        insertWeatherData(temp, weather, description);
    })
}

var input = document.getElementById("input");

input.addEventListener("keydown", function (a) {
    if (a.keyCode === 13) {  // checks whether the pressed key is "Enter"
        var address = "http://api.openweathermap.org/data/2.5/weather?q=";
        address += input.value;
        address += "&APPID={INSERT_YOUR_API_KEY_HERE}"
        getWeatherData(address);
    }
});