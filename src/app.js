import express from 'express';

const app = express();

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

app.get('/:operation', (req, res, next) => {

    const operation = req.params.operation;

    let resultat = 0;

    //Operation = somme (+)
    //            difference (-)    
    //            produit (*)
    //            quotient (/)
    //            reste (%)

    console.log(operation);

    res.status(200);
    res.set('Content-Type', 'text/html');
    res.send(`<html><strong>${resultat}</strong></html>`);

});

export default app;
