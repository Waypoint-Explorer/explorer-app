import {Request, RequestHandler, Response} from "express";
import {sendError, sendJson} from "./application-handlers";
import mongoose from "mongoose";
import {CouponsDocument, ExplorerAppDatabase} from "../data/explorer-app-database";
import {StatusCodes} from "http-status-codes";
import {Require} from "../utils/require";

/**
 * Request handlers that handles queries on coupons
 */
export class CouponsQueryHandlers {

  /** Retrieves all the coupons */
  public static readonly findAll: RequestHandler = (req: Request, res: Response) => {
    ExplorerAppDatabase.Singleton.Coupons
        .find({}, {}).exec()
        .then(sendJson(req, res), sendError(req, res));
  }

  /** Insert a new coupon into the database. */
 public static readonly insertOne: RequestHandler = (req: Request, res: Response) => {
     Require.fields(req.body,"title", "business", "points").then(requirementSatisfied => {
      const newCoupon = new CouponsDocument({
        title: req.body.title,
        business: req.body.business,
        points: req.body.points,
      });
      if (!!req.body.description) { newCoupon.description = req.body.description; }
      ExplorerAppDatabase.Singleton.Coupons    // Add the requested coupon to the database
          .insertMany([newCoupon]).then(addedCoupon => {
        res.status(StatusCodes.OK).json({ addedCoupon });
      }, sendError(req, res));
    }, failure => {
      res.status(StatusCodes.BAD_REQUEST).send("The request must contain a [title], [business] and [points].");
    });
  }
}
