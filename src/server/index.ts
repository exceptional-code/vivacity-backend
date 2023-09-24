/*
    Express server code will go here, properly formatted
    for TypeScript.
*/

// imports
import express from 'express';
import { client } from '../db';
import { apiRouter } from '../api';

// initialization
const server: express.Application = express();
// change PORT from environment variables into an integer
const PORT: number = parseInt(process.env.PORT ?? "4000", 10);

// environment
// convert all json data into js objects for manipulation by the server
server.use(express.json())
// use middleware routes from our api folder
server.use('/', apiRouter);
// start the server listening for client connections
const handle: ReturnType<typeof server.listen> = server.listen(PORT, async (): Promise<void> => {
    console.log(`Server is running on ${PORT}!`);

    try {
        await client.connect();
        console.log('Database connected to handle requests!');
    } catch (error) {
        console.log('Failed to connect to database!\n', error);
    };
});

export {
    server,
    handle
}