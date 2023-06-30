import {Request, RequestHandler, Response} from "express";
import {sendError, sendJson} from "./application-handlers";
import mongoose from "mongoose";
import Types = mongoose.Types;
import {ExplorerAppDatabase, MarkersDocument} from "../data/explorer-app-database";
import {StatusCodes} from "http-status-codes";
import {Require} from "../utils/require";
import {MarkerTypeArray} from "../data/schemas/marker-type";

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

  /** Retrieves all marker types */
  public static readonly findAllTypes: RequestHandler = (req: Request, res: Response) => {
    const types = MarkerTypeArray;
    if(types.length > 0){
      sendJson(req, res.json({types}));
    }else{
      res.status(StatusCodes.BAD_REQUEST).send("There are problems with your request.");
    }
  }

  /** Insert a new marker into the database. */
  public static readonly insertOne: RequestHandler = (req: Request, res: Response) => {
    Require.fields(req.body, "marker_id", "type", "coordinates").then(requirementSatisfied => {
      ExplorerAppDatabase.Singleton.Markers         // Search for a marker with the same id
          .findOne({ marker_id: req.body.marker_id }).exec()
          .then(marker => {
            if (marker !== null) {
              res.status(StatusCodes.FORBIDDEN).send("There is already a marker with the same marker_id.");
            } else {
              const newMarker = new MarkersDocument({
                marker_id: req.body.marker_id,
                type: req.body.type,
                coordinates: req.body.coordinates,
              });
              if (!!req.body.points) { newMarker.points = req.body.points; }
              ExplorerAppDatabase.Singleton.Markers    // Add the requested marker to the database
                  .insertMany([newMarker])
                  .then(sendJson(req, res), sendError(req, res));
            }
          }, sendError(req, res));
    }, failure => {
      res.status(StatusCodes.BAD_REQUEST).send("The request must contain a [marker_id], [type] and [coordinates].");
    });
  }
}
