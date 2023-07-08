const workdir = pwd() + "docker-entrypoint-initdb.d";

//UTILS
load(workdir + "/utils/mongo.js");

//DATA
load(workdir + "/data/users.js");
load(workdir + "/data/completed-itineraries.js");
load(workdir + "/data/itineraries.js");
load(workdir + "/data/waypoints.js");
load(workdir + "/data/markers.js");
load(workdir + "/data/measures.js");

//SCHEMAS
load(workdir + "/schemas/user-schema.js");
load(workdir + "/schemas/completed-itinerary-schema.js");
load(workdir + "/schemas/itinerary-schema.js");
load(workdir + "/schemas/waypoint-schema.js");
load(workdir + "/schemas/marker-schema.js");
load(workdir + "/schemas/measure-schema.js");

const connection = connect();
const explorer_app_database = createOrGetDB(connection, "explorer-app-database");

const user_collection = createAndClearCollection(explorer_app_database, "users", user_schema);
user_collection.insertMany(users);
user_collection.createIndex({ name: 1 }, { unique: true });

const completed_itinerary_collection = createAndClearCollection(explorer_app_database, "completed_itineraries", completed_itinerary_schema);
completed_itinerary_collection.insertMany(completed_itineraries);

const itinerary_collection = createAndClearCollection(explorer_app_database, "itineraries", itinerary_schema);
itinerary_collection.insertMany(itineraries);

const waypoint_collection = createAndClearCollection(explorer_app_database, "waypoints", waypoint_schema);
waypoint_collection.insertMany(waypoints);

const marker_collection = createAndClearCollection(explorer_app_database, "markers", marker_schema);
marker_collection.insertMany(markers);
marker_collection.createIndex({ marker_id: 1 }, { unique: true });

const measure_collection = createAndClearCollection(explorer_app_database, "measures", measure_schema);
measure_collection.insertMany(measures);
