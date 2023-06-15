import {Request, RequestHandler, Response} from "express";
import {QueryParser} from "../utils/query-parser";
import {sendError, sendJson} from "./application-handlers";
import mongoose from "mongoose";
import Types = mongoose.Types;
import { ExplorerAppDatabase } from "../data/explorer-app-database";

/**
 * Request handlers that handles queries on itineraries
 */
export class ItinerariesQueryHandlers {

  /** Retrieves all the itineraries */
  public static readonly findAll: RequestHandler = (req: Request, res: Response) => {
    ExplorerAppDatabase.Singleton.Itineraries
      .find({}, {}).exec()
      .then(sendJson(req, res), sendError(req, res));
  }

  /** Retrieves an itinerary given the id of the itinerary */
  public static readonly findById: RequestHandler = (req: Request, res: Response) => {
    ExplorerAppDatabase.Singleton.Itineraries
      .findOne({_id: new Types.ObjectId(req.params.itineraryId)}, {}).exec()
      .then(sendJson(req, res), sendError(req, res));
  }

}
