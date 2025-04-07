import { GameManager } from "./GameManager.js";

document.addEventListener("DOMContentLoaded", function () {
  // Mostrar bandera y nickname - PRIMERO ESTO
  const countryCode = localStorage.getItem("selectedCountry");
  const nickname = localStorage.getItem("nickname");
  
  const nationFlag = document.getElementById("nationFlag");
  const nicknameElement = document.getElementById("nickname");
  
  if (countryCode && nationFlag) {
    nationFlag.src = `https://flagcdn.com/20x15/${countryCode}.png`;
    nationFlag.alt = `Bandera de ${countryCode.toUpperCase()}`;
    console.log("Bandera cargada:", nationFlag.src); // Para depuración
  } else {
    console.error("No se encontró countryCode o elemento nationFlag");
  }
  
  if (nickname && nicknameElement) {
    nicknameElement.textContent = nickname;
  }

  // Resto del código del juego...
  const userBoard = JSON.parse(localStorage.getItem("userBoard"));
  const machineBoard = JSON.parse(localStorage.getItem("machineBoard"));
 ///////////////////////////////////////////

  if (!userBoard || !machineBoard) {
    alert(
      "No se encontraron datos de los tableros. Regresando a la página principal."
    );
    window.location.href = "index.html";
    return;
  }

  console.log("JSON inicial del tablero del jugador:", userBoard);
  console.log("JSON inicial del tablero de la máquina:", machineBoard);

  const smallBoardContainer = document.getElementById("smallBoard");
  const largeBoardContainer = document.getElementById("largeBoard");

  const gameManager = new GameManager(
    userBoard,
    machineBoard,
    (boardType, board) => {
      if (boardType === "user") {
        renderBoard(smallBoardContainer, board, true, "user", gameManager);
      } else if (boardType === "machine") {
        renderBoard(largeBoardContainer, board, false, "machine", gameManager);
      }
    }
  );

  renderBoard(smallBoardContainer, userBoard, true, "user", gameManager);
  renderBoard(largeBoardContainer, machineBoard, false, "machine", gameManager);
});

function renderBoard(container, board, isSmall, boardType, gameManager) {
  container.innerHTML = ""; // Limpiar el contenedor
  const size = board.length;

  const boardElement = document.createElement("div");
  boardElement.className = "d-flex flex-wrap";
  boardElement.style.width = isSmall ? "300px" : "500px"; // Tamaño del tablero
  boardElement.style.aspectRatio = "1 / 1";
  boardElement.style.border = "2px solid black";

  board.forEach((row, x) => {
    row.forEach((cell, y) => {
      const cellElement = document.createElement("div");
      cellElement.className = "grid";
      cellElement.style.flex = `0 0 ${100 / size}%`;
      cellElement.style.aspectRatio = "1 / 1";
      cellElement.style.border = "1px solid black";
      cellElement.style.boxSizing = "border-box";

      // Colorear las celdas según el contenido
      if (boardType === "user") {
        if (cell === "p1") cellElement.style.backgroundColor = "grey";
        else if (cell === "p1-h") cellElement.style.backgroundColor = "red";
        else if (cell === "b") cellElement.style.backgroundColor = "blue";
      }

      if (boardType === "machine") {
        if (cell === "p2-h") cellElement.style.backgroundColor = "red";
        else if (cell === "b") cellElement.style.backgroundColor = "blue";

        // Agregar eventos de clic solo al tablero de la máquina
        cellElement.addEventListener("click", function () {
          gameManager.handlePlayerShot(x, y);
        });
      }

      boardElement.appendChild(cellElement);
    });
  });

  container.appendChild(boardElement);
}
