import express from 'express';

import database from './helpers/database.js';
import errors from './helpers/errors.js';

import planetsRoutes from './routes/planetsRoutes.js';
import elementsRoutes from './routes/elementsRoutes.js';
import experimentsRoutes from './routes/experimentsRoutes.js';
import explorationsRoutes from './routes/explorationsRoutes.js';

const app = express();

database(app);

app.use(express.json());

//http://localhost:5600/premiere
app.get('/premiere', (req, res, next) => {

    res.status(200); //Code de réponse 200 = OK
    res.set('Content-Type', 'text/plain'); //Réponse en format text
    res.send('Notre première route avec Express');

});

//http://localhost:5600/somme?a=2&b=10
app.get('/somme2', (req, res, next) => {

    const a = parseInt(req.query.a, 10);
    const b = parseInt(req.query.b, 10);

    const somme = a + b;

    res.status(200);
    res.set('Content-Type', 'text/html');
    res.send(`<html><strong>${somme}</strong></html>`);

});

/*app.get('/:operation', (req, res, next) => {

    const operation = req.params.operation;

    let result = 0;

    switch(operation) {
        case 'somme':
            result = a+b;
            break;
        case 'difference':
            result = a-b;
            break;
        case 'produit':
            result = a*b;
            break;
        case 'quotient':
            result = a/b;
            break;
        case 'reste':
            result = a%b;
            break;
    }

    res.status(200);
    res.set('Content-Type', 'text/html');
    res.send(`<html><strong>${result}</strong></html>`);

});*/

app.use('/experiments', experimentsRoutes);
app.use('/planets', planetsRoutes); // Ajout des routes présentes dans PlanetsRoutes dans notre serveur
app.use('/elements', elementsRoutes);
app.use('/explorations', explorationsRoutes);

app.use('*', errors);

export default app;
