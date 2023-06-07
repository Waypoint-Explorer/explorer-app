const user_schema = {
  bsonType: "object",
  required: ["_id", "name"],
  properties: {
    _id: {
        bsonType: "objectId",
        description: "The unique id of this user in this database",
    },
    name: {
        bsonType: "string",
        description: "The name of this user",
    },
  },
};