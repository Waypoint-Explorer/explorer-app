import {DOCKER_ENVIRONMENT} from "./docker-environment";
import {Time} from "./utils/time";
import {ApplicationMiddlewares} from "./controllers/application-handlers";

/**
 * The environment of this application.
 */
export class Environment {
    /** The hostname for this backend application. */
    public static readonly BACKEND_HOSTNAME: string = DOCKER_ENVIRONMENT.map(_ => "0.0.0.0").getOrDefault("127.0.0.1");
    /** The port for this backend application. */
    public static readonly BACKEND_PORT: number = 3001;
    /** The host for the frontend application. */
    public static readonly FRONTEND_HOST: string = DOCKER_ENVIRONMENT.map(env => env.FRONTEND).getOrDefault("127.0.0.1:3000")
    /** The host for the database. */
    public static readonly DATABASE_HOST: string = DOCKER_ENVIRONMENT.map(env => env.DATABASE).getOrDefault("127.0.0.1:27017");
    /** The username used to access the database. */
    public static readonly DATABASE_USERNAME: string = DOCKER_ENVIRONMENT.map(env => env.DATABASE_USERNAME).getOrDefault("admin");
    /** The password used to access the database. */
    public static readonly DATABASE_PASSWORD: string = DOCKER_ENVIRONMENT.map(env => env.DATABASE_PASSWORD).getOrDefault("password");
    /** The name of the database. */
    public static readonly DATABASE_NAME: string = DOCKER_ENVIRONMENT.map(env => env.DATABASE_NAME).getOrDefault("database");
    /** The duration in milliseconds of a new session before expiration. */
    public static readonly SESSION_DURATION: number = 1 * Time.Days; //30 * Time.Minutes;
    /**
     * The verbosity level of the logger of this application.
     * @description For more information about verbosity levels, check {@link ApplicationMiddlewares.logRequest}
     */
    public static readonly LOG_VERBOSITY: number = 4;
}