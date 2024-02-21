import request from 'supertest';
import { app } from '../../../src/server';
import { Image } from '../../../src/models';

describe('upload.images.ts', () => {
  describe('When post on upload route', () => {
    console.log = jest.fn();
    Image.create = jest.fn().mockResolvedValue({});

    it('with valid input. Should return status code 201', async () => {
      const res = await request(app)
        .post('/upload')
        .send({ urls: ['data:image/base64.code'] });

      expect(res.statusCode).toEqual(201);
    });

    it('with invalid input. Should return status code 400', async () => {
      const res = await request(app)
        .post('/upload')
        .send({ urls: [''] });

      expect(res.statusCode).toEqual(400);
    });
  });
});
