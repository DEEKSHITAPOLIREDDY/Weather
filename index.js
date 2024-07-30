document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.querySelector('#search-btn');
    const cityInput = document.querySelector('#city');
    const locationElem = document.querySelector('#location');
    const temperatureElem = document.querySelector('#temperature');
    const windElem = document.querySelector('#wind');
    const humidityElem = document.querySelector('#humidity');
    const weatherIconElem = document.querySelector('#weather-icon');
    const weatherDescriptionElem = document.querySelector('#weather-description');
    const forecastElem = document.querySelector('#forecast');

    searchBtn.addEventListener('click', () => {
        const city = cityInput.value.trim();
        if (city) {
            fetchWeatherData(city);
        } else {
            alert('Please enter a city name.');
        }
    });

    function fetchWeatherData(city) {
        const apiKey = 'ffe841b9f29cb90cbcc3a8718de0f4cc'; // Replace with your OpenWeatherMap API key
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('City not found');
                }
                return response.json();
            })
            .then(data => {
                displayCurrentWeather(data);
                fetchForecastData(city);
            })
            .catch(error => {
                locationElem.textContent = 'Error fetching data: ' + error.message;
                temperatureElem.textContent = '';
                windElem.textContent = '';
                humidityElem.textContent = '';
                weatherIconElem.src = '';
                weatherDescriptionElem.textContent = '';
            });
    }

    function displayCurrentWeather(data) {
        locationElem.textContent = `${data.name} (${new Date(data.dt * 1000).toLocaleDateString()})`;
        temperatureElem.textContent = `Temperature: ${data.main.temp}°C`;
        windElem.textContent = `Wind: ${data.wind.speed} m/s`;
        humidityElem.textContent = `Humidity: ${data.main.humidity}%`;
        weatherIconElem.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        weatherDescriptionElem.textContent = data.weather[0].description;
    }

    function fetchForecastData(city) {
        const apiKey = 'ffe841b9f29cb90cbcc3a8718de0f4cc'; // Replace with your OpenWeatherMap API key
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('City not found');
                }
                return response.json();
            })
            .then(data => {
                displayForecastData(data);
            })
            .catch(error => {
                forecastElem.innerHTML = 'Error fetching forecast data: ' + error.message;
            });
    }

    function displayForecastData(data) {
        forecastElem.innerHTML = data.list.slice(0, 5).map(item => `
            <li class="card">
                <h3>${new Date(item.dt * 1000).toLocaleDateString()}</h3>
                <img class="icons" src="http://openweathermap.org/img/wn/${item.weather[0].icon}.png" alt="weather-icon">
                <h4>Temp: ${item.main.temp}°C</h4>
                <h4>Wind: ${item.wind.speed} m/s</h4>
                <h4>Humidity: ${item.main.humidity}%</h4>
            </li>
        `).join('');
    }
});
