import mongoose from 'mongoose';

const planetSchema = mongoose.Schema({
    name: { type: String, unique: true },
    'discovered-by': { type: String, index: true },
    'discovery-date': Date,
    temperature: Number,
    satellites: [String],
    position: {
        x: {type: Number, min: -1000, max: 1000},
        y: {type: Number, min: -1000, max: 1000},
        z: {type: Number, min: -1000, max: 1000}
    }
},{
    collection:'planets'
});

export default mongoose.model('Planet', planetSchema);