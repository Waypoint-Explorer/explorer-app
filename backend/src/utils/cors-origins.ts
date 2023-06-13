type StaticOrigin = boolean | string | RegExp | (boolean | string | RegExp)[];
type CustomOrigin = (requestOrigin: (string | undefined), callback: (err: (Error | null), origin?: StaticOrigin) => void) => void;

/**
 * Custom cors origin handler that allows the specified list of origins.
 * @param allowedOrigins the specified list of origins
 */
export const CorsOrigins: (allowedOrigins: string[]) => CustomOrigin = allowedOrigins => (origin, callback) => {
    if (!origin) {      // allows requests with no origin (like mobile apps or curl requests)
        return accept(callback);
    } else if (isntAllowed(allowedOrigins, origin)) {
        return reject(callback, origin);
    } else {
        return accept(callback);
    }
}

type CorsCallback = (err: (Error | null), origin?: (StaticOrigin | undefined)) => void;
const accept: (callback: CorsCallback) => void = callback => {
    callback(null, true);
}
const reject: (callback: CorsCallback, origin: string) => void = (callback, origin) => {
    callback(new Error(`The CORS policy for this site does not allow access from the specified Origin [${origin}].`), false);
}
const isntAllowed: (allowedOrigins: string[], origin: string) => boolean = (allowedOrigins, origin) => {
    return allowedOrigins.indexOf(origin) === -1;
           // && allowedOrigins.indexOf(origin.replace("localhost", "127.0.0.1")) === -1
           // && allowedOrigins.indexOf(origin.replace("127.0.0.1", "localhost")) === -1;
}