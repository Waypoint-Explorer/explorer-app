/** The schema of the completed itinerary as defined in the database */
const completed_itinerary_schema = {
  bsonType: "object",
  required: ["_id"],
  properties: {
    _id: {
      bsonType: "objectId",
      description: "The id of this completed itinerary",
    },
    related_itinerary: {
      bsonType: "objectId",
      description: "The itinerary related to this completed itinerary",
    },
    visited_waypoints: {
      bsonType: ["array"],
      description: "The waypoints visited during this completed itinerary",
      minItems: 0,
      uniqueItems: true,
      items: {
          bsonType: "objectId",
          description: "The waypoint visited",
      },
    },
    points_earned: {
      bsonType: "number",
      description: "The points earned during this completed itinerary",
    },
    completion_date: {
      bsonType: "date",
      description: "The completion date of this itinerary",
    },
  }
};