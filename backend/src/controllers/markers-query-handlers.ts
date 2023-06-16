import {Request, RequestHandler, Response} from "express";
import {QueryParser} from "../utils/query-parser";
import {sendError, sendJson} from "./application-handlers";
import mongoose from "mongoose";
import Types = mongoose.Types;
import { ExplorerAppDatabase } from "../data/explorer-app-database";

/**
 * Request handlers that handles queries on markers
 */
export class MarkersQueryHandlers {

  /** Retrieves all the markers */
  public static readonly findAll: RequestHandler = (req: Request, res: Response) => {
    ExplorerAppDatabase.Singleton.Markers
      .find({}, {}).exec()
      .then(sendJson(req, res), sendError(req, res));
  }

  /** Retrieves a marker given the id of the marker */
  public static readonly findById: RequestHandler = (req: Request, res: Response) => {
    ExplorerAppDatabase.Singleton.Markers
      .findOne({_id: new Types.ObjectId(req.params.markerId)}, {}).exec()
      .then(sendJson(req, res), sendError(req, res));
  }

}
