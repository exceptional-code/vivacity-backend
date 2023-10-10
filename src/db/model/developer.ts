/*
    this module only needs 3 methods: something to seed
    the developer data by creating it, something to
    query the developer data, and something to handle
    database transactions.
*/

//imports
import {
    client,
    Types
} from '../';

const queryTransaction = async <T>(queryFunction: (client: Types.Client) => Promise<T>): Promise<T> => {
    /*
        this is a helper function that accepts a query function, handles
        transactional behavior, and returns the result.
    */
    try {
        await client.query(`BEGIN;`);
        const result = await queryFunction(client);
        await client.query(`COMMIT;`);

        return result;
    } catch (error) {
        // roll the data back before throwing the error
        await client.query(`ROLLBACK;`);
        throw error;
    };
};

const seedDeveloper = async (devObj: Types.DeveloperObject): Promise<void> => {
    /*
        this function creates a new developer in the database.
        upon error it rolls back any failed or partial insertion
        of data into the database.
    */

    try {
        await client.query(`
            INSERT INTO developer_info("firstName", "lastName", description)
            VALUES ($1, $2, $3);
        `, [devObj.firstName, devObj.lastName, devObj.description]);
    } catch (error) {
        console.log('Seed new developer failed!\n', error);
    };
};

const updateDeveloper = async (fields: Types.DeveloperUpdate): Promise<void> => {
    /*
        this function updates the developer entry in the database
    */
    const setString: string = Object.keys(fields)
        .map((key: string, index: number) => `"${key}"=$${index + 1}`)
        .join(',');

    if (setString.length === 0 ) {
        return;
    };

    try {
        await client.query(`
            UPDATE developer_info
            SET ${setString};
        `, Object.values(fields));
    } catch (error) {
        console.log('Update developer failed!\n', error);
    };
};

const deleteDeveloper = async (): Promise<void> => {
    /*
        this function deletes the developer entry in the database
    */

    // re-use the fetchDeveloper function to fetch and store the developer
    const devObj: Types.DeveloperObject | null = await queryTransaction(async (client) => {
        
        return await fetchDeveloper()
    });

    if (devObj) {
        try {
            // delete the rows for developer
            await client.query(`
                DELETE FROM developer_info
                WHERE id = $1;
            `, [devObj.id])
        } catch (error) {
            console.log('Delete developer failed!\n', error);
        };
    } else {
        console.log(`Developer: ${devObj}\nDeveloper not found.`);
    };
};

const fetchDeveloper = async (): Promise<Types.DeveloperObject | null> => {
    /*
        this function fetches the developer
    */
    try {
        const { rows } = await client.query<Types.DeveloperObject>(`
            SELECT *
            FROM developer_info;
        `);

        if (rows.length > 0) {
            const devObj = rows[0];

            return devObj;
        } else {

            return null;
        }
    } catch (error) {
        console.log('Fetch developer info failed!\n', error);
        
        return null;
    };
};

export {
    queryTransaction,
    seedDeveloper,
    updateDeveloper,
    deleteDeveloper,
    fetchDeveloper
}