/*
    this is the types declaration module
*/

// imports
import { Client } from 'pg';

interface DeveloperObject {
    id?: number,
    firstName: string,
    lastName: string,
    description: string
};

interface DeveloperUpdate {
    id?: number,
    firstName?: string,
    lastName?: string,
    description?: string
};

// exports
export {
    Client,
    DeveloperObject,
    DeveloperUpdate
}