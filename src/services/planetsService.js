import Planet from '../models/planet.js';

const ZERO_KELVIN = -273.15;

class PlanetsService {
    //CRUD

    async retrieve() {
        return await Planet.find();
    }

    async retriveById(planetId) {
        return await Planet.findById(planetId);
    }

    transform(planet, transformOptions = {}) {

        //Transformation de la planète
        if(transformOptions.unit === 'c') {
            planet.temperature = this.convertToCelsius(planet.temperature);
        }

        //Ménage de la planète commandité par GreenPeace
        //http://localhost:5600/planets/5f203304cf4eee2614e3906f

        //Linking
        planet.href = `${process.env.BASE_URL}/planets/${planet._id}`;

        delete planet._id;
        delete planet.__v;



        return planet;
    }

    convertToCelsius(degreeKelvin) {
        return parseFloat((degreeKelvin + ZERO_KELVIN).toFixed(2)); //code louche ici
    }
}

export default new PlanetsService();