export class GameManager {
  constructor(userBoard, machineBoard, renderBoardCallback) {
    this.userBoard = userBoard;
    this.machineBoard = machineBoard;
    this.renderBoardCallback = renderBoardCallback;
    this.currentTurn = "user"; // El usuario comienza el juego
    this.machineShips = this.initializeShipTracking(machineBoard, "p2");
    this.score = 0; // Inicializar puntaje
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
      this.score += 10; // Sumar puntos por acierto
      this.updateScoreDisplay();
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
      const penalty = this.calculatePenalty(x, y);
      this.score += penalty; // Restar puntos por fallo
      this.updateScoreDisplay();
      this.machineBoard[x][y] = "b"; // Agua
      this.renderBoardCallback("machine", this.machineBoard);
      this.showTemporaryMessage("¡Fallaste! Turno de la máquina.", "danger");
      this.currentTurn = "machine";
      this.handleMachineTurn();
    }
  }

  calculatePenalty(x, y) {
    const directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];
    for (const [dx, dy] of directions) {
      const nx = x + dx,
        ny = y + dy;
      if (this.machineBoard[nx]?.[ny] === "p2") {
        return -3; // Penalización por estar cerca de un barco
      }
    }
    return -1; // Penalización estándar
  }

  updateShipStatus(ships, x, y) {
    for (const ship of ships) {
      const part = ship.find((p) => p.x === x && p.y === y);
      if (part) {
        part.hit = true;

        // Verificar si todas las partes del barco han sido golpeadas
        const isDestroyed = ship.every((p) => p.hit);
        if (isDestroyed) {
          console.log("Haz destruido un barco");
        }

        // Verificar si todos los barcos han sido destruidos
        const allShipsDestroyed = ships.every((ship) =>
          ship.every((part) => part.hit)
        );
        if (allShipsDestroyed) {
          this.endGame("¡Has ganado la partida!");
        }
        break;
      }
    }
  }

  endGame(message) {
    // Mensaje de victoria
    alert(message);

    // Obtener el contenedor donde colocaremos el botón
    const gameEndContainer = document.getElementById("gameEndContainer");
    if (!gameEndContainer) {
      console.error("No se encontró el contenedor gameEndContainer");
      return;
    }

    // Limpiar el contenedor por si acaso
    gameEndContainer.innerHTML = "";

    // Crear mensaje de victoria
    const victoryMessage = document.createElement("div");
    victoryMessage.className = "alert alert-success text-dark";
    victoryMessage.textContent = message;
    gameEndContainer.appendChild(victoryMessage);

    // Crear botón "Jugar de nuevo"
    const playAgainButton = document.createElement("button");
    playAgainButton.className = "btn btn-primary mt-3";
    playAgainButton.textContent = "Jugar de nuevo";
    gameEndContainer.appendChild(playAgainButton);

    // Crear botón "Salir"
    const exitButton = document.createElement("button");
    exitButton.className = "btn btn-danger mt-3 ms-2";
    exitButton.textContent = "Salir";
    gameEndContainer.appendChild(exitButton);

    // Obtener datos del jugador
    const nickname = localStorage.getItem("nickname");
    const nation = localStorage.getItem("selectedCountry");

    if (!nickname || !nation) {
      console.error(
        "Error: No se encontraron los datos de nickname o país (selectedCountry)."
      );
      return;
    }

    // Asignar eventos a los botones
    playAgainButton.addEventListener("click", () => {
      this.sendScoreToBackend(() => {
        console.log("Botón presionado. Redirigiendo...");
        window.location.href = `game.html?nickname=${encodeURIComponent(
          nickname
        )}&nation=${encodeURIComponent(nation)}`;
      });
    });

    exitButton.addEventListener("click", () => {
      this.sendScoreToBackend(() => {
        console.log("Saliendo del juego...");
        window.location.href = "index.html";
      });
    });

    // Opcional: Desplazarse automáticamente al botón
    gameEndContainer.scrollIntoView({ behavior: "smooth" });
  }

  sendScoreToBackend(callback) {
    const nickname = localStorage.getItem("nickname");
    const countryCode = localStorage.getItem("selectedCountry");

    if (!nickname || !countryCode) {
      console.error("Faltan datos para enviar el puntaje.");
      return;
    }

    fetch("http://127.0.0.1:5000/score-recorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nick_name: nickname,
        score: this.score,
        country_code: countryCode,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al enviar el puntaje.");
        }
        console.log("Puntaje enviado exitosamente.");
        if (callback) callback(); // Ejecutar el callback después de enviar el puntaje
      })
      .catch((error) => console.error(error));
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

  updateScoreDisplay() {
    const scoreDisplay = document.getElementById("score-display");
    if (scoreDisplay) {
      scoreDisplay.textContent = `Puntaje: ${this.score}`;
    }
  }
}
