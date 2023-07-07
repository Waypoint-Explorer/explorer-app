/** The schema of a measure as defined in the database */
const measure_schema = {
  bsonType: "object",
  required: ["_id", "coordinates", "timestamp", "temperature", "atmospheric_pressure", "humidity", "air_quality"],
  properties: {
    _id: {
      bsonType: "objectId",
      description: "The unique id of this measure in the database",
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
    timestamp: {
      bsonType: "date",
      description: "The timestamp of this measure",
    },
    temperature: {
      bsonType: "number",
      description: "The temperature measured",
    },
    atmospheric_pressure: {
      bsonType: "number",
      description: "The atmopheric pressure measured",
    },
    humidity: {
      bsonType: "number",
      description: "The relative humidity measured",
    },
    air_quality: {
      bsonType: "number",
      description: "The air quality measured",
    },
  },
};