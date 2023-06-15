import mongoose, {Schema} from "mongoose";
import MongooseTypes = mongoose.Types
import SchemaTypes = Schema.Types
import { MarkerType, MarkerTypeArray } from "./marker-type";
import { Coordinates, COORDINATES_SCHEMA } from "./coordinates";

/** Models a marker */
interface Marker {
    /** The id of this marker */
    _id: MongooseTypes.ObjectId,
    /** The unique id used to bind this marker with a waypoint */
    marker_id: string,
    /** The type of this itinerary */
    type: MarkerType,
    /** The geographic coordinates of this marker */
    coordinates: Coordinates,
    /** The points given by visiting this marker */
    points?: number,
}

/** Schema for an itinerary */
const MARKER_SCHEMA = new Schema<Marker>({
    marker_id: { type: SchemaTypes.String, required: true },
    type: { type: SchemaTypes.String, enum: MarkerTypeArray, required: true },
    coordinates: { type: COORDINATES_SCHEMA, required: true },
    points: { type: SchemaTypes.Number, required: false },
});

export { Marker, MARKER_SCHEMA }
