import {DOCKER_ENVIRONMENT} from "./docker-environment";

/**
 * The environment of this application
 */
export class Environment {
  /** The map token used to access map tiles provider services */
  public static readonly MAP_TOKEN: string = DOCKER_ENVIRONMENT.map((env) => env.MAP_TOKEN).getOrDefault(import.meta.env["VITE_MAP_TOKEN"]);
  /** The list of map styles */
  public static readonly MAP_STYLE: string = DOCKER_ENVIRONMENT.map((env) => env.MAP_STYLE).getOrDefault(import.meta.env["VITE_MAP_STYLE"]);
  /** The backend host */
  public static readonly BACKEND_HOST: string = DOCKER_ENVIRONMENT.map((env) => env.BACKEND_HOST).getOrDefault(import.meta.env["VITE_BACKEND_HOST"]);
}