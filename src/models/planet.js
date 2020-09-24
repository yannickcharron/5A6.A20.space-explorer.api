import mongoose from 'mongoose';
import mongodbErrorHandler from 'mongoose-mongodb-errors';

const planetSchema = mongoose.Schema({
    name: { type: String, unique: true, required:true },
    discoveredBy: { type: String, index: true },
    discoveryDate: Date,
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

//planetSchema.plugin(mongodbErrorHandler);

export default mongoose.model('Planet', planetSchema);