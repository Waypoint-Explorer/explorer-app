import express from "express";
import {ApplicationHandlers, ApplicationMiddlewares} from "../controllers/application-handlers";
import {AccessControlHandlers, authorized, authenticated} from "../controllers/authentication-handlers";
import {UsersQueryHandlers} from "../controllers/users-query-handlers";
import {Environment} from "../environment";

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
    // add routes here (or create new routers)...
;

