enum TemperatureScale {
    Celsius,
    Kelvin,
    Fahrenheit
}

export interface Coord {
    lon: number;
    lat: number;
}

export interface WeatherCondition {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface Main {
    temp: number;
    pressure: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
}

export interface Wind {
    speed: number;
    deg: number;
}

export interface Clouds {
    all: number;
}

export interface Sys {
    type: number;
    id: number;
    message: number;
    country: string;
    sunrise: number;
    sunset: number;
}

export interface WeatherData {
    coord: Coord;
    weather: WeatherCondition[];
    base: string;
    main: Main;
    visibility: number;
    wind: Wind;
    clouds: Clouds;
    dt: number;
    sys: Sys;
    id: number;
    name: string;
    cod: number;
}

let weatherMap: Map<string, URL> = new Map();

weatherMap.set('Clear', new URL('https://png.icons8.com/ios/50/000000/sun.png'));
weatherMap.set('Fog', new URL('https://png.icons8.com/ios/50/000000/fog-night.png'));
weatherMap.set('Mist', new URL('https://png.icons8.com/ios/50/000000/fog-night.png'));
weatherMap.set('Rain', new URL('https://png.icons8.com/ios/50/000000/rain.png'));
weatherMap.set('Hail', new URL('https://png.icons8.com/ios/50/000000/hail.png'));
weatherMap.set('Haze', new URL('https://png.icons8.com/ios/50/000000/fog-day.png'));
weatherMap.set('Snow', new URL('https://png.icons8.com/ios/50/000000/winter.png'));
weatherMap.set('Clouds', new URL('https://png.icons8.com/ios/50/000000/clouds.png'));

/**
 * Insert weather information to DOM.
 *
 * @param {WeatherData} weatherData Weather data.
 */
function insertWeatherData(weatherData: WeatherData) {
    let card: Element = document.createElement("div");
    card.className = "card";
    card.id = "weather-info-card";

    let cardContent: Element = document.createElement("div");
    cardContent.className = "card-content";

    let weatherInfo: Element = document.createElement("p");
    weatherInfo.className = "title";
    weatherInfo.classList.add("center");
    weatherInfo.id = "content";

    let weatherText: string = `${weatherData.name}<br>${weatherData.main.temp} \xB0C<br>`;

    let weatherImage: HTMLImageElement = document.createElement("img");

    weatherImage.src = weatherMap.get(weatherData.weather[0].main).href;

    card.append(weatherInfo);
    weatherInfo.innerHTML = weatherText;
    weatherInfo.append(weatherImage);
    weatherInfo.innerHTML += weatherData.weather[0].main;

    document.getElementById("contain").appendChild(card);
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

/**
 * Remove weather information from DOM.
 *
 * @param {*} id
 */
function removeWeatherData(id) {
    let elementToRemove: Element = document.getElementById(id);
    if (elementToRemove) {
        elementToRemove.parentNode.removeChild(elementToRemove);
    }
}

/**
 * Get weather data.
 *
 * @param {*} url API url.
 */
function getWeatherData(url: URL): Promise<WeatherData> {
    return fetch(url.href).then(response => {
        return response.json();
    });
}

let input: HTMLInputElement = document.getElementById("input") as HTMLInputElement;

input.addEventListener("keydown", function (a) {
    if (a.keyCode === 13) {  // When "enter" is pressed.
        let apiKey: string = ""; // Insert your api key here.
        let units: string = "metric";
        let url: URL = new URL(`http://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=${units}&APPID=${apiKey}`);

        getWeatherData(url).then(data => {
            if (document.getElementById("weather-info-card")) {
                removeWeatherData("weather-info-card");
            }

            insertWeatherData(data);
        });
    }
});