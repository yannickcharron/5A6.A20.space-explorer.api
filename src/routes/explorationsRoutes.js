import express from 'express';
import paginate from 'express-paginate';
import error from 'http-errors';

import explorationsService from '../services/explorationsService.js';

const router = express.Router();

class ExplorationsRoutes {

    constructor() {
        router.get('/', paginate.middleware(20, 50), this.getAll);
    }

    async getAll(req, res, next) {

        const retrieveOptions = {
            limit: req.query.limit,
            page: req.query.page,
            skip: parseInt(req.query.skip, 10)
        };

        try {
            let [explorations, itemsCount] = await explorationsService.retrieveByCriteria({}, retrieveOptions);

            //TODO:ICI
            const pageCount = Math.ceil(itemsCount / req.query.limit);
            //const fonctionHasNextPage = paginate.hasNextPages(req)
            const hasNextPage = paginate.hasNextPages(req)(pageCount); // paginate.hasNextPages(req) -> retourne une fonction
            const pageArray = paginate.getArrayPages(req)(3, pageCount, req.query.page);

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
                results: explorations
            };

            if(req.query.page === 1) {
                //TODO: Quoi faire avec les links
            }

            if(!hasNextPage) {
                //TODO: Quoi faire avec les links
            }



            res.status(200).json(responseBody);
        } catch (err) {
            return next(err);
        }
    }
}

new ExplorationsRoutes();

export default router;