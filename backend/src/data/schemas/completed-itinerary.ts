import mongoose, {Schema} from "mongoose";
import MongooseTypes = mongoose.Types
import SchemaTypes = Schema.Types

/** Models a completed itinerary */
interface CompletedItinerary {
    /** The id of this completed itinerary */
    _id: MongooseTypes.ObjectId,
    /** The itinerary related to this completed itinerary */
    related_itinerary?: MongooseTypes.ObjectId,
    /** The waypoints visited during this completed itinerary */
    visited_waypoints?: MongooseTypes.ObjectId[],
    /** The points earned during this completed itinerary */
    points_earned?: number,
    /** The completion date of this itinerary */
    completion_date?: Date,
}

/** Schema for a completed itinerary */
const COMPLETED_ITINERARY_SCHEMA = new Schema<CompletedItinerary>({
    related_itinerary: { type: SchemaTypes.ObjectId, required: false},
    visited_waypoints: { type: Array(SchemaTypes.ObjectId), required: false},
    points_earned: { type: SchemaTypes.Number, required: false },
    completion_date: { type: SchemaTypes.Date, required: false },
});

export { CompletedItinerary, COMPLETED_ITINERARY_SCHEMA }
