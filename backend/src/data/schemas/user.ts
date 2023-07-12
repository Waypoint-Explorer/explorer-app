import mongoose, {Schema} from "mongoose";
import MongooseTypes = mongoose.Types
import SchemaTypes = Schema.Types

/** Models a session in the application. */
interface Session {
    /** The identifier for this session. */
    tokenId: MongooseTypes.ObjectId,
    /** When this session will expire. */
    expiration: Date,
}

/** Schema of a session in the application. */
const SESSION_SCHEMA = new Schema<Session>({
    tokenId: { type: SchemaTypes.ObjectId, required: true },
    expiration: { type: SchemaTypes.Date, required: true },
}, { _id: false });

/** Models the role of a user. */
type UserRole = "user" | "administrator";

/** An array containing all the possible user roles. */
const UserRolesAsArray : string[] = ["user", "administrator"];

/** Models a user. */
interface User {
    /** The id of this user. */
    _id: MongooseTypes.ObjectId,
    /** The name of this user. */
    name: string,
    /** The email of this user, to be used for authentication. */
    email: string,
    /** The salt and hash value of the password of this user, to be used for authentication. */
    hash: string,
    /** The role of this user, to be used for authorization. */
    role: UserRole,
    /** The user session in the application. */
    session?: Session,
    /** The country of residence of this user. */
    country: string,
    /** The city of residence of this user. */
    city: string,
    /** The year of birth of this user. */
    birth_year: string,
    /** The completed itineraries of this user. */
    completed_itineraries: MongooseTypes.ObjectId[],
    /** The redeemed coupons of this user. */
    redeemed_coupons: MongooseTypes.ObjectId[],
    /** The current points of this user. */
    current_points: number,
}

/** Schema of a user. */
const USER_SCHEMA = new Schema<User>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    hash: { type: String, required: true },
    role: { type: String, enum: UserRolesAsArray, required: true },
    session: { type: SESSION_SCHEMA, required: false },
    country: { type: String, required: true },
    city: { type: String, required: false },
    birth_year: { type: String, required: false },
    completed_itineraries: { type: Array(SchemaTypes.ObjectId), required: false },
    redeemed_coupons: { type: Array(SchemaTypes.ObjectId), required: false },
    current_points: { type: SchemaTypes.Number, required: false },
});

export { UserRole, User, USER_SCHEMA, SESSION_SCHEMA, Session }
