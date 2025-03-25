// apiController.js

// Función para obtener la lista de países
async function fetchCountries() {
    try {
        const response = await fetch('http://127.0.0.1:5000/countries');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const countries = await response.json();
        populateCountriesDropdown(countries);
    } catch (error) {
        console.error('Error fetching countries:', error);
    }
}

// Función para llenar el menú desplegable con los países
function populateCountriesDropdown(countries) {
    const nationsDropdown = document.getElementById('nations');


    countries.forEach(country => {
        let code = Object.keys(country)[0];
        let option = document.createElement('option');
        let name = country[code]
        option.value = code; // Asumiendo que el objeto país tiene una propiedad 'code'
        option.textContent  = name; // Asumiendo que el objeto país tiene una propiedad 'name'
        nationsDropdown.appendChild(option);
    });
}

// Llamar a la función para obtener los países al cargar la página
document.addEventListener('DOMContentLoaded', fetchCountries);