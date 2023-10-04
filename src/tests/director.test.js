const request = require('supertest');
const app = require('../app');
require('../models');

let id;

test('GET /directors debe traer todos los directores', async () => {
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /directors debe crear un director', async () => {
    const directors = { 
        firstName : "Steven",
        lastName: "Spielberg",
        nationality: "usa",
        image: "https://www.spielberg.com/image",
        birthday: 1946-18-12 }
    const res = await request(app)
    .post('/directors')
    .send(directors);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(directors.firstName);
});

test('PUT /directors/:id debe actualizar un director', async () => {
    const directorUpdated = {
        firstName : "Steven update"
    }
    const res = await request(app)
    .put(`/directors/${id}`)
    .send(directorUpdated);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(directorUpdated.firstName);
});

test('DELETE /directors/:id debe eliminar un director', async () => {
    const res = await request(app)
    .delete(`/directors/${id}`);
    expect(res.status).toBe(204);
})