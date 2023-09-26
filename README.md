## Note on Scripts
- npm test: Re-seed the database and execute the in-house Jest testing suite.
- npm run seed: Build the tables in the database and seed them. An empty database itself will still need to be created before this step.
- npm run dev: Run the TypeScript modules in development mode without compiling to JavaScript.
- npm run start: Transpile TypeScript modules into JavaScript and run the server with nodemon to auto-restart.

## Note on Endpoints
I created two endpoints:
- "awesome/developer"
- "awesome/developer/new"
The majority of CRUD operations are performed using the former, without the use of params being passed after "developer".

The reason for this was to limit the number of developers that could be created to one in this project, since one developer created it.

## Note on Jest Tests
Rather than using an abstraction layer or dependency injections for testing my API requests and PSQL query functions, I decided to use the database that is seeded via the "npm run build" command. My choice was in order to simplify the testing suite and also because I originally intended the database to be for development purposes. Hence its name "dev_vivacity_db".

## Error Handling
I opted not to have global error handling through middleware. This was just a personal choice but could also be changed if necessary.

## Hurdles
I encountered several hurdles, including the following:

- I found it difficult to pass the proper scope of client to queryTransaction() in src/db/model/developer.ts. Without the properly scoped client connection, the Developer.queryTransaction() method could have unintended consequences.
- Knowing when and when not to rewrite code to eliminate TypeScript warnings was also a learning process.
- Configuring the tsconfig.json to get my modules to import and export properly while running my code with ts-node was a challenge. I eventually found that if I deleted the "type": "module" in my package.json and changed the "module": "ES2020" to "module": "CommonJS" in my tsconfig.json all imports and exports worked properly. This was because "type": "module" makes Node treat all my .js files as ESM instead of CommonJS modules, which is the module system that is the most well-established and supported. Then by changing to "module": "CommonJS", I was telling Node to interpret my module system like it was the CommonJS module system. If I kept "module": "ES2020" Node's expectation of how my module imports and exports should be written might not align with how they are written. So CommonJS acted as a good baseline.