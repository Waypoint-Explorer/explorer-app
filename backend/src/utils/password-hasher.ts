import bcrypt from "bcrypt";

/**
 * Models an entity that hashes passwords and checks their correspondence with their hash values.
 */
export class PasswordHasher {

    /**
     * Print the specified password and its generated hash value.
     * @param password the specified password
     * @param salt the salt used to generate the hash. If not specified, a new one will be generated.
     */
    public static printGeneratedHash(password: string, salt: string = bcrypt.genSaltSync()){
        console.log({
            "Password": password,
            "Hash": PasswordHasher.hash(password, salt)
        })
    }

    /**
     * Generates the hash for the specified password, as the concatenation of the salt used to
     * generate it and its effective hash value.
     * @param password the specified password
     * @param salt the salt used to generate the hash. If not specified, a new one will be generated.
     * @example
     * const hash = PasswordHasher.hash("password","salt");     //hash = "salt" + <hashvalue for "password">
     */
    public static hash(password: string, salt: string = bcrypt.genSaltSync()) : string {
        return bcrypt.hashSync(password, salt);
    }

    /**
     * Check if the specified password matches with the specified hash.
     * @param password the specified password.
     * @param hashValue the specified hash, as the concatenation of the salt used to generate the hash
     *                  value of the password and its hash value.
     * @example ("password","salt.hashvalue") => true/false
     */
    public static check(password: string, hashValue: string) : boolean {
        return bcrypt.compareSync(password, hashValue);
    }
}