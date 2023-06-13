const workdir = pwd() + "docker-entrypoint-initdb.d";

//UTILS
load(workdir + "/utils/mongo.js");

//DATA
load(workdir + "/data/users.js");

//SCHEMAS
load(workdir + "/schemas/user-schema.js");

const connection = connect();
const explorer_app_database = createOrGetDB(connection, "explorer-app-database");
const user_collection = createAndClearCollection(explorer_app_database, "users", user_schema);
user_collection.insertMany(users);
