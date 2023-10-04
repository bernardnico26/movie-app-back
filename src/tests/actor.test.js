const request = require('supertest');
const app = require('../app');
require('../models');

let id;

test('GET /actors debe traer todos los actores', async () => {
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /actors debe crear un actor', async () => {
    const actors = { 
        firstName : "Jim",
        lastName: "Parson",
        nationality: "usa",
        image: "https://www.jimparson.com/image",
        birthday: "1974-12-01" }
    const res = await request(app)
    .post('/actors')
    .send(actors);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(actors.firstName);
});

test('PUT /actors/:id debe actualizar un actor', async () => {
    const actorUpdated = {
        firstName : "Jim update"
    }
    const res = await request(app)
    .put(`/actors/${id}`)
    .send(actorUpdated);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(actorUpdated.firstName);
});

test('DELETE /actors/:id debe eliminar un actor', async () => {
    const res = await request(app)
    .delete(`/actors/${id}`);
    expect(res.status).toBe(204);
})