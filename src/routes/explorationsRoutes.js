import express from 'express';
import paginate from 'express-paginate';
import error from 'http-errors';

import explorationsService from '../services/explorationsService.js';

const FIELDS_REGEX = new RegExp('([^,]*)');

const router = express.Router();

class ExplorationsRoutes {

    constructor() {
        router.get('/', paginate.middleware(20, 50), this.getAll);
    }

    async getAll(req, res, next) {

        const transformOption = { embed: {} };
        const retrieveOptions = {
            limit: req.query.limit,
            page: req.query.page,
            skip: parseInt(req.query.skip, 10)
        };

        //Embed=Planet
        if (req.query.embed === 'planet') {
            retrieveOptions.planet = true;
            transformOption.embed.planet = true;
        }
        

        //Fields -> Permets de choisir les attributs retournés. Ne pas toujours faire un SELECT *
        if(req.query.fields) { // fields=coord,explorationDate
            let fields = req.query.fields;
            if(FIELDS_REGEX.test(fields)) {
                fields = fields.replace(/,/g, ' ');
                


                retrieveOptions.fields = fields;
            } else {
               return next(error.BadRequest()); 
            }

        } else {
            retrieveOptions.planet = true;
        }

        try {
            let [explorations, itemsCount] = await explorationsService.retrieveByCriteria({}, retrieveOptions);

            const pageCount = Math.ceil(itemsCount / req.query.limit);
            //const fonctionHasNextPage = paginate.hasNextPages(req);
            const hasNextPage = paginate.hasNextPages(req)(pageCount); // paginate.hasNextPages(req) -> retourne une fonction
            const pageArray = paginate.getArrayPages(req)(3, pageCount, req.query.page);

            const transformExplorations = explorations.map(e => {

                e = e.toObject({ getter: false, virtuals: true });
                e = explorationsService.transform(e, retrieveOptions, transformOption);

                return e;
            });

            //TODO: ICI MAYBE

            const responseBody = {
                _metadata: {
                    hasNextPage: hasNextPage,
                    page: req.query.page,
                    limit: req.query.limit,
                    totalPages: pageCount,
                    totalDocument: itemsCount
                },
                _links: {
                    prev: `${process.env.BASE_URL}${pageArray[0].url}`,
                    self: `${process.env.BASE_URL}${pageArray[1].url}`,
                    next: `${process.env.BASE_URL}${pageArray[2].url}`
                },
                results: transformExplorations
            };

            if (req.query.page === 1) {
                delete responseBody._links.prev;
                responseBody._links.self = `${process.env.BASE_URL}${pageArray[0].url}`;
                responseBody._links.next = `${process.env.BASE_URL}${pageArray[1].url}`;
            }

            if (!hasNextPage) {
                responseBody._links.prev = `${process.env.BASE_URL}${pageArray[1].url}`;
                responseBody._links.self = `${process.env.BASE_URL}${pageArray[2].url}`;
                delete responseBody._links.next;
            }



            res.status(200).json(responseBody);
        } catch (err) {
            return next(err);
        }
    }
}

new ExplorationsRoutes();

export default router;