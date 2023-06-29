import express from "express";
import { Environment } from "../environment";
import { ApplicationHandlers, ApplicationMiddlewares } from "../controllers/application-handlers";
import { AccessControlHandlers, authorized, authenticated } from "../controllers/authentication-handlers";
import { UsersQueryHandlers } from "../controllers/users-query-handlers";
import { ItinerariesQueryHandlers } from "../controllers/itineraries-query-handlers";
import { WaypointsQueryHandlers } from "../controllers/waypoints-query-handlers";
import { MarkersQueryHandlers } from "../controllers/markers-query-handlers";

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

    .get("/itineraries", ItinerariesQueryHandlers.findAll)
    .get("/itineraries/id/:itineraryId", ItinerariesQueryHandlers.findById)

    .get("/waypoints", WaypointsQueryHandlers.findAll)
    .get("/waypoints/id/:waypointId", WaypointsQueryHandlers.findById)

    .get("/markers", MarkersQueryHandlers.findAll)
    .get("/markers/id/:markerId", MarkersQueryHandlers.findById)
    .post("/markers", MarkersQueryHandlers.insertOne)

;
