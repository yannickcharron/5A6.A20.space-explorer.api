import express from 'express';
import error from 'http-errors';

const router = express.Router();

const elements = [{ symbol: 'I', name: 'Iaspyx', }, { symbol: 'Ex', name: 'Ewhyx', }, { symbol: 'Ye', name: 'Yefrium', },
                    { symbol: 'Sm', name: 'Smiathil', }, { symbol: 'E', name: 'Eplil', }, { symbol: 'G', name: 'Gloylium', },
                    { symbol: 'Ja', name: 'Jasmalt', }, { symbol: 'Xu', name: 'Xuskian', }, { symbol: 'L', name: 'Lukryx', },
                    { symbol: 'Fr', name: 'Froynyx', }, { symbol: 'K', name: 'Kreotrium', }, { symbol: 'Ve', name: 'Vethyx', },
                    { symbol: 'No', name: 'Nospite', }, { symbol: 'Q', name: 'Qobrium', }, { symbol: 'A', name: 'Awhil', },
                    { symbol: 'Z', name: 'Zuscum', }, { symbol: 'B', name: 'Blierium', }, { symbol: 'Wu', name: 'Wusnyx', }];

class ElementsRoutes {


    constructor() {
        router.get('/', this.getAll);
        router.post('/', this.post);
        router.get('/:symbol', this.getOne);
        router.delete('/:symbol', this.delete);

    }

    getAll(req, res, next) {
        res.status(200).json(elements);
    }

    getOne(req, res, next) {
        const result = elements.filter(e => e.symbol === req.params.symbol);
        if(result.length > 0) {
            res.status(200).json(result[0]);
        } else {
            return next(new error.NotFound(`L'élement avec le symbol ${req.params.symbol} - n'existe pas.`));
        }
    }

    post(req, res, next) {
        if (req.body) {
            const index = elements.findIndex(e => e.symbol === req.body.symbol);
            //L'élement est pas dans le tableau
            if(index === -1) {
                //On peut l'ajouter
                elements.push(req.body);
                const newElement = elements.filter(e => e.symbol === req.body.symbol);
                res.status(201).json(newElement[0]);
            } else {
                //Déjà présent dans le tableau
                return next(new error.Conflict(`Un élement avec le symbol ${req.body.symbol} existe déjà.`));
            }
        }
    }
    
    delete(req, res, next) {
        const index = elements.findIndex(e => e.symbol === req.params.symbol);
        if(index === -1) {
            return next(new error.NotFound(`L'élement avec le symbol ${req.params.symbol} - n'existe pas.`));
        }
        elements.splice(index, 1);
        res.status(204).end();
    }
}
new ElementsRoutes();

export default router;