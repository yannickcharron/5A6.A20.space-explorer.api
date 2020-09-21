import express from 'express';
import error from 'http-errors';

import planetsService from '../services/planetsService.js';

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


        const transformOptions = {};

        //est-ce que j'ai ?unit dans URL
        if(req.query.unit) {
            const unit = req.query.unit;
            if (unit === 'c') {
                transformOptions.unit = unit;
            } else {
                return next(error.BadRequest()); // Erreur 400
            }
        }

        try {
            const planets = await planetsService.retrieve();

            const tranformPlanets = planets.map(p => {
                p = p.toObject({ getter: false, virtual: true });
                p = planetsService.transform(p, transformOptions);

                return p;
            });
            
            res.status(200).json(tranformPlanets);
        } catch (err) {
            return next(error.InternalServerError(err));
        }

    }

    async getOne(req, res, next) {

        const transformOptions = {};

        //est-ce que j'ai ?unit dans URL
        if(req.query.unit) {
            const unit = req.query.unit;
            if (unit === 'c') {
                transformOptions.unit = unit;
            } else {
                return next(error.BadRequest()); // Erreur 400
            }
        }

        try {
            let planet = await planetsService.retriveById(req.params.idPlanet);
            planet = planet.toObject({ getter: false, virtual: true });
            planet = planetsService.transform(planet, transformOptions);
            res.status(200).json(planet);
        } catch(err) {
            return next(error.InternalServerError(err));
        }

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