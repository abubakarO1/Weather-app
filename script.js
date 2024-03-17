//making object of weatherapi
const weatherApi = {
    key: '4eb3703790b356562054106543b748b2',
    baseUrl: 'https://api.openweathermap.org/data/2.5/weather'
}

//anonymous function
//adding event listener key press of enter
let searchInputBox = document.getElementById('input-box');
searchInputBox.addEventListener('keypress', (event) => {
    if (event.keyCode == 13) {
        // console.log(searchInputBox.value);
        getWeatherReport(searchInputBox.value);
        
    }
})

//get weather report
function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)  
        .then(weather => {
            return weather.json(); 
        }).then(showWeatherReport);  
}

//show weather report
function showWeatherReport(weather) {
    let city_code = weather.cod;
    if (city_code === '400') { 
        swal("Empty Input", "Please enter any city", "error");
        reset();
    } else if (city_code === '404') {
        swal("Bad Input", "Entered city didn't match", "warning");
        reset();
    } else {
        let op = document.getElementById('weather-body');
        op.style.display = 'block';
        let todayDate = new Date();
        let parent = document.getElementById('parent');
        let weather_body = document.getElementById('weather-body');
        weather_body.innerHTML = ''; // Clear previous weather report
        weather_body.innerHTML =
            `
        <div class="location-deatils">
            <div class="city" id="city">${weather.name}, ${weather.sys.country}</div>
            <div class="date" id="date"> ${dateManage(todayDate)}</div>
        </div>
        <div class="weather-status">
            <div class="temp" id="temp">${Math.round(weather.main.temp)}&deg;C </div>
            <div class="weather" id="weather"> ${weather.weather[0].main} <i class="${getIconClass(weather.weather[0].main)}"></i>  </div>
            <div class="min-max" id="min-max">${Math.floor(weather.main.temp_min)}&deg;C (min) / ${Math.ceil(weather.main.temp_max)}&deg;C (max) </div>
            <div id="updated_on">Updated as of ${getTime(todayDate)}</div>
        </div>
        <hr>
        <div class="day-details">
            <div class="basic">Feels like ${weather.main.feels_like}&deg;C | Humidity ${weather.main.humidity}%  <br> Pressure ${weather.main.pressure} mb | Wind ${weather.wind.speed} KMPH</div>
        </div>
        `;
        parent.append(weather_body);
        changeBg(weather.weather[0].main);
        reset();
    }
}

//function for the last updated current time 
function getTime(todayDate) {
    let hour = addZero(todayDate.getHours());
    let minute = addZero(todayDate.getMinutes());
    return `${hour}:${minute}`;
}

//date manage for returning current date
function dateManage(dateArg) {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];
    return `${date} ${month} (${day}) , ${year}`
}

//function for dynamic background change according to weather status
function changeBg(status) {
    let body = document.body;
    switch (status) {
        case 'Clouds':
            body.style.backgroundImage = 'url(img/clouds.jpg)';
            break;
        case 'Rain':
            body.style.backgroundImage = 'url(img/rainy.jpg)';
            break;
        case 'Clear':
            body.style.backgroundImage = 'url(img/clear.jpg)';
            break;
        case 'Snow':
            body.style.backgroundImage = 'url(img/snow.jpg)';
            break;
        case 'Sunny':
            body.style.backgroundImage = 'url(img/sunny.jpg)';
            break;
        case 'Thunderstorm':
            body.style.backgroundImage = 'url(img/thunderstrom.jpg)';
            break;
        case 'Drizzle':
            body.style.backgroundImage = 'url(img/drizzle.jpg)';
            break;
        case 'Mist':
        case 'Haze':
        case 'Fog':
            body.style.backgroundImage = 'url(img/mist.jpg)';
            break;
        default:
            body.style.backgroundImage = 'url(img/bg.jpg)';
            break;
    }
}

//function for the classname of icon
function getIconClass(classarg) {
    switch (classarg) {
        case 'Rain':
            return 'fas fa-cloud-showers-heavy';
        case 'Clouds':
            return 'fas fa-cloud';
        case 'Clear':
            return 'fas fa-cloud-sun';
        case 'Snow':
            return 'fas fa-snowman';
        case 'Sunny':
            return 'fas fa-sun';
        case 'Mist':
            return 'fas fa-smog';
        case 'Thunderstorm':
        case 'Drizzle':
            return 'fas fa-thunderstorm';
        default:
            return 'fas fa-cloud-sun';
    }
}

function reset() {
    let input = document.getElementById('input-box');
    input.value = "";
}

// function to add zero if hour and minute less than 10
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
