const workdir = pwd() + "docker-entrypoint-initdb.d";

//UTILS
load(workdir + "/utils/mongo.js");

//DATA
load(workdir + "/data/users.js");
load(workdir + "/data/itineraries.js");
load(workdir + "/data/waypoints.js");
load(workdir + "/data/markers.js");

//SCHEMAS
load(workdir + "/schemas/user-schema.js");
load(workdir + "/schemas/itinerary-schema.js");
load(workdir + "/schemas/waypoint-schema.js");
load(workdir + "/schemas/marker-schema.js");

const connection = connect();
const explorer_app_database = createOrGetDB(connection, "explorer-app-database");

const user_collection = createAndClearCollection(explorer_app_database, "users", user_schema);
user_collection.insertMany(users);
user_collection.createIndex({ name: 1 }, { unique: true });

const itinerary_collection = createAndClearCollection(explorer_app_database, "itineraries", itinerary_schema);
itinerary_collection.insertMany(itineraries);

const waypoint_collection = createAndClearCollection(explorer_app_database, "waypoints", waypoint_schema);
waypoint_collection.insertMany(waypoints);

const marker_collection = createAndClearCollection(explorer_app_database, "markers", marker_schema);
marker_collection.insertMany(markers);
