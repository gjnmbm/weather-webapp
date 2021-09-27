let geo = navigator.geolocation;
let link = `https://api.weather.gov`;
let forecastLink;
//TODO: Work on weather summary and aesthetics 
function onClick() {
    if ('geolocation' in navigator) {
        geo.getCurrentPosition(success);
    }
    else {
        document.getElementById("currentLoc").textContent = "Current Location: Unavailible";
    }
}
//Don't forget the data before the rest of the stuff or else you won't
//be able to access the JSON files
//There are 13 periods in total
function success(position) {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    link += `/points/${latitude},${longitude}`;
    console.log(link);
    $.getJSON(link, function(data) {
        document.getElementById("currentLoc").textContent = 
        `Current Location: 
        ${data.properties.relativeLocation.properties.city}, ${data.properties.relativeLocation.properties.state}`;
        forecastLink = `${data.properties.forecast}`;
        $.getJSON(forecastLink, function(data) {
            //document.getElementById("forecast").textContent = Forecast for Tomorrow: 
            for (var i = 0; i < 14; i++) {
                let element = document.getElementById("weather");
                let para = document.createElement("p");
                let node = document.createTextNode(`${data.properties.periods[`${i}`].name}: 
                ${data.properties.periods[`${i}`].detailedForecast}`);
                para.appendChild(node);
                element.appendChild(para);
                let img = document.createElement("img");
                img.src = `${data.properties.periods[`${i}`].icon}`;
                img.alt = "Weather Image";
                element.appendChild(img);
                //document.getElementById("forecastImage").src = `${data.properties.periods[`${i}`].icon}`; 
            }
        });
    }); 
  }

