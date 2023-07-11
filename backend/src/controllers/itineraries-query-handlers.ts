import {Request, RequestHandler, Response} from "express";
import {sendError, sendJson} from "./application-handlers";
import mongoose from "mongoose";
import Types = mongoose.Types;
import {ExplorerAppDatabase, ItinerariesDocument} from "../data/explorer-app-database";
import {StatusCodes} from "http-status-codes";
import {ItineraryTypeArray} from "../data/schemas/itinerary-type";
import {Require} from "../utils/require";

/**
 * Request handlers that handles queries on itineraries
 */
export class ItinerariesQueryHandlers {

  /** Retrieves all the itineraries */
  public static readonly findAll: RequestHandler = (req: Request, res: Response) => {
    if(!!req.query.type) {
      ExplorerAppDatabase.Singleton.Itineraries
      .find({ type: { $in: req.query.type }}, {}).exec()
      .then(sendJson(req, res), sendError(req, res));
    } else {
      ExplorerAppDatabase.Singleton.Itineraries
        .find({}, {}).exec()
        .then(sendJson(req, res), sendError(req, res));
    }
  }

  /** Retrieves an itinerary given the id of the itinerary */
  public static readonly findById: RequestHandler = (req: Request, res: Response) => {
    ExplorerAppDatabase.Singleton.Itineraries
      .findOne({_id: new Types.ObjectId(req.params.itineraryId)}, {}).exec()
      .then(sendJson(req, res), sendError(req, res));
  }

  /** Retrieves all itinerary types */
  public static readonly findAllTypes: RequestHandler = (req: Request, res: Response) => {
    const types = ItineraryTypeArray;
    if(types.length > 0){
      sendJson(req, res.json({types}));
    }else{
      res.status(StatusCodes.BAD_REQUEST).send("There are problems with your request.");
    }
  }

  /** Insert a new itinerary into the database. */
  public static readonly insertOne: RequestHandler = (req: Request, res: Response) => {
    Require.fields(req.body,"name", "type", "extra_points").then(requirementSatisfied => {
      const newItinerary = new ItinerariesDocument({
        name: req.body.name,
        type: req.body.type,
        extra_points: req.body.extra_points,
      });
      if (!!req.body.description) { newItinerary.description = req.body.description; }
      if (!!req.body.waypoints) {
        let waypointsList: any[] = [];
        req.body.waypoints.forEach((t: any) => waypointsList.push(new Types.ObjectId(t.id)));
        newItinerary.waypoints = waypointsList;
      }
      ExplorerAppDatabase.Singleton.Itineraries    // Add the requested itinerary to the database
          .insertMany([newItinerary]).then(addedItinerary => {
        res.status(StatusCodes.OK).json({ addedItinerary });
      }, sendError(req, res));
    }, failure => {
      res.status(StatusCodes.BAD_REQUEST).send("The request must contain a [name], [type] and [extra_points].");
    });
  }
}
