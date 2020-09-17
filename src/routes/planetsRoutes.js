import express from 'express';
import error from 'http-errors';

import Planet from '../models/planet.js';

const router = express.Router();


class PlanetsRoutes {

    constructor() {
        
        router.get('/', this.getAll); // GET = SELECT sans Where = Retrieve
        router.get('/:idPlanet', this.getOne); // GET = SELECT avec Where = Retrieve
        router.post('/', this.post);  // POST = INSERT = Create
        router.put('/:idPlanet', this.put); // PUT = UPDATE = Update
        router.patch('/:idPlanet', this.patch); // PATCH = UPDATE Partiel = Update
        router.delete('/:idPlanet', this.delete); // DELETE = DELETE = Delete

    }

    async getAll(req, res, next) {

        try {
            const planets = await Planet.find();
            res.status(200).json(planets);
        } catch(err) {
            return next(error.InternalServerError());
        }
        
    }

    getOne(req, res, next) {
        
        

    }

    post(req, res, next) {

       

        
    }

    put(req, res, next) {
        return next(error.NotImplemented('La méthode PUT n\'est pas disponible sur cette ressource.'));
    }

    patch(req, res, next) {
        return next(error.NotImplemented('La méthode PATCH n\'est pas disponible sur cette ressource.'));
    }

    delete(req, res, next) {

        
    }

}

new PlanetsRoutes();

export default router;