import {DOCKER_ENVIRONMENT} from "./docker-environment";

/**
 * The environment of this application.
 */
export class Environment {
  /** The map token used to access map tiles provider services. */
  public static readonly MAP_TOKEN: string = DOCKER_ENVIRONMENT.map((env) => env.MAP_TOKEN).getOrDefault("");
  /** The list of map styles. */
  public static readonly MAP_STYLE: string = DOCKER_ENVIRONMENT.map((env) => env.MAP_STYLE).getOrDefault("");
}