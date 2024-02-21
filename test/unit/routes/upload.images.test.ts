import request from 'supertest';
import { app } from '../../../src/server';
import { Image } from '../../../src/models';

describe('server.ts', () => {
  describe('When post on upload route', () => {
    console.log = jest.fn();
    Image.create = jest.fn().mockResolvedValue({});

    it('With valid input. Should return status code 201', async () => {
      const res = await request(app)
        .post('/upload')
        .send({ urls: ['data:image/base64.code'] });

      expect(res.statusCode).toEqual(201);
    });

    it('With invalid input. Should return status code 400', async () => {
      const res = await request(app)
        .post('/upload')
        .send({ urls: [''] });

      expect(res.statusCode).toEqual(400);
    });
  });
});
