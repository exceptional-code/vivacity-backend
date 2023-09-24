/*
    api module to potentially import/export modules, but at
    least export this index content to be used in server.use()
    in ./dist/server/index.js (i.e., ./src/server/index.ts)
*/

// imports
import { Request, Response, Router } from 'express';
// store default export into developerRouter
import developerRouter from './developer';

// initialization
const apiRouter: Router = Router();

// environment
apiRouter.use('/awesome/developer', developerRouter);
// check status route
apiRouter.get('/status', (req: Request, res: Response) => {
    res.send({
        healthy: true
    });
});

//exports
export {
    apiRouter
}