/** The schema of a coupon as defined in the database */
const coupon_schema = {
    bsonType: "object",
    required: ["_id", "title", "business", "points"],
    properties: {
        _id: {
            bsonType: "objectId",
            description: "The unique id of this coupon in the database",
        },
        title: {
            bsonType: "string",
            description: "The title of this coupon",
        },
        business: {
            bsonType: "string",
            description: "The business donating this coupon",
        },
        points: {
            bsonType: "number",
            description: "The points needed to get this coupon",
        },
        description: {
            bsonType: "string",
            description: "The description of this coupon",
        },
    },
};