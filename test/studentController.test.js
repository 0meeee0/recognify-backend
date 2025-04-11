const request = require('supertest');
const app = require('../server');

describe('Student API Tests', () => {
  it('GET /students should return a non-empty array', async () => {
    const response = await request(app).get('/api/students').expect(200);
    
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('POST /attendance/mark should fail when no image is provided', async () => {
    const response = await request(app).post('/api/attendance/mark').expect(400);
    
    expect(response.text).toBe('Image is required');
  });
});
