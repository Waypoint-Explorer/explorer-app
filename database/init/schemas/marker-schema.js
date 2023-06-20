/** The schema of a marker as defined in the database */
const marker_schema = {
  bsonType: "object",
  required: ["_id", "marker_id", "type", "coordinates"],
  properties: {
    _id: {
      bsonType: "objectId",
      description: "The unique id of this marker in the database",
    },
    marker_id: {
      bsonType: "string",
      description: "The unique id used to bind this marker with a waypoint",
    },
    type: {
      enum: ["Device", "QRmarker"],
      description: "The type of this marker",
    },
    coordinates: {
      bsonType: "object",
      required: ["latitude", "longitude"],
      description: "Geographic coordinates",
      properties: {
        latitude: {
          bsonType: "number",
          description: "The latitude of a geographic point",
        },
        longitude: {
          bsonType: "number",
          description: "The longitude of a geographic point",
        },
      },
    },
    points: {
      bsonType: "number",
      description: "The points given by visiting this marker",
    },
  },
};