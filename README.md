# Enterprise Pokedex CRUD Application

This is a CRUD application designed to emulate a Pokedex designed for the Enterprise Application Development Project. The frontend is written in Angular with Angular Material.
The backend with Node & Express JS frameworks.

## Development

To run the frontend enter the frontend folder and run the following command.

```bash
npm start
```

To run the backend, enter the backend folder and create a .env file to provide the necessary configuration values.
```bash
MONGODB_URL=
JWT_KEY=
PORT=3000
LOG_LEVEL=info
LIMIT=20
```
You may then use the transform.py script to create the pokemon-final.json which can be imported using 
```bash
mongoimport --uri <url> -j 4 --collection pokemons  --jsonArray  --drop --file pokemon-final.json
```
Then run 
```bash
npm start
```

## Deployment
### Frontend
To deploy the frontend fully run
```bash
npm build
```
Then take the output directory and serve from the webserver of your choosing.

### Backend 

To deploy run

```bash
npm build
```
Then take output and deploy on any hosting provider.
