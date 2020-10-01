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

        const filter = {};
        const transformOptions = {};

        // query = ?
        if(req.query.explorer) {
            filter.discoveredBy = req.query.explorer;
        }

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
            const planets = await planetsService.retrieveByCriteria(filter);

            const tranformPlanets = planets.map(p => {
                p = p.toObject({ getter: false, virtual: true });
                p = planetsService.transform(p, transformOptions);

                return p;
            });
            
            res.status(200).json(tranformPlanets);
        } catch (err) {
            return next(err);
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
            //TODO:ICI ne pas oublier
            if(!planet) {
                return next(error.NotFound(`La planète avec l'identifiant ${req.params.idPlanet} n'existe pas.`));
            }
            planet = planet.toObject({ getter: false, virtual: true });
            planet = planetsService.transform(planet, transformOptions);
            res.status(200).json(planet);
        } catch(err) {
            return next(error.InternalServerError(err));
        }

    }

    async post(req, res, next) {

        if(!req.body) {
            return next(error.BadRequest()); //Erreur 400, 415
        }

        //TODO: Validation à faire ici soit par moongoose ou par nous même

        try {
            let planetAdded = await planetsService.create(req.body);
            planetAdded = planetAdded.toObject({ getter: false, virtual: true });
            planetAdded = planetsService.transform(planetAdded);

            res.header('Location', planetAdded.href);

            if(req.query._body === 'false') {
                res.status(201).end();
            } else {
                res.status(201).json(planetAdded);
            }

        } catch(err) {
            return next(err);
        }

    }

    async put(req, res, next) {
        
        if(!req.body) {
            return next(error.BadRequest());
        }

        //TODO: L'objet doit être complet dans le body

        try {

            let planet = await planetsService.update(req.params.idPlanet, req.body);
            
            if(req.query._body === 'false') {
                res.status(200).end();
            } else {
                planet = planet.toObject({ getter: false, virtual: true });
                planet = planetsService.transform(planet);
                res.status(200).json(planet);
            }
        } catch(err) {
            return next(error.InternalServerError(err));
        }


    }

    patch(req, res, next) {
        return next(error.NotImplemented('La méthode PATCH n\'est pas disponible sur cette ressource.'));
    }

    delete(req, res, next) {


    }

}

new PlanetsRoutes();

export default router;