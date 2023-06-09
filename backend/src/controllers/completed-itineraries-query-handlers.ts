import {Request, RequestHandler, Response} from "express";
import {QueryParser} from "../utils/query-parser";
import {sendError, sendJson} from "./application-handlers";
import mongoose from "mongoose";
import Types = mongoose.Types;
import {CompletedItinerariesDocument, ExplorerAppDatabase} from "../data/explorer-app-database";
import {Require} from "../utils/require";
import {StatusCodes} from "http-status-codes";

/**
 * Request handlers that handles queries on completed itineraries
 */
export class CompletedItinerariesQueryHandlers {

  /** Retrieve all the completed itineraries */
  public static readonly findAll: RequestHandler = (req: Request, res: Response) => {
    ExplorerAppDatabase.Singleton.CompletedItineraries
      .find({}, {}).exec()
      .then(sendJson(req, res), sendError(req, res));
  }

  /** Retrieve all the completed itineraries of a user */
  public static readonly findByUser: RequestHandler = (req: Request, res: Response) => {
    ExplorerAppDatabase.Singleton.Users.findOne({ _id: new Types.ObjectId(req.params.userId) }, {}).exec().then((searchedUser) => {
      if (!!searchedUser) {
        ExplorerAppDatabase.Singleton.CompletedItineraries
        .find({ _id: { $in: searchedUser.completed_itineraries }}, {}).exec()
        .then(sendJson(req, res), sendError(req, res));
      }
    });
  }

  /** Retrieves a completed itinerary given the id of the completed itinerary */
  public static readonly findById: RequestHandler = (req: Request, res: Response) => {
    ExplorerAppDatabase.Singleton.CompletedItineraries
      .findOne({_id: new Types.ObjectId(req.params.completedItineraryId)}, {}).exec()
      .then(sendJson(req, res), sendError(req, res));
  }

  /** Insert a completed itinerary in the database */
  public static readonly insertOne: RequestHandler = (req: Request, res: Response) => {
    Require.fields(req.body, "startDate").then(() => {
      const newCompletedItinerary = new CompletedItinerariesDocument();
      if (!!req.body.itineraryId) { newCompletedItinerary.related_itinerary = req.body.itineraryId; }
      newCompletedItinerary.start_date = req.body.startDate;
      ExplorerAppDatabase.Singleton.CompletedItineraries.insertMany([newCompletedItinerary]).then(completedItinerary => {
        if (!!req.body.userId) {
          ExplorerAppDatabase.Singleton.Users.findOne({ _id: new Types.ObjectId(req.body.userId) }, {}).exec().then(foundUser => {
            if (!!foundUser) {
              let userUpdate: any = {};
              userUpdate.completed_itineraries = (foundUser.completed_itineraries ?? []).concat(new Types.ObjectId(newCompletedItinerary._id));
              ExplorerAppDatabase.Singleton.Users
                .findOneAndUpdate({ _id: new Types.ObjectId(req.body.userId) }, userUpdate, { new: true, }).exec()
                .then(() => res.status(StatusCodes.OK).json({ completedItinerary }));
            }
          });
        } else {
          res.status(StatusCodes.OK).json({ completedItinerary });
        }
      }, sendError(req, res));
    });
  }

  /** Update a completed itinerary in the database */
  public static readonly updateCompletedItinerary: RequestHandler = (req: Request, res: Response) => {
    ExplorerAppDatabase.Singleton.CompletedItineraries
      .find({_id: new Types.ObjectId(req.params.completedItineraryId)}).exec()
      .then(searchedCompletedItinerary => {
        const updatingCompletedItinerary = searchedCompletedItinerary[0];
        if (searchedCompletedItinerary.length !== 1 || updatingCompletedItinerary._id.toString() !== req.params.completedItineraryId){
          res.status(StatusCodes.FORBIDDEN).send("Duplicate item or incorrect selection");
        } else {
          const completedItineraryUpdate: any = {};
          if (!!req.body.visitedWaypoint) {
            ExplorerAppDatabase.Singleton.Waypoints.findOne({ _id: new Types.ObjectId(req.body.visitedWaypoint)}).exec()
            .then(searchedWaypoint => {
              if (!!searchedWaypoint) {
                ExplorerAppDatabase.Singleton.Markers.findOne({ _id: searchedWaypoint.marker}).exec()
                .then(searchedMarker => {
                  if (!!searchedMarker) {
                    if (!(updatingCompletedItinerary.visited_waypoints ?? []).includes(req.body.visitedWaypoint)) {
                      completedItineraryUpdate.visited_waypoints = (updatingCompletedItinerary.visited_waypoints ?? []).concat(new Types.ObjectId(req.body.visitedWaypoint));
                      if (!searchedMarker.dynamic_codes?.includes(req.body.dynamicCode) && !!searchedMarker.points) {
                        completedItineraryUpdate.points_earned = (updatingCompletedItinerary.points_earned ?? 0) + searchedMarker.points;
                        searchedMarker.dynamic_codes?.push(req.body.dynamicCode);
                        searchedMarker.status = req.body.status;
                        ExplorerAppDatabase.Singleton.Markers
                          .findOneAndUpdate({ _id: searchedMarker._id, }, searchedMarker, { new: true, }).exec();
                      }
                      ExplorerAppDatabase.Singleton.CompletedItineraries
                        .findOneAndUpdate({ _id: updatingCompletedItinerary._id, }, completedItineraryUpdate, { new: true, }).exec()
                        .then(sendJson(req, res), sendError(req, res));
                    } else {
                      sendJson(req, res);
                    }
                  }
                });
              }
            });
          }
        }
      }, sendError(req, res));
  }

  /** Stop a completed itinerary in the database */
  public static readonly stopCompletedItinerary: RequestHandler = (req: Request, res: Response) => {
    Require.fields(req.body, "completionDate").then(() => {
      ExplorerAppDatabase.Singleton.CompletedItineraries
        .findOne({_id: new Types.ObjectId(req.params.completedItineraryId)}).exec()
        .then(searchedCompletedItinerary => {
          if (searchedCompletedItinerary === null) {
            res.status(StatusCodes.FORBIDDEN).send("Item not found");
          } else {
            searchedCompletedItinerary.completion_date = req.body.completionDate;
            ExplorerAppDatabase.Singleton.CompletedItineraries
              .findOneAndUpdate({ _id: searchedCompletedItinerary._id, }, searchedCompletedItinerary, { new: true, }).exec()
              .then(sendJson(req, res), sendError(req, res));
          }
        }, sendError(req, res));
    });
  }

}
