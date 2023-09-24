/*
    initialize the information in the database. don't
    assume the individual downloading this repo has the
    same database.
*/

// imports
import {
    client,
    Developer,
    Types
} from './index';

async function buildTable() {
    /*
        this function builds the table for the new database
    */

    // handle connecting client to database
    try {
        client.connect();
    } catch (error) {
        console.log('Error connecting client to database!\n', error);
    }

    // handle building table
    try {
        // handle dropping table
        try {
            await client.query(`
                DROP TABLE IF EXISTS developer_info;
            `);
        } catch (error) {
            throw new Error('error dropping table.');
        };

        // handle creating table
        try {
            await client.query(`
                CREATE TABLE developer_info (
                    id SERIAL PRIMARY KEY,
                    "firstName" varchar(255) NOT NULL,
                    "lastName" varchar(255) NOT NULL,
                    description varchar(1000) NOT NULL
                );
            `)
        } catch (error) {
            throw new Error('error creating table.');
        };
    } catch (error) {
        error instanceof Error ?
            console.log('Table process failure:', error.message + '\n', error)
        :   console.log('Table process failure: an unknown error occurred.')
    };
};

async function seedData() {
    /*
        this function seeds the data in the table of the database
    */

    // create a developer object to seed a table in the database with
    const devObj: Types.DeveloperObject = {
        firstName: 'Bryce',
        lastName: 'Malmberg',
        description: 'I am a husband and father of two beautiful and inquisitive children. My academic and professional experience is as a Full-stack Software Engineer, proficient in the PERN stack, JavaScript, HTML, CSS, and with supplementary experience in TypeScript and Python.'
    };

    // seed the developer data with a query
    await Developer.queryTransaction(async (client) => {await Developer.seedDeveloper(devObj)});
};

// handle data creation flow
buildTable()
    .then(seedData)
    .finally(() => client.end())