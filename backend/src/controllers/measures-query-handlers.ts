import {Request, RequestHandler, Response} from "express";
import {sendError, sendJson} from "./application-handlers";
import mongoose from "mongoose";
import Types = mongoose.Types;
import {ExplorerAppDatabase, MeasuresDocument} from "../data/explorer-app-database";
import {StatusCodes} from "http-status-codes";
import {Require} from "../utils/require";

/**
 * Request handlers that handles queries on measures
 */
export class MeasuresQueryHandlers {

  /** Retrieves all the measures */
  public static readonly findAll: RequestHandler = (req: Request, res: Response) => {
    ExplorerAppDatabase.Singleton.Measures
      .find({}, {}).exec()
      .then(sendJson(req, res), sendError(req, res));
  }

  /** Retrieves a measure given the id of the measure */
  public static readonly findById: RequestHandler = (req: Request, res: Response) => {
    ExplorerAppDatabase.Singleton.Measures
      .findOne({_id: new Types.ObjectId(req.params.measureId)}, {}).exec()
      .then(sendJson(req, res), sendError(req, res));
  }

  /** Insert a new measure into the database. */
  public static readonly insertMany: RequestHandler = (req: Request, res: Response) => {
    Require.fields(req.body, "measurements", "markerId").then(requirementSatisfied => {
      ExplorerAppDatabase.Singleton.Markers
        .findOne({marker_id: req.body.markerId}, {}).exec()
        .then((marker) => {
          if (!!marker) {
            var measurements: any = [];
            req.body.measurements.forEach((measure: { timestamp: any; temperature: any; atmosphericPressure: any; humidity: any; airQuality: any; }) => {
              const newMeasure = new MeasuresDocument({
                coordinates: marker.coordinates,
                date: measure.timestamp,
                temperature: measure.temperature,
                atmospheric_pressure: measure.atmosphericPressure,
                humidity: measure.humidity,
                air_quality: measure.airQuality,
              });
              measurements.push(newMeasure);
            });
            ExplorerAppDatabase.Singleton.Measures    // Add the requested marker to the database
              .insertMany(measurements)
              .then(sendJson(req, res), sendError(req, res));
          }
        });
    }, failure => {
      res.status(StatusCodes.BAD_REQUEST).send("The request must contain a [marker_id], [type] and [coordinates].");
    });
  }
}
