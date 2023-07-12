/** The data related to the completed itineraries that will be initialized in the database */
const completed_itineraries = [
    {

        _id: ObjectId("64aedba29e8384c526937764"),
        visited_waypoints: [],
        related_itinerary: ObjectId("6489cdfd18f54e1c4c985498"),
        start_date: new Date("2023-12-07T18:58:10.000Z"),
        completion_date: new Date("2023-12-07T18:58:28.000Z"),
    },
    {
        _id: ObjectId("64aedbb99e8384c526937770"),
        visited_waypoints: [ObjectId("64996b56caa070335c91b567")],
        related_itinerary: ObjectId("6489cdfd19f54e1c4c985498"),
        start_date: new Date("2023-12-07T18:58:33.000Z"),
        points_earned: 8,
        completion_date: new Date("2023-12-07T18:58:38.000Z"),
    },
    {
        _id: ObjectId("64aedbd49e8384c526937784"),
        visited_waypoints: [ObjectId("64996b56caa070335c91b567")],
        related_itinerary: ObjectId("6489cd3d18f54e1c4c985492"),
        start_date: new Date("2023-12-07T18:59:00.000Z"),
        points_earned: 8,
        completion_date: new Date("2023-12-07T18:59:08.000Z"),
    }
]