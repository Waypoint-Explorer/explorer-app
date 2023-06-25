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
    email: {
      bsonType: "string",
      description: "The email of this user",
    },
    hash: {
      bsonType: "string",
      description: "The salt concatenated to the hashed value of the password used by this user",
    },
    role: {
      enum: ["user", "administrator"],
      description: "The role of this user used for authorization",
    },
    session: {
      bsonType: "object",
      required: ["tokenId", "expiration"],
      description: "The user session in the application",
      properties: {
        tokenId: {
          bsonType: "objectId",
          description: "The token identifier",
        },
        expiration: {
          bsonType: "date",
          description: "The expiration date of this user session",
        }
      }
    },
    country: {
      bsonType: "string",
      description: "The country of residence of this user",
    },
    city: {
      bsonType: "string",
      description: "The city of residence of this user",
    },
    birth_year: {
      bsonType: "string",
      description: "The year of birth of this user",
    },

  },
};