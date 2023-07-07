import mongoose, {Schema} from "mongoose";
import MongooseTypes = mongoose.Types
import SchemaTypes = Schema.Types
import { Coordinates, COORDINATES_SCHEMA } from "./coordinates";

/** Models a measure */
interface Measure {
    /** The id of this measure */
    _id: MongooseTypes.ObjectId,
    /** The geographic coordinates of this measure */
    coordinates: Coordinates,
    /** The date of this measure */
    timestamp: Date,
    /** The temperature measured */
    temperature: number,
    /** The atmispheric pressure measured */
    atmospheric_pressure: number,
    /** The relative humidity measured */
    humidity: number,
    /** The air quality measured */
    air_quality: number,
}

/** Schema for a measure */
const MEASURE_SCHEMA = new Schema<Measure>({
    coordinates: { type: COORDINATES_SCHEMA, required: true },
    timestamp: { type: SchemaTypes.Date, required: true },
    temperature: { type: SchemaTypes.Number, required: true },
    atmospheric_pressure: { type: SchemaTypes.Number, required: true },
    humidity: { type: SchemaTypes.Number, required: true },
    air_quality: { type: SchemaTypes.Number, required: true },
});

export { Measure, MEASURE_SCHEMA }
