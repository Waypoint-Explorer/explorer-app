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


  /** Retrieves a completed itinerary given the id of the completed itinerary */
  public static readonly findById: RequestHandler = (req: Request, res: Response) => {
    ExplorerAppDatabase.Singleton.CompletedItineraries
      .findOne({_id: new Types.ObjectId(req.params.completedItineraryId)}, {}).exec()
      .then(sendJson(req, res), sendError(req, res));
  }

  /** Insert a completed itinerary in the database */
  public static readonly insertOne: RequestHandler = (req: Request, res: Response) => {
    const newCompletedItinerary = new CompletedItinerariesDocument();
    if (!!req.body.itineraryId) { newCompletedItinerary.related_itinerary = req.body.itineraryId; }
    ExplorerAppDatabase.Singleton.CompletedItineraries.insertMany([newCompletedItinerary]).then(completedItinerary => {
      res.status(StatusCodes.OK).json({ completedItinerary });
    }, sendError(req, res));
  }

}
