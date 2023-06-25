import {RequestHandler, Request, Response, NextFunction} from "express";
import {ExplorerAppDatabase} from "../data/explorer-app-database";
import {PasswordHasher} from "../utils/password-hasher";
import {StatusCodes} from "http-status-codes";
import {Require} from "../utils/require";
import {Environment} from "../environment";
import mongoose from "mongoose";
import {UserRole} from "../data/schemas/user";
import {sendError} from "./application-handlers";
import {Time} from "../utils/time";

/**
 * Request handlers that handles authentication and authorization in the backend application.
 */
export class AccessControlHandlers {
    /** Authenticates a user in the backend application creating and returning his session id. */
    public static readonly authenticateUser: RequestHandler = (req: Request, res: Response) => {
        Require.fields(req.body, "name", "password").then(requirementSatisfied => {
            ExplorerAppDatabase.Singleton.Users
                .findOne({ name: req.body.name, },{ _id: 1, hash: 1, }).exec()
                .then(authenticatingUser => {
                    if (authenticatingUser === null){
                        res.status(StatusCodes.UNAUTHORIZED).send("Wrong username.");
                    } else if (!PasswordHasher.check(req.body.password, authenticatingUser.hash)) {
                        res.status(StatusCodes.UNAUTHORIZED).send("Wrong password.");
                    } else {
                        const newSession = {
                            tokenId: new mongoose.Types.ObjectId(),
                            expiration: new Date(Date.now() + Environment.SESSION_DURATION),
                        };
                        ExplorerAppDatabase.Singleton.Users
                            .findOneAndUpdate({ _id: authenticatingUser._id, }, { session: newSession, }, { new: true, })
                            .then(authenticatedUser => {
                                res.cookie("sessionToken", JSON.stringify({
                                    userId: authenticatedUser?._id,
                                    tokenId: authenticatedUser?.session?.tokenId,
                                }), {
                                    sameSite: "none",
                                    secure: true,
                                    maxAge: Environment.SESSION_DURATION,
                                    path: "/",
                                    httpOnly: true,
                                });
                                res.cookie("user", JSON.stringify({
                                    userId: authenticatedUser?._id,
                                    role: authenticatedUser?.role,
                                }), {
                                    sameSite: "none",
                                    secure: true,
                                    maxAge: Environment.SESSION_DURATION,
                                    path: "/",
                                    httpOnly: false,
                                });
                                res.status(StatusCodes.OK).send("Authenticated.");
                            }, sendError(req, res));
                    }
                }, sendError(req, res));
        }, failure => {
            res.status(StatusCodes.BAD_REQUEST).send("The request must contain a [username] and a [password].");
        });
    }
    /** Logs out a user by deleting his session in the database and in the cookies. */
    public static readonly logoutUser: RequestHandler = (req: Request, res: Response) => {
        AccessControlFunctions.logout(req, res, () => res.status(StatusCodes.OK).send("User logged out."));
    }
}

/**
 * Request handlers that handles authentication and authorization before actually dispatching the requests.
 */
export class AccessControlMiddlewares {
    /**
     * Authorizes a user who sent a session token, granting him access to the next routes.
     * Sends an error if the user has not a single role among the specified required roles.
     * @param roles the specified required roles
     * @description If no roles are specified, the user is only required to be authenticated.
     */
    public static readonly requireAuthorization: (...roles: UserRole[]) => RequestHandler = (...roles) => (req: Request, res: Response, next: NextFunction) => {
        if (!!req.cookies.sessionToken) { req.cookies.sessionToken = JSON.parse(req.cookies.sessionToken); }
        Require.fields(req.cookies, "sessionToken.userId", "sessionToken.tokenId").then(requirementSatisfied => {
            ExplorerAppDatabase.Singleton.Users
                .findOne({_id: req.cookies.sessionToken.userId}, {role: 1, session: 1}).exec()
                .then(authorizedUser => {
                    if (authorizedUser === null || authorizedUser.session === undefined) {
                        AccessControlFunctions.logout(req, res, () => res.status(StatusCodes.UNAUTHORIZED).send("User is not authenticated."));
                    } else if (authorizedUser.session.tokenId.toString() != req.cookies.sessionToken.tokenId) {
                        AccessControlFunctions.logout(req, res, () => res.status(StatusCodes.UNAUTHORIZED).send("Token is not valid."));
                    } else if (authorizedUser.session.expiration.getTime() < Date.now()) {
                        AccessControlFunctions.logout(req, res, () => res.status(StatusCodes.UNAUTHORIZED).send("User session is expired."));
                    } else {
                        if (roles.length === 0 || roles.includes(authorizedUser?.role)) {
                            next();
                        } else {
                            res.status(StatusCodes.FORBIDDEN).send(`Only a [${roles}] can access this api.`);
                        }
                    }
                }, sendError(req, res));
        }, failure => {
            res.status(StatusCodes.BAD_REQUEST).send("This request requires you to be authenticated beforehand.");
        });
    }
    /**
     * Authorizes a user who sent a session token, granting him access to the next routes.
     * Sends an error if the user is not authenticated.
     */
    public static readonly requireAuthentication: () => RequestHandler = () => AccessControlMiddlewares.requireAuthorization();
}
/**
 * Support functions for AccessControlHandler and AccessControlMiddlewares.
 */
export class AccessControlFunctions {
    /** Deletes the session of a user both in the database and in the response cookies. */
    public static logout(req: Request, res: Response, then: () => void): void {
        ExplorerAppDatabase.Singleton.Users
            .findOneAndUpdate({_id: req.cookies.sessionToken.userId,}, {$unset: {session: "",},}, {new: true,})
            .then(authenticatedUser => {
                res.clearCookie("sessionToken");
                res.clearCookie("user");
                then();
            }, sendError(req, res));
    }
}

/** Alias for {@link AccessControlMiddlewares.requireAuthorization}. */
export const authorized = AccessControlMiddlewares.requireAuthorization;
/** Alias for {@link AccessControlMiddlewares.requireAuthentication}. */
export const authenticated = AccessControlMiddlewares.requireAuthentication;