import mongoose, {Schema} from "mongoose";
import MongooseTypes = mongoose.Types
import SchemaTypes = Schema.Types
import { Marker, MARKER_SCHEMA } from "./marker";

/** Models opening shift for the opening hours of a waypoint */
interface OpeningShift {
    /** The shift start time */
    shift_start: number,
    /** The shift end time */
    shift_end: number,
}

/** Schema of the opening shift for the opening hours of a waypoint */
const OPENING_SHIFT_SCHEMA = new Schema<OpeningShift>({
    shift_start: { type: SchemaTypes.Number, required: true },
    shift_end: { type: SchemaTypes.Number, required: true },
}, { _id: false });

/** Models opening hours of a waypoint */
interface OpeningHours {
    /** Monday opening hours */
    monday_hours: OpeningShift[],
    /** Tuesday opening hours */
    tuesday_hours: OpeningShift[],
    /** Wednesday opening hours */
    wednesday_hours: OpeningShift[],
    /** Thursday opening hours */
    thursday_hours: OpeningShift[],
    /** Friday opening hours */
    friday_hours: OpeningShift[],
    /** Saturday opening hours */
    saturday_hours: OpeningShift[],
    /** Sunday opening hours */
    sunday_hours: OpeningShift[],
    /** The closing days of a waypoint */
    closing_days?: Date[],
}

/** Schema of the opening hours of a waypoint */
const OPENING_HOURS_SCHEMA = new Schema<OpeningHours>({
    monday_hours: { type: Array(OPENING_SHIFT_SCHEMA), required: true },
    tuesday_hours: { type: Array(OPENING_SHIFT_SCHEMA), required: true },
    wednesday_hours: { type: Array(OPENING_SHIFT_SCHEMA), required: true },
    thursday_hours: { type: Array(OPENING_SHIFT_SCHEMA), required: true },
    friday_hours: { type: Array(OPENING_SHIFT_SCHEMA), required: true },
    saturday_hours: { type: Array(OPENING_SHIFT_SCHEMA), required: true },
    sunday_hours: { type: Array(OPENING_SHIFT_SCHEMA), required: true },
    closing_days: { type: Array(SchemaTypes.Date), required: false},
}, { _id: false });

/** Models a price category for a waypoint visit */
interface Price {
    /** The description of the price category */
    description: string,
    /** The price for the visit */
    price: number,
}

/** Schema of the price category */
const PRICE_SCHEMA = new Schema<Price>({
    description: { type: SchemaTypes.String, required: true },
    price: { type: SchemaTypes.Number, required: true },
}, { _id: false });

/** Models a waypoint */
interface Waypoint {
    /** The id of this waypoint */
    _id: MongooseTypes.ObjectId,
    /** The name of this waypoint */
    name: string,
    /** The description of this waypoint */
    description?: string,
    /** The place of this waypoint */
    place?: string,
    /** The opening hours of this waypoint */
    opening_hours?: OpeningHours,
    /** The price to pay to visit this waypoint */
    price?: Price,
    /** Accessibility informations of this waypoint */
    accessibility_info?: string,
    /** The marker binded with this waypoint */
    marker?: Marker,
}

/** Schema for a waypoint */
const WAYPOINT_SCHEMA = new Schema<Waypoint>({
    name: { type: SchemaTypes.String, required: true },
    description: { type: SchemaTypes.String, required: false },
    place: { type: SchemaTypes.String, required: false },
    opening_hours: { type: OPENING_HOURS_SCHEMA, required: false },
    price: { type: PRICE_SCHEMA, required: false },
    accessibility_info: { type: SchemaTypes.String, required: false },
    marker: { type: MARKER_SCHEMA, required: false },
});

export {
    OpeningShift, OPENING_SHIFT_SCHEMA,
    OpeningHours, OPENING_HOURS_SCHEMA,
    Price, PRICE_SCHEMA,
    Waypoint, WAYPOINT_SCHEMA
}
