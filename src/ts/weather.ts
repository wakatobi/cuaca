enum TemperatureScale {
    Celsius,
    Kelvin,
    Fahrenheit
}

function insertWeatherData(x, weather) {
    // creates article element to display weather data
    var elementToAdd = document.createElement("div");
    elementToAdd.className = "card";

    // creates message element in article
    var child = document.createElement("div");
    child.className = "card-content";

    var content = document.createElement("p");
    content.className = "title";
    content.classList.add("center");
    content.id = "content";

    var weatherText = document.createTextNode(weather);
    // var descriptionText = document.createTextNode(description);

    // create texts and appends it to the message element created
    var node = document.createTextNode(x + " ");
    var space = document.createTextNode(" ");
    var sign = document.createTextNode("C");
    // var icon = document.createElement("i");
    var br = document.createElement("br");
    var img = document.createElement("img");
    var degree = document.createTextNode("\xB0");

    var weatherMap = new Map();
    weatherMap.set('Clear', 'https://png.icons8.com/ios/50/000000/sun.png');
    weatherMap.set('Fog', 'https://png.icons8.com/ios/50/000000/fog-night.png');
    weatherMap.set('Mist', 'https://png.icons8.com/ios/50/000000/fog-night.png');
    weatherMap.set('Rain', 'https://png.icons8.com/ios/50/000000/rain.png');
    weatherMap.set('Hail', 'https://png.icons8.com/ios/50/000000/hail.png');
    weatherMap.set('Haze', 'https://png.icons8.com/ios/50/000000/fog-day.png');
    weatherMap.set('Snow', 'https://png.icons8.com/ios/50/000000/winter.png');
    weatherMap.set('Clouds', 'https://png.icons8.com/ios/50/000000/clouds.png');


    img.src = weatherMap.get(weather);

    // appends message to article
    content.appendChild(node); // adds temperature
    content.appendChild(degree);
    content.appendChild(sign); // celsius sign
    content.appendChild(br); // adds break
    content.appendChild(img); // appends logo
    content.appendChild(space); // adds blank space
    content.appendChild(weatherText); // weather info

    // appends divs and set id
    child.appendChild(content);
    elementToAdd.appendChild(child);
    elementToAdd.id = "weatherObject";

    // appends article to container
    document.getElementById("contain").appendChild(elementToAdd);

}

/**
 * Convert Kelvin to target temperature scale.
 *
 * @param {number} kelvin Temperature in Kelvin.
 * @param {TemperatureScale} [scale=TemperatureScale.Celsius] Target scale.
 * @returns {number} Kelvin in target scale.
 */
function convertKelvinTo(kelvin: number, scale: TemperatureScale = TemperatureScale.Celsius): number {

    let final: number = 0;

    switch (scale) {
        case TemperatureScale.Celsius:
            final = kelvin - 273.15;
            break;
        case TemperatureScale.Fahrenheit:
            final *= (9 / 5);
            final += 32;
            break;
        default:
            final = kelvin;
            break;
    }

    return final;
}

function removeWeatherData(id) {
    var elementToRemove = document.getElementById(id);
    if (elementToRemove) {
        elementToRemove.parentNode.removeChild(elementToRemove);
    }
}

function getWeatherData(url) {
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (weatherData) {
        var temperature = weatherData.main.temp;
        var weather = weatherData.weather[0].main;
        temperature = convertKelvinTo(temperature);
        temperature = temperature.toFixed();

        if (document.getElementById("weatherObject")) {
            var id1 = "weatherObject";
            var id2 = "celsius";
            var id3 = "fahrenheit";

            removeWeatherData(id1);
            removeWeatherData(id2);
            removeWeatherData(id3);
        }

        insertWeatherData(temperature, weather);
    })
}

var input = document.getElementById("input");

input.addEventListener("keydown", function (a) {
    if (a.keyCode === 13) {  // When "enter" is pressed.
        var address = "http://api.openweathermap.org/data/2.5/weather?q=";
        address += input.value;
        address += "&APPID={INSERT_YOUR_API_KEY_HERE}"
        getWeatherData(address);
    }
});