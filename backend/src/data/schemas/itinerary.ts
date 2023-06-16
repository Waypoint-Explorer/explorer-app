import mongoose, {Schema} from "mongoose";
import MongooseTypes = mongoose.Types
import SchemaTypes = Schema.Types
import { ItineraryType, ItineraryTypeArray } from "./itinerary-type";

/** Models an itinerary */
interface Itinerary {
    /** The id of this itinerary */
    _id: MongooseTypes.ObjectId,
    /** The name of this itinerary */
    name: string,
    /** The type of this itinerary */
    type: ItineraryType,
    /** The description of this itinerary */
    description?: string,
    /** The extra points gained completing this itinerary */
    extra_points: number,
    /** The waypoints included in this itinerary */
    waypoints?: MongooseTypes.ObjectId[],
}

/** Schema for an itinerary */
const ITINERARY_SCHEMA = new Schema<Itinerary>({
    name: { type: SchemaTypes.String, required: true },
    type: { type: SchemaTypes.String, enum: ItineraryTypeArray, required: true },
    description: { type: SchemaTypes.String, required: false },
    extra_points: { type: SchemaTypes.Number, required: true },
    waypoints: { type: Array(SchemaTypes.ObjectId), required: false},
});

export { Itinerary, ITINERARY_SCHEMA }
