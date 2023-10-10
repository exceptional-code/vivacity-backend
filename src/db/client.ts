/*
    create the pg client to connect the database to the
    server.
*/

// imports
import dotenv from 'dotenv';
import { Client } from 'pg';

// environment
dotenv.config();

// initialization
// use the Client class of pg as a type
let client: Client;
const DB_URL: string = process.env.DATABASE_URL ?? `postgres://localhost:5432/dev_vivacity_db`;
if (process.env.CI) {
    client = new Client({
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: 'postgres',
        database: 'dev_vivacity_db'
    })
} else {
    client = new Client(DB_URL);
}

// exports
export default client;