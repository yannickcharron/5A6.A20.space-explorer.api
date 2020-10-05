import Planet from '../models/planet.js';

const ZERO_KELVIN = -273.15;

class PlanetsService {
    //CRUD

    retrieveByCriteria(filter) {
        return Planet.find(filter);
    }

    retriveById(planetId, retrieveOptions) {

        const retrieveQuery = Planet.findById(planetId);

        if (retrieveOptions.explorations) {
            console.log('test');
            retrieveQuery.populate('explorations');
        }

        return retrieveQuery;
    }

    create(planet) {
        return Planet.create(planet);
    }

    async update(planetId, planet) {
        const filter = { _id: planetId };
        await Planet.findOneAndUpdate(filter, planet); //Retourne la planète avant la mise à jour
        return Planet.findOne(filter);
    }

    transform(planet, transformOptions = {}) {

        //Transformation de la planète
        if (transformOptions.unit === 'c') {
            planet.temperature = this.convertToCelsius(planet.temperature);
        }

        //Ménage de la planète commandité par GreenPeace
        //http://localhost:5600/planets/5f203304cf4eee2614e3906f

        //Linking
        planet.href = `${process.env.BASE_URL}/planets/${planet._id}`;

        //Transform des explorations
        if (transformOptions.embed.explorations) {

            planet.explorations = planet.explorations.map(e => {

                e.href = `${process.env.BASE_URL}/explorations/${e._id}`;
                e.planet = { href: planet.href };

                return e;

            });

        }

        delete planet._id;
        delete planet.__v;

        return planet;
    }

    convertToCelsius(degreeKelvin) {
        return parseFloat((degreeKelvin + ZERO_KELVIN).toFixed(2)); //code louche ici
    }
}

export default new PlanetsService();