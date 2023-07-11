import mongoose, {Schema} from "mongoose";
import MongooseTypes = mongoose.Types
import SchemaTypes = Schema.Types

/** Models a coupon */
interface Coupon {
    /** The id of this coupon */
    _id: MongooseTypes.ObjectId,
    /** The title of this coupon */
    title: string,
    /** The business donating this coupon */
    business: string,
    /** The points needed to get this coupon */
    points: number,
    /** The description of this coupon */
    description?: string,
}

/** Schema for a coupon */
const COUPON_SCHEMA = new Schema<Coupon>({
    title: { type: SchemaTypes.String, required: true },
    business: { type: SchemaTypes.String, required: true },
    points: { type: SchemaTypes.Number, required: true },
    description: { type: SchemaTypes.String, required: false },
});

export { Coupon, COUPON_SCHEMA }
