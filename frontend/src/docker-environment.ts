import {Optional} from "./utils/optional";

/**
 * The instance of the docker environment of this application.
 */
export const DOCKER_ENVIRONMENT : Optional<DockerEnvironment> = Optional.of(import.meta.env["VITE_DOCKER_ENVIRONMENT"]).map((env) => JSON.parse(env) as DockerEnvironment);

/** The docker environment of this application. */
interface DockerEnvironment {
    /** The map token used to access map tiles provider services. */
    readonly MAP_TOKEN: string;
    /** The map style. */
    readonly MAP_STYLE: string;
}