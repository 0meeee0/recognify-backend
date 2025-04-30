const request = require('supertest');
const app = require('../server');
const Category = require('../model/Category');


describe('Category API Tests', () => {
  let createdCategoryId;

  it('POST /category should create a new category', async () => {
    const res = await request(app)
      .post('/api/category')
      .send({ name: 'Test Category' });


    expect(res.status).toBe(201)
    expect(res.body.name).toBe('Test Category');
    createdCategoryId = res.body._id;
  });

  it('GET /category should get all categories', async () => {
    const res = await request(app).get('/api/category');
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true);
  });


  it('GET /category/:id should return a category by ID', async () => {
    const res = await request(app).get(`/api/category/${createdCategoryId}`);
    expect(res.status).toBe(200)
    expect(res.body.name).toBe('Test Category'); 
  });

  it('PUT /category/:id should update a category', async () => {
    const res = await request(app)
      .put(`/api/category/${createdCategoryId}`)
      .send({ name: 'Updated Category' });

    expect(res.status).toBe(200)
    expect(res.body.name).toBe('Updated Category');
  });

  it('DELETE /category/:id should delete the category', async () => {
    const res = await request(app).delete(`/api/category/${createdCategoryId}`);
    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Deleted successfully');
  });
});
