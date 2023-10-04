const request = require('supertest');
const app = require('../app');
const Genre = require('../models/Genres');
const Actors = require('../models/Actors');
const Directors = require('../models/Directors');
require('../models');

let id;

test('GET /movies debe traer todas las peliculas', async () => {
  const res = await request(app)
  .get('/movies');
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test('POST /movies debe crear una pelicula', async () => {
  const movie = {
    name: "soy leyenda",
    image: 'https://image.jpg',
    releaseYear: 2007,
    synopsis: "Lorem ipsum dolor sit amet, consectetur"
  }
  const res = await request(app)
  .post('/movies')
  .send(movie);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.name).toBe(movie.name);
});

test('PUT /movies/:id debe actualizar una pelicula', async () => {
  const movieUpdated = {
    name: "soy leyenda updated"
    }
  const res = await request(app)
  .put(`/movies/${id}`)
  .send(movieUpdated);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(movieUpdated.name);
});

test('POST /movies/:id/genres debe insertar los géneros de una pelicula', async () => {
    const genre = await Genre.create({ name: "drame" });
    const res = await request(app)
      .post(`/movies/${id}/genres`)
      .send([genre.id]);
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
  });

  test('POST /movies/:id/actors debe insertar los actores de una pelicula', async () => {
    const actor = await Actors.create({ 
      firstName : "Jim",
      lastName: "Parson",
      nationality: "usa",
      image: "https://www.jimparson.com/image",
      birthday: "1974-12-01" });
    const res = await request(app)
      .post(`/movies/${id}/actors`)
      .send([actor.id]);
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
  });

  test('POST /movies/:id/directors debe insertar los directores de una pelicula', async () => {
    const director = await Directors.create({ 
      firstName : "Steven",
      lastName: "Spielberg",
      nationality: "usa",
      image: "https://www.spielberg.com/image",
      birthday: 1946-18-12 });
    const res = await request(app)
      .post(`/movies/${id}/directors`)
      .send([director.id]);
    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
  });

test('DELETE /movies/:id debe eliminar una pelicula', async() => {
  const res = await request(app)
  .delete(`/movies/${id}`);
  expect(res.status).toBe(204);
});

