/**
 * Util used to store regular expressions for this frontend application.
 */
export class FieldRegexs {
    /** Regular expression for the usernames. */
    public static readonly username: RegExp = /^[a-zA-Z][\w\-\s]{2,}$/;
    /** Regular expression for the emails. */
    public static readonly email: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    /** Regular expression for the passwords. */
    public static readonly password: RegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
}

/**
 * Util used to store descriptions about regular expressions for this frontend application.
 */
export class FieldDescriptions {
    /** Description for the usernames. */
    public static readonly username: string = "Il nome utente deve essere cominciare con una lettera ed essere lungo almeno 3 caratteri alfanumerici, con eventualmente i caratteri speciali '_- '.";
    /** Description for the passwords. */
    public static readonly password: string = "La password deve essere lunga almeno 8 caratteri e contenere 1 lettera maiuscola, 1 lettera minuscola, 1 numero e 1 carattere speciale tra '#?!@$%^&*-'.";
}