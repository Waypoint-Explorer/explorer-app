/**
 * Connect to the mongo backend at the default port in this host.
 * @returns the connection to the mongo backend
 */
function connect(){
  return new Mongo();
}

/**
* Creates or gets a database inside the mongo backend.
* @param connection the connection to a mongo backend
* @param databaseName the name of the database to be created
* @returns the instance of the created database
*/
function createOrGetDB(connection, databaseName){
  return connection.getDB(databaseName);
}

/**
* Creates and clears the specified collection of its content, adding it to the specified database.
* @param database the specified database
* @param collectionName the specified collection
* @param collectionSchema the schema of the specified collection, used for database validation
*/
function createAndClearCollection(database, collectionName, collectionSchema = undefined) {
  if (collectionSchema){
      database.createCollection(collectionName, {
          validator: { $jsonSchema: collectionSchema },
          validationAction: "error",
      });
  } else {
      database.createCollection(collectionName);
  }
  const collection = database[collectionName];
  try { collection.deleteMany({}); } catch(e) { print(e); }
  return collection;
}