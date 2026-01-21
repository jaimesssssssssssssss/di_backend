const request = require("supertest");
const app = require("../index");

describe("🎬 Pruebas de API - Sagas", () => {
  let sagaId; // Guardaremos el ID de la saga creada

  test("✅ Crear una nueva saga", async () => {
    const res = await request(app)
      .post("/api/sagas")
      .send({
        nombre: "Saga de prueba",
        descripcion: "Descripción de prueba",
        fecha_inicio: "2023-01-01",
        activa: 1,
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.data.nombre).toBe("Saga de prueba");
    sagaId = res.body.data.id;
  });

  test("✅ Obtener todas las sagas", async () => {
    const res = await request(app).get("/api/sagas");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test("✅ Obtener saga por ID", async () => {
    const res = await request(app).get(`/api/sagas/${sagaId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data.id).toBe(sagaId);
  });

  test("❌ Obtener saga inexistente (404)", async () => {
    const res = await request(app).get("/api/sagas/999999");
    expect(res.statusCode).toBe(404);
  });

  test("✅ Actualizar saga", async () => {
    const res = await request(app)
      .put(`/api/sagas/${sagaId}`)
      .send({
        nombre: "Saga actualizada",
        descripcion: "Descripción actualizada",
        fecha_inicio: "2023-01-01",
        activa: 0,
      });
    expect(res.statusCode).toBe(204);
  });

  test("❌ Actualizar saga inexistente (404)", async () => {
    const res = await request(app)
      .put("/api/sagas/999999")
      .send({
        nombre: "Inexistente",
        descripcion: "No existe",
        fecha_inicio: "2023-01-01",
        activa: 1,
      });
    expect(res.statusCode).toBe(404);
  });

  test("✅ Eliminar saga", async () => {
    const res = await request(app).delete(`/api/sagas/${sagaId}`);
    expect(res.statusCode).toBe(204);
  });

  test("❌ Eliminar saga inexistente (404)", async () => {
    const res = await request(app).delete(`/api/sagas/999999`);
    expect(res.statusCode).toBe(404);
  });
});
