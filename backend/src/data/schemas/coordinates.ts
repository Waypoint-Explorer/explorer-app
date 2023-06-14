import mongoose, {Schema} from "mongoose";
import MongooseTypes = mongoose.Types
import SchemaTypes = Schema.Types

/** Models geographic coordinates */
interface Coordinates {
    /** The latitude of a geographic point */
    latitude: number,
    /** The longitude of a geographic point */
    longitude: number,
}

const COORDINATES_SCHEMA = new Schema<Coordinates>({
    latitude: { type: SchemaTypes.Number, required: true },
    longitude: { type: SchemaTypes.Number, required: true },
}, { _id: false });

export { Coordinates, COORDINATES_SCHEMA }