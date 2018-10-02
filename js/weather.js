/* function insertWeatherData (x) {
    // creates article element to display weather data
    var elementToAdd = document.createElement("article");
    elementToAdd.className = "message";
    elementToAdd.classList.add("is-primary");
    elementToAdd.classList.add("is-large")

    // creates message element in article
    var child = document.createElement("div");
    child.className = "message-body";

    // create texts and appends it to the message element created
    var node = document.createTextNode(x);
    child.appendChild(node);

    // appends message to article
    elementToAdd.appendChild(child);
    elementToAdd.id = "weatherObject";

    // creates a button
    var celsius = document.createElement("button");
    celsius.className = "button";
    celsius.classList.add("is-primary");
    celsius.classList.add("is-outlined");
    celsius.textContent = "C";
    celsius.id = "celsius";

    var farenheit = document.createElement("button");
    farenheit.className = "button";
    farenheit.classList.add("is-primary");
    farenheit.classList.add("is-outlined");
    farenheit.textContent = "F";
    farenheit.id = "fahrenheit";

    // creates new row
    var newDiv = document.createElement('div');
    newDiv.appendChild(celsius);
    newDiv.appendChild(farenheit);
    
    // appends article to container
    document.getElementById("contain").appendChild(elementToAdd);
    document.getElementById("contain").appendChild(newDiv);


} */

function insertWeatherData (x, weather) {
    // creates article element to display weather data
    var elementToAdd = document.createElement("div");
    elementToAdd.className = "card";
    // elementToAdd.classList.add("is-primary");
    // elementToAdd.classList.add("is-large")

    // creates message element in article
    var child = document.createElement("div");
    child.className = "card-content";

    // p tag
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
    degree.src = "https://png.icons8.com/small/50/000000/0-degrees.png";

    
    var weatherMap = new Map();
    var keyString = 'Clear';
    weatherMap.set(keyString, 'https://png.icons8.com/ios/50/000000/sun.png');
    keyString = 'Fog';
    weatherMap.set(keyString, 'https://png.icons8.com/ios/50/000000/fog-night.png');
    keyString = 'Mist';
    weatherMap.set(keyString, 'https://png.icons8.com/ios/50/000000/fog-night.png');
    keyString = 'Rain';
    weatherMap.set(keyString, 'https://png.icons8.com/ios/50/000000/rain.png');
    keyString = 'Hail';
    weatherMap.set(keyString, 'https://png.icons8.com/ios/50/000000/hail.png');
    keyString = 'Haze';
    weatherMap.set(keyString, 'https://png.icons8.com/ios/50/000000/fog-day.png');
    keyString = 'Snow';
    weatherMap.set(keyString, 'https://png.icons8.com/ios/50/000000/winter.png');
    keyString = 'Clouds';
    weatherMap.set(keyString, 'https://png.icons8.com/ios/50/000000/clouds.png');

    img.src = weatherMap.get(weather);

    /*

    if (weather === "Fog" || weather === "Mist"){
        img.src = "https://png.icons8.com/ios/50/000000/fog-night.png";
    }
    else if (weather === "Clouds"){
        img.src = "https://png.icons8.com/ios/50/000000/clouds.png";
    }
    else if (weather === "Rain"){
        img.src = "https://png.icons8.com/ios/50/000000/rain.png";
    }
    else if(weather === "Snow"){
        img.src = "https://png.icons8.com/ios/50/000000/winter.png";
    }
    else if(weather === "Hail"){
        img.src = "https://png.icons8.com/ios/50/000000/hail.png";
    }
    else if(weather == "Haze"){
        img.src = "https://png.icons8.com/ios/50/000000/fog-day.png";
    }
    else {
        img.src = "https://png.icons8.com/ios/50/000000/sun.png";
    }

    */

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

    /*
    // creates a button
    var celsius = document.createElement("a");
    celsius.onclick = convert(x, "C")
    celsius.className = "button";
    celsius.classList.add("is-primary");
    celsius.classList.add("is-outlined");
    celsius.textContent = "C";
    celsius.id = "celsius";

    // creates a button
    var farenheit = document.createElement("a");
    farenheit.onclick = convert(x, "F");
    farenheit.className = "button";
    farenheit.classList.add("is-primary");
    farenheit.classList.add("is-outlined");
    farenheit.textContent = "F";
    farenheit.id = "fahrenheit";

    // creates new row
    var newDiv = document.createElement('div');
    newDiv.appendChild(celsius);
    newDiv.appendChild(farenheit);

    elementToAdd.appendChild(newDiv);    
    */

    // appends article to container
    document.getElementById("contain").appendChild(elementToAdd);

}

function convert (x, text){
    var final = x - 273.15;
    if (text == "F") {
        final = final * (9/5);
        final += 32;
    }
    return final;
}

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
        // var description = weatherData.weather[0].description;
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

        insertWeatherData(temp, weather);
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