import mongoose, {Schema} from "mongoose";
import MongooseTypes = mongoose.Types
import SchemaTypes = Schema.Types

/** Models a redeemed coupon */
interface RedeemedCoupon {
    /** The id of this coupon */
    _id: MongooseTypes.ObjectId,
    /** The coupon related to this redeemed coupon */
    related_coupon: MongooseTypes.ObjectId,
}

/** Schema for a redeemed coupon */
const REDEEMED_COUPON_SCHEMA = new Schema<RedeemedCoupon>({
    related_coupon: { type: SchemaTypes.ObjectId, required: true },
});

export { RedeemedCoupon, REDEEMED_COUPON_SCHEMA }
