const jsonServer = require('json-server');
const cors = require('cors');
const server = jsonServer.create();
const router = jsonServer.router('user-data.json'); // Cambia 'db.json' si tu base de datos tiene otro nombre.
const middlewares = jsonServer.defaults();

// Configuración personalizada
server.use(cors()); // Habilita CORS para todos los orígenes
server.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    console.log('Request headers:', req.headers);
    next();
});

// Rutas predeterminadas de JSON Server
server.use(middlewares);
server.use(router);

// Escucha en el puerto 3000 o cualquier otro que prefieras
server.listen(3000, () => {
    console.log('JSON Server is running on http://localhost:3000');
});
