/**
 * Util used to handle conditions with a promise-like approach.
 */
export class Require {
    /**
     * @param conditions the specified conditions
     * @return a promise that resolves if all the specified conditions are verified, otherwise it is rejected.
     */
    public static conditions(...conditions: boolean[]): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            if (conditions.every(_ => _)) { resolve(); } else { reject(); }
        });
    }

    /**
     * @param object the specified object
     * @param fields the specified fields
     * @return a promise that resolves if the specified object has the specified fields, otherwise it is rejected.
     * @example
     * const exampleObject: any = { a: 1, b: { c: { d: 1, }, }, };
     * Require.fields(exampleObject, "a", "b").then(...);                //Resolved
     * Require.fields(exampleObject, "b.c.d").then(...);                 //Resolved
     * Require.fields(exampleObject, "d", "b.e").then(...);              //Rejected
     */
    public static fields(object: any, ...fields: string[]): Promise<void>{
        return Require.conditions( fields.every(field => Require.checkFieldExistence(object, field)) );
    }

    /**
     * @param object the specified object
     * @param field the specified field
     * @return true if the specified object has the specified field, false otherwise.
     */
    private static checkFieldExistence(object: any, field: string): boolean {
        const indexOfSubfield: number = field.indexOf('.');
        const superField: string = (indexOfSubfield !== -1) ? field.substring(0, indexOfSubfield) : field;
        const subField: string = (indexOfSubfield !== -1) ? field.substring(indexOfSubfield+1) : "";
        return object[superField] !== undefined && (subField == "" || Require.checkFieldExistence(object[superField], subField));
    }
}