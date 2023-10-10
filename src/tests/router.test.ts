// imports
import {
    server,
    handle
} from '../server';
import {
    client, Types
} from '../db';
import {
    Test,
    SuperTest
} from 'supertest';
import supertest from 'supertest';

// initialize
const request: SuperTest<Test> = supertest(server);

// test suite
describe('Server', () => {
    it('should show a status of { healthy: true }', async () => {
        const res = await request.get('/status');
        expect(res.status).toBe(200);
        expect(res.body.healthy).toBe(true);
    });
    it('should successfully request developer data', async () => {
        const res = await request.get('/awesome/developer/');
        expect(res.status).toBe(200);
    });
    it('should successfully update developer data', async () => {
        const res = await request.patch('/awesome/developer/');
        expect(res.status).toBe(200);
    });
    it('should successfully delete developer', async () => {
        const res = await request.delete('/awesome/developer/');
        expect(res.status).toBe(200);
    });
    it('should successfully create developer', async () => {
        const body: Types.DeveloperObject = {
            id: 1,
            firstName: 'Oscar',
            lastName: `Mayer`,
            description: 'I have a way with B-A-C-K-E-N-D.'
        };
        const res = await request
            .post('/awesome/developer/new')
            .send(body)
        expect(res.status).toBe(200);
    });

    afterAll(async () => {
        // close connection to database
        await client.end();
        // close server
        handle.close();
    });
});