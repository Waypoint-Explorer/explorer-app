import {Request, RequestHandler, Response} from "express";
import {QueryParser} from "../utils/query-parser";
import {sendError, sendJson} from "./application-handlers";
import mongoose from "mongoose";
import Types = mongoose.Types;
import {RedeemedCouponsDocument, ExplorerAppDatabase} from "../data/explorer-app-database";
import {Require} from "../utils/require";
import {StatusCodes} from "http-status-codes";

/**
 * Request handlers that handles queries on redeemed coupons
 */
export class RedeemedCouponsQueryHandlers {

  /** Retrieve all the redeemed coupons */
  public static readonly findAll: RequestHandler = (req: Request, res: Response) => {
    ExplorerAppDatabase.Singleton.RedeemedCoupons
      .find({}, {}).exec()
      .then(sendJson(req, res), sendError(req, res));
  }

  /** Retrieve all the redeemed coupons of a user */
  public static readonly findByUser: RequestHandler = (req: Request, res: Response) => {
    ExplorerAppDatabase.Singleton.Users.findOne({ _id: new Types.ObjectId(req.params.userId) }, {}).exec().then((searchedUser) => {
      if (!!searchedUser) {
        ExplorerAppDatabase.Singleton.RedeemedCoupons
        .find({ _id: { $in: searchedUser.redeemed_coupons }}, {}).exec()
        .then(sendJson(req, res), sendError(req, res));
      }
    });
  }

  /** Retrieves a redeemed coupon given the id of the redeemed coupon */
  public static readonly findById: RequestHandler = (req: Request, res: Response) => {
    ExplorerAppDatabase.Singleton.RedeemedCoupons
      .findOne({_id: new Types.ObjectId(req.params.redeemedCouponId)}, {}).exec()
      .then(sendJson(req, res), sendError(req, res));
  }

  /** Insert a redeemed coupon in the database */
  public static readonly insertOne: RequestHandler = (req: Request, res: Response) => {
    Require.fields(req.body, "userId", "relatedCouponId").then(() => {
      ExplorerAppDatabase.Singleton.Coupons.findOne({ _id: new Types.ObjectId(req.body.relatedCouponId) }, {}).exec().then(foundCoupon => {
        ExplorerAppDatabase.Singleton.Users.findOne({ _id: new Types.ObjectId(req.body.userId) }, {}).exec().then(foundUser => {
          if (!!foundCoupon && !!foundUser && foundCoupon.points <= foundUser.current_points) {
            const newRedeemedCoupon = new RedeemedCouponsDocument();
            newRedeemedCoupon.related_coupon = req.body.relatedCouponId;
            let userUpdate: any = {};
            userUpdate.redeemed_coupons = (foundUser.redeemed_coupons ?? []).concat(new Types.ObjectId(newRedeemedCoupon._id));
            userUpdate.current_points = foundUser.current_points - foundCoupon.points;
            ExplorerAppDatabase.Singleton.Users
              .findOneAndUpdate({ _id: req.body.userId }, userUpdate, { new: true, }).exec()
              .then(() => {
                ExplorerAppDatabase.Singleton.RedeemedCoupons.insertMany([newRedeemedCoupon]).then(sendJson(req, res), sendError(req, res));
              });
          }
        });
      }, sendError(req, res));
    });
  }

}
