import {Request, RequestHandler, Response} from "express";
import {QueryParser} from "../utils/query-parser";
import {sendError, sendJson} from "./application-handlers";
import mongoose from "mongoose";
import Types = mongoose.Types;
import { ExplorerAppDatabase } from "../data/explorer-app-database";
import {StatusCodes} from "http-status-codes";
import {ItineraryTypeArray} from "../data/schemas/itinerary-type";

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

  /** Retrieves all itinerary types */
  public static readonly findAllTypes: RequestHandler = (req: Request, res: Response) => {
    const types = ItineraryTypeArray;
    if(types.length > 0){
      sendJson(req, res.json({types}));
    }else{
      res.status(StatusCodes.BAD_REQUEST).send("There are problems with your request.");
    }
  }


}
