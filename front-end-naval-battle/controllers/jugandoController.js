document.addEventListener("DOMContentLoaded", function () {
  const userBoard = JSON.parse(localStorage.getItem("userBoard"));
  const machineBoard = JSON.parse(localStorage.getItem("machineBoard"));

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

  renderBoard(smallBoardContainer, userBoard, true, "user");
  renderBoard(largeBoardContainer, machineBoard, false, "machine");
});

function renderBoard(container, board, isSmall, boardType) {
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

      // Agregar eventos de clic solo al tablero de la máquina
      if (boardType === "machine") {
        cellElement.addEventListener("click", function () {
          handlePlayerShot(x, y, board, cellElement);
        });
      }

      boardElement.appendChild(cellElement);
    });
  });

  container.appendChild(boardElement);
}

function handlePlayerShot(x, y, board, cellElement) {
  if (board[x][y] === "p2") {
    board[x][y] = "p2-h"; // Golpe exitoso
    cellElement.style.backgroundColor = "red";
  } else if (board[x][y] === "a") {
    board[x][y] = "b"; // Agua
    cellElement.style.backgroundColor = "grey";
  }

  // Verificar si el barco está completamente destruido
  if (isShipDestroyed(board, "p2", "p2-h")) {
    colorDestroyedShip(board, "p2-h", "orange");
  }

  console.log("JSON actualizado del tablero de la máquina:", board);

  // Turno de la máquina
  handleMachineShot();
}

function handleMachineShot() {
  const userBoard = JSON.parse(localStorage.getItem("userBoard"));
  const size = userBoard.length;

  let shotFired = false;
  while (!shotFired) {
    const x = Math.floor(Math.random() * size);
    const y = Math.floor(Math.random() * size);

    if (userBoard[x][y] === "p1") {
      userBoard[x][y] = "p1-h"; // Golpe exitoso
      shotFired = true;
    } else if (userBoard[x][y] === "a") {
      userBoard[x][y] = "b"; // Agua
      shotFired = true;
    }
  }

  console.log("JSON actualizado del tablero del jugador:", userBoard);

  // Actualizar el tablero pequeño
  const smallBoardContainer = document.getElementById("smallBoard");
  renderBoard(smallBoardContainer, userBoard, true, "user");
}

function isShipDestroyed(board, ship, hit) {
  return !board.some((row) => row.includes(ship));
}

function colorDestroyedShip(board, hit, color) {
  board.forEach((row, x) => {
    row.forEach((cell, y) => {
      if (cell === hit) {
        const cellElement = document.getElementById(`${x},${y}`);
        if (cellElement) cellElement.style.backgroundColor = color;
      }
    });
  });
}
