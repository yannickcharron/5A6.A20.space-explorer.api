import express from 'express';
import error from 'http-errors';

const router = express.Router();

const planets = [{ id:1, name: 'Postraigantu' }, { id:2, name: 'Goceohiri' }, { id:3, name: 'Pulreshan' }, { id:4, name: 'Hondarvis' }, 
                    { id:10, name: 'Xatov' }, { id:20, name: 'Kaomia' }, { id:30, name: 'Verizuno' }, { id:40, name: 'Phapitis' },
                    { id:100, name: 'Griuq 6ZML' }, { id:200, name: 'Brion 8GW' }, { id:300, name: 'Chelmaestea' }, { id:400, name: 'Pualia' }, 
                    { id:1000, name: 'Chelmaestea' }, { id:2000, name: 'Gilveanides' }, { id:3000, name: 'Ucarvis' }, { id:4000, name: 'Inzinda' },
                    { id:5, name: 'Ninia' }, { id:6, name: 'ualia' }, { id:7, name: 'Becipra' }, { id:8, name: 'Stretelara' }, 
                    { id:50, name: 'Zides BGG' }, { id:60, name: 'Phiuq SIV' }, { id:70, name: 'Kucruigawa' }, { id:80, name: 'Edionope' },
                    { id:500, name: 'Chanruna' }, { id:600, name: 'Mutrides' }, { id:700, name: 'Thaepra' }, { id:800, name: 'Soivis' }, 
                    { id:5000, name: 'Cuilara' }, { id:6000, name: 'Sigonides' }, { id:7000, name: 'Phillon HZZK' }, { id:8000, name: 'Neon 5' }];

class PlanetsRoutes {

    constructor() {
        
        router.get('/', this.getAll); // GET = SELECT sans Where = Retrieve
        router.get('/:idPlanet', this.getOne); // GET = SELECT avec Where = Retrieve
        router.post('/', this.post);  // POST = INSERT = Create
        router.put('/:idPlanet', this.put); // PUT = UPDATE = Update
        router.patch('/:idPlanet', this.patch); // PATCH = UPDATE Partiel = Update
        router.delete('/:idPlanet', this.delete); // DELETE = DELETE = Delete

    }

    getAll(req, res, next) {

        res.status(200);
        //res.set('Content-Type', 'application/json'); Cette ligne n'est plus nécessaire
        res.json(planets);
        
    }

    getOne(req, res, next) {
        
        console.log(req.params.idPlanet); //20

        const planet = planets.find(p => p.id === parseInt(req.params.idPlanet, 10));
        console.log(planet);
        if(planet) {
            res.status(200).json(planet);
        } else {
            return next(error.NotFound(`La planète avec l'identifiant ${req.params.idPlanet} n'existe pas.`));
        }

    }

    post(req, res, next) {

        console.log(req.body);
        
        const bodyLength = Object.keys(req.body).length;
        if(bodyLength > 0) {
            //Plein de valiation à faire mais pas le temps
            const index = planets.findIndex(p => p.id === req.body.id);
            if(index === -1) {
                //On peut ajouter la nouvelle planet
                planets.push(req.body);
                res.status(201).json(req.body);
            } else {
                return next(error.Conflict(`Une planète avec l'identifiant ${req.body.id} existe déjà.`));
            }
        } else {
            return next(error.BadRequest('Le corps de la requête est vide.'));
        }

        
    }

    put(req, res, next) {
        return next(error.NotImplemented('La méthode PUT n\'est pas disponible sur cette ressource.'));
    }

    patch(req, res, next) {
        return next(error.NotImplemented('La méthode PATCH n\'est pas disponible sur cette ressource.'));
    }

    delete(req, res, next) {

        const index = planets.findIndex(p => p.id === parseInt(req.params.idPlanet, 10));
        if(index === -1) {
            return next(error.NotFound(`La planet avec l'identifiant ${req.params.idPlanet} - n'existe pas.`))
        } 
        planets.splice(index, 1);
        res.status(204).end();
    }

}

new PlanetsRoutes();

export default router;