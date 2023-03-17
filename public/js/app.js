var fetchWeather = "/weather";

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');


// const weatherIcon = document.querySelector('.weatherIcon i');
const weatherCondition = document.querySelector('.weatherCondition');

const tempElement = document.querySelector('.temperature span');

const locationElement = document.querySelector('.place');

const humidityElement = document.querySelector('.humidity');

const dateElement = document.querySelector('.date');

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

dateElement.textContent = new Date().getDate() + ", " + monthNames[new Date().getMonth()].substring(0, 3) + " " + new Date().getFullYear();


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();

    locationElement.textContent = "City not found...";
    tempElement.textContent = "";
    weatherCondition.textContent = "";
    const locationApi = fetchWeather + "?address=" + search.value;

    fetch(locationApi).then(response => {
        response.json().then(data => {
            if (data.error) {
                locationElement.textContent = data.error;
                tempElement.textContent = "";
                weatherCondition.textContent = "";
            } else {
                locationElement.textContent = 'City: ' + data.cityName;
                tempElement.textContent = (data.temperature - 273.5).toFixed(2) + String.fromCharCode(176) + 'C';
                weatherCondition.textContent = 'Weather Condition: ' + data.description;
                // humidityElement.textContent = 'Humidity: ' + data.humidity;
                weatherForm.reset();
            }
        })
    });

})