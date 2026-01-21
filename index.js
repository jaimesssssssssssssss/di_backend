// Importar libreria para manejo de ficheros de configuración dependiendo de la variable de entorno NODE_ENV
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

// Importar fichero de configuración con variables de entorno
const config = require("./config/config");
// Importar librería express --> web server
const express = require("express");
// Importar librería path, para manejar rutas de ficheros en el servidor
const path = require("path");
// Importar libreria CORS
const cors = require("cors");
// Importar librería de manejo de cookies
const cookieParser = require("cookie-parser");
// Importar rutas de la API
const sagaRoutes = require("./routes/sagaRoutes");
const peliculaRoutes = require("./routes/peliculaRoutes");



const app = express();

// Middleware para analizar JSON en las solicitudes
app.use(express.json());

// Configuración CORS solo para desarrollo
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: ["http://localhost:5173", "http://localhost:8081"], // Frontend dev
      credentials: true,
    })
  );
}

// Middleware para análisis de cookies
app.use(cookieParser());

// --- RUTAS DE LA API ---
app.use("/api/sagas", sagaRoutes);
app.use("/api/peliculas", peliculaRoutes);


// --- ARCHIVOS ESTÁTICOS ---
// Servimos archivos estáticos según entorno
if (process.env.NODE_ENV !== "production") {
  console.log("Sirviendo ficheros de desarrollo");
  app.use(express.static(path.join(__dirname, "public/dev")));
} else {
  console.log("Sirviendo ficheros de producción");
  app.use(express.static(path.join(__dirname, "public/prod")));
}

// --- FALLBACK SPA ---
// Solo si la ruta no empieza por /api
app.use((req, res, next) => {
  if (!req.path.startsWith("/api")) {
    const indexFile =
      process.env.NODE_ENV !== "production"
        ? path.join(__dirname, "public/dev", "index.html")
        : path.join(__dirname, "public/prod", "index.html");
    res.sendFile(indexFile);
  } else {
    next();
  }
});

// --- INICIAR SERVIDOR ---
if (process.env.NODE_ENV !== "test") {
  app.listen(config.port, () => {
    console.log(`Servidor escuchando en el puerto ${config.port}`);
  });
}

// Exportar la aplicación para pruebas
module.exports = app;
