import {Request, RequestHandler, Response} from "express";
import {QueryParser} from "../utils/query-parser";
import {sendError, sendJson} from "./application-handlers";
import mongoose from "mongoose";
import Types = mongoose.Types;
import {ExplorerAppDatabase, MarkersDocument, WaypointsDocument} from "../data/explorer-app-database";
import {Require} from "../utils/require";
import {StatusCodes} from "http-status-codes";

/**
 * Request handlers that handles queries on waypoints
 */
export class WaypointsQueryHandlers {

  /** Retrieve all the waypoints */
  public static readonly findAll: RequestHandler = (req: Request, res: Response) => {
    ExplorerAppDatabase.Singleton.Waypoints
      .find({}, {}).exec()
      .then(sendJson(req, res), sendError(req, res));
  }

  /** Retrieve a waypoint given the id of the waypoint */
  public static readonly findById: RequestHandler = (req: Request, res: Response) => {
    ExplorerAppDatabase.Singleton.Waypoints
      .findOne({_id: new Types.ObjectId(req.params.waypointId)}, {}).exec()
      .then(sendJson(req, res), sendError(req, res));
  }

  /** Insert a new waypoint into the database. */
  public static readonly insertOne: RequestHandler = (req: Request, res: Response) => {
    Require.fields(req.body,"name").then(requirementSatisfied => {
        const newWaypoint = new WaypointsDocument({
          name: req.body.name,
        });
        if (!!req.body.description) { newWaypoint.description = req.body.description; }
        if (!!req.body.place) { newWaypoint.place = req.body.place; }
        if (!!req.body.price) { newWaypoint.price = req.body.price; }
        if (!!req.body.accessibility_info) { newWaypoint.accessibility_info = req.body.accessibility_info; }
        if (!!req.body.opening_hours) { newWaypoint.opening_hours = req.body.opening_hours; }
        if (!!req.body.marker) { newWaypoint.marker = new Types.ObjectId(req.body.marker); }
        ExplorerAppDatabase.Singleton.Waypoints    // Add the requested waypoint to the database
            .insertMany([newWaypoint]).then(addedWaypoint => {
            res.status(StatusCodes.OK).json({ addedWaypoint });
        }, sendError(req, res));
    }, failure => {
      res.status(StatusCodes.BAD_REQUEST).send("The request must contain a [name].");
    });
  }

}
