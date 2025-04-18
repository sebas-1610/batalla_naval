import { createMatrix, matrix } from "./board.js"; // Importar matrix desde board.js
import { enableDraggingFromBoard, initializeFigures } from "./figures.js";

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
  if (boton) {
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
  }

});

export function exportBoardsToTxt(userBoard, machineBoard) {
  const boardToText = (board) =>
    board
      .map((row) =>
        row
          .map((cell) => (cell === "p1" || cell === "p2" ? "⬜" : "⬛"))
          .join("")
      )
      .join("\n");

  const userBoardText = `Tablero del Usuario:\n${boardToText(userBoard)}\n\n`;
  const machineBoardText = `Tablero de la Máquina:\n${boardToText(
    machineBoard
  )}\n`;

  const blob = new Blob([userBoardText + machineBoardText], {
    type: "text/plain;charset=utf-8",
  });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "tableros.txt";
  link.click();
}

function exportBoardsAndRedirect() {
  const userBoard = generateBoardJSON("p1", matrix);
  const machineBoard = generateRandomMachineBoard(matrix.length);

  // Guardar los tableros en localStorage
  localStorage.setItem("userBoard", JSON.stringify(userBoard));
  localStorage.setItem("machineBoard", JSON.stringify(machineBoard));

  // Exportar los tableros a un archivo .txt
  exportBoardsToTxt(userBoard, machineBoard);

  // Redirigir a jugando.html
  window.location.href = "jugando.html";
}

function generateBoardJSON(player, boardMatrix) {
  return boardMatrix.map((row) =>
    row.map((cell) => {
      if (cell === "ship") return player;
      return "a"; // Agua
    })
  );
}

function generateRandomMachineBoard(size) {
  const board = Array.from({ length: size }, () => Array(size).fill("a"));
  const ships = [
    { size: 5, count: 1 },
    { size: 4, count: 1 },
    { size: 3, count: 2 },
    { size: 2, count: 2 },
  ];

  ships.forEach((ship) => {
    for (let i = 0; i < ship.count; i++) {
      let placed = false;
      while (!placed) {
        const rotation = Math.random() < 0.5 ? 0 : 1; // 0: horizontal, 1: vertical
        const x = Math.floor(Math.random() * size);
        const y = Math.floor(Math.random() * size);

        if (canPlaceShip(board, x, y, ship.size, rotation)) {
          placeShip(board, x, y, ship.size, rotation, "p2");
          placed = true;
        }
      }
    }
  });

  return board;
}

function canPlaceShip(board, x, y, size, rotation) {
  if (rotation === 0 && y + size > board.length) return false;
  if (rotation === 1 && x + size > board.length) return false;

  for (let i = 0; i < size; i++) {
    const cell = rotation === 0 ? board[x][y + i] : board[x + i][y];
    if (cell !== "a") return false;
  }

  return true;
}

function placeShip(board, x, y, size, rotation, marker) {
  for (let i = 0; i < size; i++) {
    if (rotation === 0) board[x][y + i] = marker;
    else board[x + i][y] = marker;
  }
}

//me ayuda contener el tablero donde lo necesito antes de empezar a jugar donde lo necesito
document.addEventListener("DOMContentLoaded", function () {
  const contenedorTablero = document.getElementById("contenedorTablero");

  if (contenedorTablero) {
      contenedorTablero.classList.add("contenedor-tablero");
  } else {
      console.error("El elemento 'contenedorTablero' no existe en el DOM. (excepto si estoy en jugando.html eso no cuenta como error porque no debe existir en esa interfaz solo en game)");
      return; // Salir si el elemento no existe
  }

  document.addEventListener("click", function (event) {
      if (event.target.classList.contains("grid")) {
          let img = document.createElement("img");
          img.classList.add("img-juego");
          event.target.innerHTML = "";
          event.target.appendChild(img);
      }
  });
});


// parte que genera la bandera obteniendo el nation que ingresó y la guarda en un localStorage para que tambien se muestre la bandera en la interfaz jugando
document.addEventListener("DOMContentLoaded", function () {
  // Obtener el código de país desde la URL (ej: ?nation=co)
  const params = new URLSearchParams(window.location.search);
  const countryCode = params.get("nation"); // "co", "us", etc.
  const nickname = params.get("nickname");

  // Guardar datos primero
  if (countryCode) {
    localStorage.setItem("selectedCountry", countryCode.toLowerCase());

    const userFlag = document.getElementById("user-flag");
    if (userFlag) {
      userFlag.src = `https://flagcdn.com/20x15/${countryCode.toLowerCase()}.png`;
      userFlag.alt = `Bandera de ${countryCode.toUpperCase()}`;
    }
  }

  if (nickname) {
    localStorage.setItem("nickname", nickname);
    const nicknameElement = document.getElementById("nickname");
    if (nicknameElement) {
      nicknameElement.textContent = nickname;
    }
  }
});