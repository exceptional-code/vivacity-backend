// imports
import {
    Request,
    Response,
    Router
} from 'express';
import {
    Developer,
    Types,
    client
} from '../db';

// initialization
// create the router to get developer data
const developerRouter: Router = Router();

// single request form for the single route: awesome/developer/new
developerRouter.post('/new', async (req: Request, res: Response) => {
    // (C)RUD: Create
    const originalGangster: Types.DeveloperObject | null = await Developer.queryTransaction(async (client) => {
            
        return await Developer.fetchDeveloper()
    });

    if (originalGangster) throw new Error('There can be only one awesome developer.');

    const { firstName, lastName, description }: Types.DeveloperObject = req.body;
    const devObj: Types.DeveloperObject = {
        firstName: firstName,
        lastName: lastName,
        description: description
    };
    
    try {
        await Developer.queryTransaction(async (client) => { await Developer.seedDeveloper(devObj) });
        res.status(200).send('Developer successfully created!');
    } catch (error) {
        console.log('Post request to API failed!\n', error);

        res.status(500).send('Internal server error!');
    };
});

// modularized request form for the single route: awesome/developer/
developerRouter.route('/')
    // C(R)UD: Read
    .get(async (req: Request, res: Response) => {
        try {
            // fetch the developer (in this case only one with no name or id destructured from params)
            const devObj: Types.DeveloperObject | null = await Developer.queryTransaction(async (client) => {
                
                return await Developer.fetchDeveloper()
            });
            
            devObj ? res.status(200).send(devObj) : res.status(404).send('Developer not found.');
        } catch (error) {
            console.log('Get request to API failed!\n', error);
            
            res.status(500).send('Internal server error!');
        };
    })
    // CR(U)D: Update
    .patch(async (req: Request, res: Response) => {
        const { id, firstName, lastName, description }: Types.DeveloperUpdate = req.body;

        let fields: Types.DeveloperUpdate = {};
        if (id) fields.id = id;
        if (firstName) fields.firstName = firstName;
        if (lastName) fields.lastName = lastName;
        if (description) fields.description = description;

        try {
            await Developer.queryTransaction(async (client) => { await Developer.updateDeveloper(fields) });
            res.status(200).send('Developer successfully updated!');
        } catch (error) {
            console.log('Patch request to API failed!\n', error);
            
            res.status(500).send('Internal server error!');
        };
    })
    // CRU(D): Delete
    .delete(async (req: Request, res: Response) => {
        try {
            // delete the developer entry in the database table
            await Developer.queryTransaction(async (client) => { await Developer.deleteDeveloper() });
            res.status(200).send('Developer successfully deleted!');
        } catch (error) {
            console.log('Delete request to API failed!\n', error);

            res.status(500).send('Internal server error!');
        };
    });

// exports
export default developerRouter;