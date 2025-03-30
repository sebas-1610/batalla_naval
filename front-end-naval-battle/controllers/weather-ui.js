// controllers/weather-ui.js
import { getWeatherData } from './apiweather.js';

function updateWeatherDisplay(weather, countryName, countryCode) {
    const weatherDisplay = document.getElementById('weather-display');
    
    if (!weather) {
        weatherDisplay.innerHTML = `
            <div class="weather-error">
                <p>No se pudo obtener el clima para ${countryName}</p>
                <small>Intenta con otro país</small>
            </div>
        `;
        return;
    }

    weatherDisplay.innerHTML = `
        <h3>Clima en ${weather.actualLocation || countryName}</h3>
        <div class="weather-data">
            <img src="https://openweathermap.org/img/wn/${weather.icon}@2x.png" alt="Icono del clima">
            <div>
                <p class="weather-temp">${weather.temperature} °C</p>
                <p class="weather-desc">${weather.conditions}</p>
                <small class="weather-country">${countryCode.toUpperCase()}</small>
            </div>
        </div>
    `;
}

function setupWeatherSystem() {
    const countrySelect = document.getElementById('nations');
    
    countrySelect.addEventListener('change', async (e) => {
        const countryCode = e.target.value;
        if (!countryCode) return;
        
        const countryName = e.target.options[e.target.selectedIndex].text;
        const weather = await getWeatherData(countryName, countryCode);
        updateWeatherDisplay(weather, countryName, countryCode);
    });
}

// Espera a que el dropdown esté listo
function init() {
    const checkReady = setInterval(() => {
        const select = document.getElementById('nations');
        if (select && select.options.length > 1) {
            clearInterval(checkReady);
            setupWeatherSystem();
        }
    }, 100);
}

document.addEventListener('DOMContentLoaded', init);