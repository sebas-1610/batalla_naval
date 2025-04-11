// Es para los paises solo que no le cambio el nombre por pereza

// Función para obtener la lista de países
async function fetchCountries() {
  try {
    const response = await fetch("http://127.0.0.1:5000/countries");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const countries = await response.json();
    populateCountriesDropdown(countries);
  } catch (error) {
    console.error("Error fetching countries:", error);
  }
}

// Función para llenar el menú desplegable con los países
function populateCountriesDropdown(countries) {
  const nationsDropdown = document.getElementById("nations");

  countries.forEach((country) => {
    let code = Object.keys(country)[0];
    let option = document.createElement("option");
    let name = country[code];
    option.value = code; // Asumiendo que el objeto país tiene una propiedad 'code'
    option.textContent = name; // Asumiendo que el objeto país tiene una propiedad 'name'
    nationsDropdown.appendChild(option);
  });
}

// Llamar a la función para obtener los países al cargar la página
document.addEventListener("DOMContentLoaded", fetchCountries);

document.addEventListener("DOMContentLoaded", function () {
  const botonJugar = document.getElementById("botonJugar");

  if (botonJugar) {  // ← Verifica si el elemento existe
    botonJugar.addEventListener("click", function (event) {
      event.preventDefault();
      redirectToGame();
      });
    }
});

function redirectToGame() {
  const nickname = document.getElementById("nickname").value.trim(); // Obtener el valor del campo de texto
  const nationsSelect = document.getElementById("nations");
  const nation = nationsSelect.value; // Obtener el valor seleccionado del menú desplegable
  
  if (!nickname) {
    alert("Por favor, ingrese un nickname.");
    console.log("Nickname no válido.");
    return;
  }

  if (!nation || nation === "") {
    alert("Por favor, seleccione una nación válida.");
    console.log("Nación no válida.");
    return;
  }

  // Redirigir con los datos como parámetros en la URL
  window.location.href = `game.html?nickname=${encodeURIComponent(
    nickname
  )}&nation=${encodeURIComponent(nation)}`;
}
