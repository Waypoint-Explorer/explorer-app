import { ParsedQs } from "qs";

/** Query param type for the url-encoded express middleware. */
type QueryParam = string | ParsedQs | string[] | ParsedQs[] | undefined;

/**
 * Util used to parse query parameters.
 */
export class QueryParser {
    /**
     * @param queryParam the specified query parameter
     * @return the specified query parameter as a boolean
     */
    public static boolean(queryParam: QueryParam): boolean | undefined {
        return queryParam ? QueryParser.string(queryParam).toLowerCase() !== "false" && QueryParser.number(queryParam) !== 0
                          : undefined;
    }
    /**
     * @param queryParam the specified query parameter
     * @param radix the mathematical base of the number (default: 10)
     * @return the specified query parameter as a number
     */
    public static number(queryParam: QueryParam, radix: number = 10): number | undefined {
        return queryParam ? Number.parseInt(queryParam.toString(), radix)
                          : undefined;
    }
    /**
     * @param queryParam the specified query parameter
     * @return the specified query parameter as a string
     */
    public static string(queryParam: QueryParam): string {
        return queryParam as string;
    }
    /**
     * @param queryParam the specified query parameter
     * @return the specified query parameter as a date
     */
    public static date(queryParam: QueryParam): Date | undefined {
        return queryParam ? new Date(QueryParser.string(queryParam)) : undefined;
    }
}