https://github.com/sebas-1610/batalla_naval.git

ESTRUCTURA DEL PROYECTO (MODELO-VISTA-CONTROLADOR)

/naval-battle-game/
│
├── /assets/                  # Carpeta para recursos estáticos (imágenes, íconos, fuentes, etc.)
│   ├── /images/              # Imágenes del juego (barcos, banderas, fondos, etc.)
│   ├── /icons/               # Íconos pequeños (como íconos de clima, botones, etc.)
│   └── /fonts/               # Fuentes personalizadas (si las usas)
│
├── /controllers/             # Carpeta para los controladores (lógica del juego)
│   ├── gameController.js     # Controlador para la lógica del juego (turnos, disparos, etc.)
│   ├── apiController.js      # Controlador para manejar las llamadas a APIs (clima, países, ranking)
│   └── scoreController.js    # Controlador para manejar la puntuación y el ranking
│
├── /styles/                  # Carpeta para archivos CSS
│   ├── main.css              # Estilos principales del proyecto
│   ├── game.css              # Estilos específicos para la pantalla de juego
│   ├── ranking.css           # Estilos específicos para la pantalla de ranking
│   └── responsive.css        # Estilos para diseño responsive (opcional)
│
├── /views/                   # Carpeta para las vistas (archivos HTML)
│   ├── index.html            # Pantalla de inicio (nickname y selección de país)
│   ├── game.html             # Pantalla de juego (tablero, clima, mensajes)
│   └── ranking.html          # Pantalla de ranking (lista de jugadores con banderas)
│
├── /utils/                   # Carpeta para funciones utilitarias
│   └── helpers.js            # Funciones auxiliares (validaciones, generación de mapas, etc.) Aquí puedes colocar funciones como:
                                Validaciones de datos (por ejemplo, validar el tamaño del tablero).
                                Funciones para exportar los mapas.
                                Cualquier otra función auxiliar que necesites.

│
└── README.md                 # Archivo README principal del proyecto

Prototipado del proyecto: 
https://www.figma.com/design/HrOVv6cWQtd7YHC1RE1yr2/PROYECTO-BATALLA-NAVAL?node-id=0-1&t=8JVPuwvagX1jnh0L-1