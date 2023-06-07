import express from "express";
import {MainRouter} from "./main-router";

type Router = express.Router;

/** A list of routers that will be used by this express application. */
export const routers: Router[] = [
    MainRouter,
    // add routers here...
];