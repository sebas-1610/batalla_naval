https://github.com/sebas-1610/batalla_naval.git

ESTRUCTURA DEL PROYECTO (MODELO-VISTA-CONTROLADOR)

/naval-battle-game/
├── /assets/
│   ├── /images/        # Imágenes del juego (barcos, banderas, fondos, etc.)
│   ├── /icons/         # Íconos pequeños (clima, botones, etc.)
│   └── /fonts/         # Fuentes personalizadas (si las usas)
├── /controllers/
│   ├── gameController.js  # Lógica del juego (turnos, disparos, etc.)
│   ├── apiController.js   # Manejo de llamadas a APIs
│   └── scoreController.js # Manejo de puntuación y ranking
├── /styles/
│   ├── main.css       # Estilos principales
│   ├── game.css       # Estilos de la pantalla de juego
│   ├── ranking.css    # Estilos de la pantalla de ranking
│   └── responsive.css # Diseño responsive (opcional)
├── /views/
│   ├── index.html     # Pantalla de inicio (nickname y selección de país)
│   ├── game.html      # Pantalla de juego (tablero, clima, mensajes)
│   └── ranking.html   # Pantalla de ranking (lista de jugadores con banderas)
├── /utils/
│   └── helpers.js     # Funciones auxiliares (validaciones, mapas, etc.)
└── README.md           # Archivo principal del proyecto

Prototipado del proyecto: 
https://www.figma.com/design/HrOVv6cWQtd7YHC1RE1yr2/PROYECTO-BATALLA-NAVAL?node-id=0-1&t=8JVPuwvagX1jnh0L-1
