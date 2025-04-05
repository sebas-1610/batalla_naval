import { createMatrix, cleanBoard, matrix } from "./board.js"; // Importar matrix desde board.js
import { enableDraggingFromBoard, initializeFigures } from "./figures.js";
import "./urlParams.js";

// Recibir del input el nickname del jugador y guardarlo en la sesión
document.addEventListener("DOMContentLoaded", function () {
  // Obtener los parámetros de la URL
  const params = new URLSearchParams(window.location.search);
  const nickname = params.get("nickname");
  const nation = params.get("nation");

  // Ejemplo de uso: mostrar el nickname en la barra de navegación
  if (nickname) {
    const nicknameElement = document.getElementById("nickname");
    if (nicknameElement) {
      nicknameElement.textContent = nickname;
      console.log(`Nickname: ${nickname}`);
    }
  }

  // Ejemplo de uso: mostrar la nación en la consola
  if (nation) {
    console.log(`Nación seleccionada: ${nation}`);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  let boton = document.getElementById("botonNumero");

  boton.addEventListener("click", function () {
    let n = parseFloat(document.getElementById("tamañoTablero").value);
    if (n >= 10 && n <= 20) {
      createMatrix(n);
      enableDraggingFromBoard();
      initializeFigures(); // Inicializar las figuras después de crear el tablero

      // Crear botón para exportar tableros y redirigir
      const figureContainer = document.getElementById("figureContainer");
      const exportButton = document.createElement("button");
      exportButton.className = "btn btn-success mt-3";
      exportButton.innerText = "Comenzar Juego";
      exportButton.addEventListener("click", exportBoardsAndRedirect);
      figureContainer.appendChild(exportButton);
    } else {
      console.log("Ingrese numero valido entre 10 y 20");
    }
  });
});

function exportBoardsAndRedirect() {
  const userBoard = generateBoardJSON("p1");
  const machineBoard = generateBoardJSON("p2");

  // Guardar los tableros en localStorage
  localStorage.setItem("userBoard", JSON.stringify(userBoard));
  localStorage.setItem("machineBoard", JSON.stringify(machineBoard));

  // Redirigir a jugando.html
  window.location.href = "jugando.html";
}

function generateBoardJSON(player) {
  return matrix.map((row) =>
    row.map((cell) => {
      if (cell === "ship") return player;
      return "a"; // Agua
    })
  );
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("contenedorTablero").style.width = "65%";
  document.getElementById("contenedorTablero").style.margin = "0 auto";
  document
    .getElementById("contenedorTablero")
    .classList.add("contenedor-tablero");

  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("grid")) {
      let img = document.createElement("img");
      img.style.width = "100%";
      img.style.height = "100%";
      img.classList.add("img-juego");
      event.target.innerHTML = "";
      event.target.appendChild(img);
    }
  });
});
