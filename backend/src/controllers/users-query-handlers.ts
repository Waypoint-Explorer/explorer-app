import {Request, RequestHandler, Response} from "express";
import {ExplorerAppDatabase, UserDocument} from "../data/explorer-app-database";
import {sendError, sendJson} from "./application-handlers";
import {StatusCodes} from "http-status-codes";
import mongoose from "mongoose";
import Types = mongoose.Types;
import {Require} from "../utils/require";
import {PasswordHasher} from "../utils/password-hasher";

/**
 * Request handlers that handles queries on users.
 */
export class UsersQueryHandlers {
    /** Retrieve all the users from the database. */
    public static readonly findAll: RequestHandler = (req: Request, res: Response) => {
        ExplorerAppDatabase.Singleton.Users
            .find({},{}).exec()
            .then(sendJson(req,res), sendError(req, res));
    }

    /** Retrieve a user from the database. */
    public static readonly findById: RequestHandler = (req: Request, res: Response) => {
        if (req.params.userId !== req.cookies.sessionToken.userId) {
            res.status(StatusCodes.FORBIDDEN).send("You don't have permissions to access the details of this user.");
        } else {
            ExplorerAppDatabase.Singleton.Users
                .findOne({_id: new Types.ObjectId(req.params.userId), }, {}).exec()
                .then(sendJson(req, res), sendError(req, res));
        }
    }

    /** Insert the requested user into the database. */
    public static readonly insertOne: RequestHandler = (req: Request, res: Response) => {
        Require.fields(req.body, "name", "email", "password", "role").then(requirementSatisfied => {
            ExplorerAppDatabase.Singleton.Users    // Search for a user with the same name
                .findOne({ name: req.body.name }).exec()
                .then(alreadyRegisteredUser => {
                    if (alreadyRegisteredUser !== null){
                        res.status(StatusCodes.FORBIDDEN).send("A user with this username has already been registered.");
                    } else {
                        const newUser = new UserDocument({
                            name: req.body.name,
                            email: req.body.email,
                            hash: PasswordHasher.hash(req.body.password),
                            role: req.body.role,
                        });
                        if (!!req.body.country) { newUser.country = req.body.country; }
                        if (!!req.body.city) { newUser.city = req.body.city; }
                        if (!!req.body.birth_year) { newUser.birth_year = req.body.birth_year; }
                        ExplorerAppDatabase.Singleton.Users    // Add the requested user to the database
                            .insertMany([newUser])
                            .then(sendJson(req, res), sendError(req, res));
                    }
                }, sendError(req, res))
        }, failure => {
            res.status(StatusCodes.BAD_REQUEST).send("The request must contain a [name], [email], [password] and a [role].");
        });
    }

    /** Update the requested user's profile. */
    public static readonly updateProfile: RequestHandler = (req: Request, res: Response) => {
        ExplorerAppDatabase.Singleton.Users    // Search for a user with the same id or the same new email
            .find({ $or: [{_id: new Types.ObjectId(req.params.userId)}, {name: req.body.name}]}).exec()
            .then(searchedUsers => {
                const updatingUser = searchedUsers[0];
                if (searchedUsers.length !== 1 || updatingUser._id.toString() !== req.params.userId){
                    res.status(StatusCodes.FORBIDDEN).send("A user with this username has already been registered.");
                } else if (updatingUser._id.toString() !== req.cookies.sessionToken.userId) {
                    res.status(StatusCodes.FORBIDDEN).send("You don't have permissions to update the profile of another user.");
                } else {
                    const userUpdate: any = {};
                    if (!!req.body.name) { userUpdate.name = req.body.name; }
                    if (!!req.body.email) { userUpdate.email = req.body.email; }
                    if (!!req.body.password && !PasswordHasher.check(req.body.password, updatingUser.hash)) { userUpdate.hash = PasswordHasher.hash(req.body.password); }
                    if (req.body.country !== undefined) { userUpdate.country = req.body.country; }
                    if (req.body.city !== undefined) { userUpdate.city = req.body.city; }
                    if (req.body.birth_year !== undefined) { userUpdate.birth_year = req.body.birth_year; }
                    if (req.body.completedItinerary !== undefined) { userUpdate.completed_itineraries = userUpdate.completed_itineraries.concat(new Types.ObjectId(req.body.completedItineraries)); }
                    if (req.body.redeemedCoupon !== undefined) { userUpdate.redeemed_coupons = userUpdate.redeemed_coupons.concat(new Types.ObjectId(req.body.redeemedCoupon)); }
                    if (req.body.points !== undefined) { userUpdate.current_points = updatingUser.current_points + req.body.points; }
                    ExplorerAppDatabase.Singleton.Users    // Add the requested user to the database
                        .findOneAndUpdate({ _id: updatingUser._id, }, userUpdate, { new: true, }).exec()
                        .then(sendJson(req, res), sendError(req, res));
                }
            }, sendError(req, res));
    }
}