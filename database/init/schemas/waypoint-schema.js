/** The schema of a waypoint as defined in the database */
const waypoint_schema = {
  bsonType: "object",
  required: ["_id", "name"],
  properties: {
    _id: {
      bsonType: "objectId",
      description: "The unique id of this waypoint in the database",
    },
    name: {
      bsonType: "string",
      description: "The name of this waypoint",
    },
    description: {
      bsonType: "string",
      description: "The description of this waypoint",
    },
    place: {
      bsonType: "string",
      description: "The place of this waypoint",
    },
    opening_hours: {
      bsonType: "object",
      description: "The opening hours of this waypoint",
      properties: {
        monday_hours: {
          bsonType: ["array"],
          description: "Monday opening hours",
          minItems: 1,
          items: {
            bsonType: "object",
              required: ["shift_start", "shift_end"],
              description: "The opening shift for the opening hours of a waypoint",
              properties: {
                shift_start: {
                  bsonType: "number",
                  description: "The shift start time",
                },
                shift_end: {
                  bsonType: "number",
                  description: "The shift end time",
                },
              },
          },
        },
        tuesday_hours: {
          bsonType: ["array"],
          description: "Tuesday opening hours",
          minItems: 1,
          items: {
            bsonType: "object",
            required: ["shift_start", "shift_end"],
            description: "The opening shift for the opening hours of a waypoint",
            properties: {
                shift_start: {
                  bsonType: "number",
                  description: "The shift start time",
                },
                shift_end: {
                  bsonType: "number",
                  description: "The shift end time",
                },
              },
          },
        },
        wednesday_hours: {
          bsonType: ["array"],
          description: "Wednesday opening hours",
          minItems: 1,
          items: {
            bsonType: "object",
            required: ["shift_start", "shift_end"],
            description: "The opening shift for the opening hours of a waypoint",
            properties: {
              shift_start: {
                bsonType: "number",
                description: "The shift start time",
              },
              shift_end: {
                bsonType: "number",
                description: "The shift end time",
              },
            },
          },
        },
        thursday_hours: {
          bsonType: ["array"],
          description: "Thursday opening hours",
          minItems: 1,
          items: {
            bsonType: "object",
            required: ["shift_start", "shift_end"],
            description: "The opening shift for the opening hours of a waypoint",
            properties: {
              shift_start: {
                bsonType: "number",
                description: "The shift start time",
              },
              shift_end: {
                bsonType: "number",
                description: "The shift end time",
              },
            },
          },
        },
        friday_hours: {
          bsonType: ["array"],
          description: "Friday opening hours",
          minItems: 1,
          items: {
            bsonType: "object",
            required: ["shift_start", "shift_end"],
            description: "The opening shift for the opening hours of a waypoint",
            properties: {
              shift_start: {
                bsonType: "number",
                description: "The shift start time",
              },
              shift_end: {
                bsonType: "number",
                description: "The shift end time",
              },
            },
          },
        },
        saturday_hours: {
          bsonType: ["array"],
          description: "Saturday opening hours",
          minItems: 1,
          items: {
            bsonType: "object",
            required: ["shift_start", "shift_end"],
            description: "The opening shift for the opening hours of a waypoint",
            properties: {
              shift_start: {
                bsonType: "number",
                description: "The shift start time",
              },
              shift_end: {
                bsonType: "number",
                description: "The shift end time",
              },
            },
          },
        },
        sunday_hours: {
          bsonType: ["array"],
          description: "Sunday opening hours",
          minItems: 1,
          items: {
            bsonType: "object",
            required: ["shift_start", "shift_end"],
            description: "The opening shift for the opening hours of a waypoint",
            properties: {
              shift_start: {
                bsonType: "number",
                description: "The shift start time",
              },
              shift_end: {
                bsonType: "number",
                description: "The shift end time",
              },
            },
          },
        },
        closing_days: {
          bsonType: ["array"],
          description: "Closing days of a waypoint",
          minItems: 0,
          items: {
            bsonType: "date",
            description: "The date of a closing day",
          },
        },
      },
    },
    price: {
      bsonType: "object",
      required: ["description", "price"],
      description: "Price category for a waypoint visit",
      properties: {
        description: {
          bsonType: "string",
          description: "The description of the price category",
        },
        price: {
          bsonType: "number",
          description: "The price for the visit",
        },
      },
    },
    accessibility_info: {
      bsonType: "string",
      description: "Accessibility informations of this waypoint",
    },
    marker: {
      bsonType: "objectId",
      description: "The id of the marker bound with this waypoint",
    },
  },
};