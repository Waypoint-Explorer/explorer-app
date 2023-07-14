/** The schema of the itinerary as defined in the database */
const itinerary_schema = {
  bsonType: "object",
  required: ["_id", "name", "type", "extra_points"],
  properties: {
    _id: {
      bsonType: "objectId",
      description: "The unique id of this itinerary in the database",
    },
    name: {
      bsonType: "string",
      description: "The name of this itinerary",
    },
    type: {
      enum: ["CULTURALE", "TEMATICO", "NATURALISTICO", "TURISTICO", "FITNESS"],
      description: "The type of this itinerary",
    },
    description: {
      bsonType: "string",
      description: "The description of this itinerary",
    },
    extra_points: {
      bsonType: "number",
      description: "The extra points gained completing this itinerary",
    },
    waypoints: {
      bsonType: ["array"],
      description: "The waypoints included in this itinerary",
      minItems: 0,
      uniqueItems: true,
      items: {
          bsonType: "objectId",
          description: "The waypoint included in the itinerary",
      },
    },
  }
};