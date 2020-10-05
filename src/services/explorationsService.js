import Exploration from '../models/exploration.js';

import planetsService from './../services/planetsService.js';

class ExplorationsService {

    retrieveByCriteria(filter, retrieveOptions) {

        const limit = retrieveOptions.limit;
        const skip = (retrieveOptions.page - 1) * limit + retrieveOptions.skip; // Ajout de la gestion du paramètre page

        const retrieveQuery = Exploration.find(filter, retrieveOptions.fields).limit(limit).skip(skip);
        const countQuery = Exploration.countDocuments(filter);

        if (retrieveOptions.planet) {
            retrieveQuery.populate('planet');
        }

        //Promise all attend que les deux promesses(requêtes) soient terminées avant de compléter l'opération
        return Promise.all([retrieveQuery, countQuery]);

    }

    transform(exploration, retrieveOptions = {}, transformOption = {}) {
        
        const planet = exploration.planet;

        if(planet) {
            exploration.planet = { href: `${process.env.BASE_URL}/planets/${planet._id}` };
        }
        
        //Pour embed=planet
        if(transformOption.embed.planet) {
            exploration.planet = planetsService.transform(planet);
        }
        
        exploration.href = `${process.env.BASE_URL}/explorations/${exploration._id}`;
        delete exploration._id;

        return exploration;
    }
}

export default new ExplorationsService();