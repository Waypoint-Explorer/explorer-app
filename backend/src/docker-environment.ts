import {Optional} from "./utils/optional";

/**
 * The instance of the docker environment of this application.
 */
export const DOCKER_ENVIRONMENT : Optional<DockerEnvironment> =
    Optional.of(process.env.DOCKER_ENVIRONMENT)
            .map(env => JSON.parse(env) as DockerEnvironment);

/** The docker environment of this application. */
interface DockerEnvironment {
    /** The hostname and port of the application frontend. */
    readonly FRONTEND: string;
    /** The hostname and port of the database. */
    readonly DATABASE: string,
    /** The username needed to access the database. */
    readonly DATABASE_USERNAME: string,
    /** The password needed to access the database. */
    readonly DATABASE_PASSWORD: string,
    /** The name of the database. */
    readonly DATABASE_NAME: string,
}