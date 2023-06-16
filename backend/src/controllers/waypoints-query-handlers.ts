import {Request, RequestHandler, Response} from "express";
import {QueryParser} from "../utils/query-parser";
import {sendError, sendJson} from "./application-handlers";
import mongoose from "mongoose";
import Types = mongoose.Types;
import { ExplorerAppDatabase } from "../data/explorer-app-database";

/**
 * Request handlers that handles queries on waypoints
 */
export class WaypointsQueryHandlers {

  /** Retrieves all the waypoints */
  public static readonly findAll: RequestHandler = (req: Request, res: Response) => {
    ExplorerAppDatabase.Singleton.Waypoints
      .find({}, {}).exec()
      .then(sendJson(req, res), sendError(req, res));
  }

  /** Retrieves a waypoint given the id of the waypoint */
  public static readonly findById: RequestHandler = (req: Request, res: Response) => {
    ExplorerAppDatabase.Singleton.Waypoints
      .findOne({_id: new Types.ObjectId(req.params.waypointId)}, {}).exec()
      .then(sendJson(req, res), sendError(req, res));
  }

}
