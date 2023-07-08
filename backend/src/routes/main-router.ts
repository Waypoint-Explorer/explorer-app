import express from "express";
import { Environment } from "../environment";
import { ApplicationHandlers, ApplicationMiddlewares } from "../controllers/application-handlers";
import { AccessControlHandlers, authorized, authenticated } from "../controllers/authentication-handlers";
import { UsersQueryHandlers } from "../controllers/users-query-handlers";
import { CompletedItinerariesQueryHandlers } from "../controllers/completed-itineraries-query-handlers";
import { ItinerariesQueryHandlers } from "../controllers/itineraries-query-handlers";
import { WaypointsQueryHandlers } from "../controllers/waypoints-query-handlers";
import { MarkersQueryHandlers } from "../controllers/markers-query-handlers";
import { MeasuresQueryHandlers } from "../controllers/measures-query-handlers";

type ExpressRouter = express.Router;

/** The main router of this express application. */
export const MainRouter: ExpressRouter = express.Router()
    .use(ApplicationMiddlewares.logRequest(Environment.LOG_VERBOSITY))

    .get("/", ApplicationHandlers.welcome)

    .get("/users", authorized("administrator"), UsersQueryHandlers.findAll)
    .get("/users/:userId", authenticated(), UsersQueryHandlers.findById)
    .post("/users", UsersQueryHandlers.insertOne)
    .patch("/users/:userId", authenticated(), UsersQueryHandlers.updateProfile)

    .post("/login", AccessControlHandlers.authenticateUser)
    .get("/logout", authenticated(), AccessControlHandlers.logoutUser)

    .get("/completed-itineraries/id/:completedItineraryId", CompletedItinerariesQueryHandlers.findById)
    .post("/completed-itineraries", CompletedItinerariesQueryHandlers.insertOne)
    .patch("/completed-itineraries/:completedItineraryId", CompletedItinerariesQueryHandlers.updateCompletedItinerary)

    .get("/itineraries", ItinerariesQueryHandlers.findAll)
    .get("/itineraries/id/:itineraryId", ItinerariesQueryHandlers.findById)
    .get("/itinerariesTypes", ItinerariesQueryHandlers.findAllTypes)
    .post("/itineraries", ItinerariesQueryHandlers.insertOne)

    .get("/waypoints", WaypointsQueryHandlers.findAll)
    .get("/waypoints/id/:waypointId", WaypointsQueryHandlers.findById)
    .post("/waypoints", WaypointsQueryHandlers.insertOne)

    .get("/markers", MarkersQueryHandlers.findAll)
    .get("/markers/id/:markerId", MarkersQueryHandlers.findById)
    .get("/markers/marker-id/:markerId", MarkersQueryHandlers.findByMarkerId)
    .get("/markerTypes", MarkersQueryHandlers.findAllTypes)
    .post("/markers", MarkersQueryHandlers.insertOne)

    .get("/measures", MeasuresQueryHandlers.findAll)
    .post("/measures", MeasuresQueryHandlers.insertMany)
;
