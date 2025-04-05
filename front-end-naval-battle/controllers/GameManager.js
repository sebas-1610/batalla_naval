export class GameManager {
  constructor(userBoard, machineBoard, renderBoardCallback) {
    this.userBoard = userBoard;
    this.machineBoard = machineBoard;
    this.renderBoardCallback = renderBoardCallback;
    this.currentTurn = "user"; // El usuario comienza el juego
    this.machineShips = this.initializeShipTracking(machineBoard, "p2");
  }

  initializeShipTracking(board, shipMarker) {
    const ships = [];
    const visited = new Set();

    board.forEach((row, x) => {
      row.forEach((cell, y) => {
        if (cell === shipMarker && !visited.has(`${x},${y}`)) {
          const ship = this.collectShipParts(board, x, y, shipMarker, visited);
          ships.push(ship);
        }
      });
    });

    return ships;
  }

  collectShipParts(board, x, y, shipMarker, visited) {
    const parts = [];
    const queue = [[x, y]];

    while (queue.length > 0) {
      const [cx, cy] = queue.shift();
      if (
        cx >= 0 &&
        cy >= 0 &&
        cx < board.length &&
        cy < board[0].length &&
        board[cx][cy] === shipMarker &&
        !visited.has(`${cx},${cy}`)
      ) {
        visited.add(`${cx},${cy}`);
        parts.push({ x: cx, y: cy, hit: false });

        // Agregar vecinos ortogonales (no diagonales)
        queue.push([cx + 1, cy]);
        queue.push([cx - 1, cy]);
        queue.push([cx, cy + 1]);
        queue.push([cx, cy - 1]);
      }
    }

    return parts;
  }

  handlePlayerShot(x, y) {
    if (this.currentTurn !== "user") return;

    const cell = this.machineBoard[x][y];
    if (cell === "p2") {
      this.machineBoard[x][y] = "p2-h"; // Golpe exitoso
      this.renderBoardCallback("machine", this.machineBoard);
      this.showTemporaryMessage(
        "¡Impacto! Puedes disparar de nuevo.",
        "success"
      );

      // Actualizar el estado del barco golpeado
      this.updateShipStatus(this.machineShips, x, y);

      console.log(
        "JSON actualizado del tablero de la máquina:",
        this.machineBoard
      );
    } else if (cell === "a") {
      this.machineBoard[x][y] = "b"; // Agua
      this.renderBoardCallback("machine", this.machineBoard);
      this.showTemporaryMessage("¡Fallaste! Turno de la máquina.", "danger");
      this.currentTurn = "machine";
      this.handleMachineTurn();
    }
  }

  updateShipStatus(ships, x, y) {
    for (const ship of ships) {
      const part = ship.find((p) => p.x === x && p.y === y);
      if (part) {
        part.hit = true;

        // Verificar si todas las partes del barco han sido golpeadas
        const isDestroyed = ship.every((p) => p.hit);
        if (isDestroyed) {
          // Eliminado: console.log("Haz destruido un barco");
        }
        break;
      }
    }
  }

  handleMachineTurn() {
    setTimeout(() => {
      const size = this.userBoard.length;
      let shotFired = false;

      while (!shotFired) {
        const x = Math.floor(Math.random() * size);
        const y = Math.floor(Math.random() * size);

        if (this.userBoard[x][y] === "p1") {
          this.userBoard[x][y] = "p1-h"; // Golpe exitoso
          shotFired = true;
          this.showTemporaryMessage(
            "¡La máquina impactó uno de tus barcos!",
            "danger"
          );
        } else if (this.userBoard[x][y] === "a") {
          this.userBoard[x][y] = "b"; // Agua
          shotFired = true;
          this.showTemporaryMessage("¡La máquina falló!", "success");
        }
      }

      console.log("JSON actualizado del tablero del jugador:", this.userBoard);
      this.renderBoardCallback("user", this.userBoard);

      // Cambiar el turno de vuelta al usuario
      this.currentTurn = "user";
    }, 1000); // Simular un pequeño retraso para el turno de la máquina
  }

  showTemporaryMessage(message, type) {
    const messageContainer = document.createElement("div");
    messageContainer.className = `alert alert-${type} text-center`;
    messageContainer.textContent = message;
    document.body.appendChild(messageContainer);

    setTimeout(() => {
      messageContainer.remove();
    }, 1500); // Eliminar el mensaje después de 1,5 segundos
  }
}
