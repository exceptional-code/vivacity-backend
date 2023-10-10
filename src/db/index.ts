/*
    the code for the pg database client should go here and be
    exported and then imported into ./server/index.js
    (i.e. ./server/index.ts). the connection with the database
    will then be created with client.connect() within the
    server.listen() method call, ensuring that the database is
    ready for the server to interact with it as soon as possible
    and receive incoming requests.
*/

// imports
import client from './client';
import type * as Types from './types';
import { Developer } from './model';

// exports
export {
    client,
    Types,
    Developer
};