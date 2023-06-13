/**
 * An optional which may or may not contain something.
 */
export class Optional<T> {
    private constructor(private readonly content?: T) {}

    /**
     * @param content the specified content
     * @return an optional containing the specified content
     */
    public static of<T>(content: T | undefined): Optional<T> { return new Optional<T>(content); }

    /** @return an optional containing nothing. */
    public static empty<T>(): Optional<T> { return new Optional<T>(undefined); }

    /** @return true if this optional contains something, false otherwise. */
    public has(): boolean { return this.content !== undefined; }

    /** @return the content of this optional. */
    public get(): T | undefined { return this.content; }

    /**
     * @param defaultValue the specified default value
     * @return the content of this optional if present, the default value otherwise.
     */
    public getOrDefault(defaultValue: T) : T { return this.has() ? this.get() as T : defaultValue; }

    /**
     * @param mapping the specified mapping function
     * @return an optional with the mapped content if present, an empty optional otherwise.
     */
    public map<R>(mapping: (content: T) => R): Optional<R> {
        return this.has() ? Optional.of(mapping(this.content as T)) : Optional.empty();
    }
}