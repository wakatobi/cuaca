var input = document.getElementById("input");

input.addEventListener("keydown", function (a) {
    if (a.keyCode === 13) {  // checks whether the pressed key is "Enter"
        var address = "http://api.openweathermap.org/data/2.5/weather?q=";
        address += input.value;
        address += "&APPID={INSERT_YOUR_API_KEY_HERE}"
        getWeatherData(address);
    }
});