import mongoose from "mongoose";

import { Environment } from "../environment";
import { User, USER_SCHEMA } from "./schemas/user";
import { Itinerary, ITINERARY_SCHEMA } from "./schemas/itinerary";
import { Waypoint, WAYPOINT_SCHEMA } from "./schemas/waypoint";
import { Marker, MARKER_SCHEMA } from "./schemas/marker";

/**
 * Database needed to access related data
 */
export class ExplorerAppDatabase {

    /** A singleton of the database used to access data belonging to the application */
    public static readonly Singleton: ExplorerAppDatabase = new ExplorerAppDatabase();

    /** The collection of users */
    public readonly Users: mongoose.Model<User>;
    /** The collection of the itineraries */
    public readonly Itineraries: mongoose.Model<Itinerary>;
    /** The collection of the waypoints */
    public readonly Waypoints: mongoose.Model<Waypoint>;
    /** The collection of the markers */
    public readonly Markers: mongoose.Model<Marker>;

    private readonly connection : mongoose.Connection;

    private constructor() {
        this.connection = mongoose.createConnection(
            `mongodb://${Environment.DATABASE_HOST}`, {
            authSource: "admin",
            user: Environment.DATABASE_USERNAME,
            pass: encodeURIComponent(Environment.DATABASE_PASSWORD),
            dbName: Environment.DATABASE_NAME,
            directConnection: true,
        });
        this.Users = this.connection.model<User>('users', USER_SCHEMA);
        this.Itineraries = this.connection.model<Itinerary>('itineraries', ITINERARY_SCHEMA);
        this.Waypoints = this.connection.model<Waypoint>('waypoints', WAYPOINT_SCHEMA);
        this.Markers = this.connection.model<Marker>('markers', MARKER_SCHEMA);
    }
}

/** Used for creating user documents. Alias for {@link ExplorerAppDatabase.Singleton.Users} */
export const UserDocument = ExplorerAppDatabase.Singleton.Users;
/** Used for creating itinerary documents. Alias for {@link ExplorerAppDatabase.Singleton.Itineraries} */
export const ItinerariesDocument = ExplorerAppDatabase.Singleton.Itineraries;
/** Used for creating waypoint documents. Alias for {@link ExplorerAppDatabase.Singleton.Waypoints} */
export const WaypointsDocument = ExplorerAppDatabase.Singleton.Waypoints;
/** Used for creating marker documents. Alias for {@link ExplorerAppDatabase.Singleton.Markers} */
export const MarkersDocument = ExplorerAppDatabase.Singleton.Markers;
