const request = require('supertest');
const createServer = require('../../server');
const app = createServer();

describe('POST /get-full-to-tiny', () => {
        

    describe('given a full url address', () => {

        test('should respond with a 200 status code', async () => {
                const response = await request(app).post('/get-full-to-tiny').send({ url: 'https://en.wikipedia.org/wiki/Node.js' });
                expect(response.statusCode).toBe(200);
        })

        test('should respond with a 500 status code if the given url is Invalid', async () => {
                const response = await request(app).post('/get-full-to-tiny').send({ url: 'Do some bad things...' });
                expect(response.statusCode).toBe(500);
                expect(response.text).toEqual('Invalid Url (HTTPS / HTTP protocols only)');
        })

        test("should respond with a 500 status code if the given url  don't points to a valid site", async () => {
                const response = await request(app).post('/get-full-to-tiny').send({ url: "https://don't-points-to-a-valid-site.com" });
                expect(response.statusCode).toBe(500);
                expect(response.text).toEqual("The given URL don't points to a valid site");
        })

        test('should respond with a 500 status code if the given url is tiny url', async () => {
                const response = await request(app).post('/get-full-to-tiny').send({ url: 'https://tinyurl.com/6grqkxw' });
                expect(response.statusCode).toBe(500);
                expect(response.text).toEqual('Please enter full url address');
        })      

    })

});

describe('POST /get-tiny-to-full', () => {

    describe('given a tiny url address', () => {

        test('should respond with a 200 status code', async () => {
                const response = await request(app).post('/get-tiny-to-full').send({ url: 'https://tinyurl.com/6grqkxw' });
                expect(response.statusCode).toBe(200);
        })

        test('should respond with a 500 status code if the given url is Invalid', async () => {
                const response = await request(app).post('/get-tiny-to-full').send({ url: 'Do some bad things...' });
                expect(response.statusCode).toBe(500);
                expect(response.text).toEqual('Invalid Url (HTTPS / HTTP protocols only)');
        })

        test('should respond with a 500 status code if the given url is full url', async () => {
                const response = await request(app).post('/get-tiny-to-full').send({ url: 'https://en.wikipedia.org/wiki/Node.js' });
                expect(response.statusCode).toBe(500);
                expect(response.text).toEqual('Please enter tiny url address');
        })      


    })

});

afterAll(async () => {
        await app.close();
        });


   