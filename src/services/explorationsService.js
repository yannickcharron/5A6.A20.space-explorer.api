import Exploration from '../models/exploration.js';

class ExplorationsService {

    retrieveByCriteria(filter, retrieveOptions) {

        const limit = retrieveOptions.limit;
        const skip = (retrieveOptions.page - 1) * limit + retrieveOptions.skip; //TODO: Ajout de la gestion du paramètre page

        
        const retrieveQuery = Exploration.find(filter).limit(limit).skip(skip);
        const countQuery = Exploration.countDocuments(filter);

        //Promise all attend que les deux promesses(requêtes) soient terminées avant de compléter l'opération
        return Promise.all([retrieveQuery, countQuery]);

    }
}

export default new ExplorationsService();