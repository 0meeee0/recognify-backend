const request = require('supertest');
const app = require('../server');

describe('Student API Tests', () => {

  it('POST /attendance/mark should fail when no image is provided', async () => {
    const response = await request(app).post('/api/attendance/mark').expect(400);
    
    expect(response.text).toBe('Image is required');
  });
});
