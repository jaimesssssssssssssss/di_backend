const request = require("supertest");
const app = require("../index");

describe("🎥 Pruebas de API - Películas", () => {
  let sagaId;
  let peliculaId;

  beforeAll(async () => {
    // Creamos una saga para asociar la película
    const res = await request(app)
      .post("/api/sagas")
      .send({
        nombre: "Saga para películas",
        descripcion: "Descripción",
        fecha_inicio: "2023-01-01",
        activa: 1,
      });
    sagaId = res.body.data.id;
  });

  test("✅ Crear película", async () => {
    const res = await request(app)
      .post("/api/peliculas")
      .send({
        titulo: "Película de prueba",
        duracion: 120,
        fecha_estreno: "2023-01-01",
        recaudacion: 1000000,
        saga_id: sagaId,
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.data.titulo).toBe("Película de prueba");
    peliculaId = res.body.data.id;
  });

  test("✅ Obtener todas las películas", async () => {
    const res = await request(app).get("/api/peliculas");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test("✅ Obtener película por ID", async () => {
    const res = await request(app).get(`/api/peliculas/${peliculaId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data.id).toBe(peliculaId);
  });

  test("❌ Obtener película inexistente (404)", async () => {
    const res = await request(app).get("/api/peliculas/999999");
    expect(res.statusCode).toBe(404);
  });

  test("✅ Actualizar película", async () => {
    const res = await request(app)
      .put(`/api/peliculas/${peliculaId}`)
      .send({
        titulo: "Película actualizada",
        duracion: 130,
        fecha_estreno: "2023-01-02",
        recaudacion: 2000000,
        saga_id: sagaId,
      });
    expect(res.statusCode).toBe(204);
  });

  test("❌ Actualizar película inexistente (404)", async () => {
    const res = await request(app)
      .put("/api/peliculas/999999")
      .send({
        titulo: "Inexistente",
        duracion: 100,
        fecha_estreno: "2023-01-01",
        recaudacion: 0,
        saga_id: sagaId,
      });
    expect(res.statusCode).toBe(404);
  });

  test("✅ Eliminar película", async () => {
    const res = await request(app).delete(`/api/peliculas/${peliculaId}`);
    expect(res.statusCode).toBe(204);
  });

  test("❌ Eliminar película inexistente (404)", async () => {
    const res = await request(app).delete("/api/peliculas/999999");
    expect(res.statusCode).toBe(404);
  });

  afterAll(async () => {
    // Limpiamos la saga creada
    await request(app).delete(`/api/sagas/${sagaId}`);
  });
});
