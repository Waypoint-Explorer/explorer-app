import {RequestHandler, Request, Response, NextFunction} from "express";
import {StatusCodes} from "http-status-codes";
import {Environment} from "../environment";

/**
 * Request handlers that handles generic tasks inside the application.
 */
export class ApplicationHandlers {
    /** Shows "The server is up" message. */
    public static readonly welcome: RequestHandler = (req: Request, res: Response) => {
        res.status(StatusCodes.OK).send("The backend server is up");
    }
    /** Shows "Error 404: Page Not Found" message. */
    public static readonly notFound: RequestHandler = (req: Request, res: Response) => {
        res.status(StatusCodes.NOT_FOUND).send("Error 404: Page Not Found");
    }
}

/**
 * Request handlers that handles generic tasks inside the application before actually dispatching the requests.
 */
export class ApplicationMiddlewares {
    private static requestCount: number = 0;
    /**
     * Logs the specified request in the backend server, using the specified verbosity level.
     * @param verbosityLevel the specified verbosity level
     *        <br/> -  =0:      disables logging
     *        <br/> - \>0:      logs the `date`, `request number` and `route` of the request
     *        <br/> - \>1:      logs the `body` of the request
     *        <br/> - \>2:      logs the `query parameters` of the request
     *        <br/> - \>3:      logs the `cookies` of the request
     */
    public static readonly logRequest: (verbosityLevel: number) => RequestHandler =
        verbosityLevel => (req: Request, res: Response, next: NextFunction) => {
            let logString: string = "";
            if (verbosityLevel > 0){
                const route: string = `${req.method}:http://${Environment.BACKEND_HOSTNAME}:${Environment.BACKEND_PORT}${req.originalUrl}`;
                logString += `[${new Date(Date.now()).toString().substring(0,33)}] Request ${ApplicationMiddlewares.requestCount++}: ${route}`;
                if (verbosityLevel > 1){ logString += `\nWith body: \n${JSON.stringify(req.body)}`; }
                if (verbosityLevel > 2){ logString += `\nWith query params: \n${JSON.stringify(req.query)}`; }
                if (verbosityLevel > 3){ logString += `\nWith cookies: \n${JSON.stringify(req.cookies)}`; }
                if (verbosityLevel > 1){ logString += `\n`; }
                console.log(logString);
            }
            next();
        }
}

/**
 * Request handlers that handles utility tasks inside the application.
 */
export class ApplicationUtilityHandlers {
    /**
     * Handles an error by sending it to a client, through the specified request and response.
     * @param req the specified request
     * @param res the specified response
     */
    public static readonly sendError: (req: Request, res: Response) => (error: any) => void =
        (req: Request, res: Response) => error => { res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error); }
    /**
     * Handles a result by sending it to a client, through the specified request and response.
     * @param req the specified request
     * @param res the specified response
     */
    public static readonly sendJson: (req: Request, res: Response) => (json: any) => void =
        (req: Request, res: Response) => json => { res.status(StatusCodes.OK).json(json); }
}

/** Alias for {@link ApplicationHandlers.sendError}. */
export const sendError = ApplicationUtilityHandlers.sendError;
/** Alias for {@link ApplicationHandlers.sendJson}. */
export const sendJson = ApplicationUtilityHandlers.sendJson;