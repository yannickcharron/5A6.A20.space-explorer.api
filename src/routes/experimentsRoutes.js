import fs from 'fs';
import express from 'express';

const router = new express.Router();

class ExperimentsRoutes {

    constructor() {
        router.get('/callback', this.callback);
        router.get('/sync', this.sync);
        router.get('/promise', this.promise);
        router.get('/exerciceA', this.exerciceA);
        router.get('/exerciceB', this.exerciceB);
    }

    sync(req, res, next) {
       
        try {
            const data = fs.readFileSync('./docs/test.txt'); //On ne fait pas cela
            console.log(data.toString());
            res.status(200).end();
        } catch(err) {
            console.log(err);
            res.status(500).end();
        }
    }

    callback(req, res, next) {

       fs.readFile('./docs/test.txt',(err, data) => {
        if(err) return console.log(err);
        console.log(data.toString());
       });

       console.log('Fin de la route');
       res.status(200).end();

    }

    async promise(req, res, next) {
        const data = await fs.readFile('./docs/test.txt');
        console.log(data.toString());
        res.status(200).end();

    }

    exerciceB(req, res, next) {

        console.log("1");
        setTimeout(() => {
            console.log("2");
            setTimeout(() => {
                console.log("3");
            }, 500);
            setTimeout(() => {
                console.log("4");
            }, 1500);
        }, 1000);

        setTimeout(() => {
            console.log("5");
            setTimeout(() => {
                setTimeout(() => {
                    console.log("6");
                    setTimeout(() => {
                        console.log("7");
                    }, 750);
                }, 1000);
                console.log("8");
            }, 500);
        }, 1000);

        setTimeout(() => {
            console.log("9");
        }, 1750);

        console.log("10");

        res.status(200).end();


       
    }

    exerciceA(req, res, next) {

        console.log("1");
        setTimeout(() => {
            console.log("2");
            setTimeout(() => {
                console.log("3");
                setTimeout(() => {
                    console.log("4");
                }, 500);
                console.log("5");
            }, 1000);
            console.log("6");
        }, 1000);

        console.log("7");

        setTimeout(() => {
            console.log("8");
        }, 1500);

        console.log("9");

        res.status(200).end();


    }
}

new ExperimentsRoutes();

export default router;