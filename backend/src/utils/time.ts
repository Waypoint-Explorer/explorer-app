/* Time in milliseconds */
const ms: number = 1;
const s: number = 1000 * ms;
const min: number = 60 * s;
const h: number = 60 * min;
const d: number = 24 * h;
const m: number = 30 * d;
const y: number = 12 * m;

/**
 * Util used to model time in milliseconds.
 */
export class Time {
    /** The duration of a millisecond in milliseconds. */
    public static readonly MilliSeconds : number = ms;
    /** The duration of a second in milliseconds. */
    public static readonly Seconds : number = s;
    /** The duration of a minute in milliseconds. */
    public static readonly Minutes : number = min;
    /** The duration of an hour in milliseconds. */
    public static readonly Hours : number = h;
    /** The duration of a day in milliseconds. */
    public static readonly Days : number = d;
    /** The duration of a month (30 days) in milliseconds. */
    public static readonly Months : number = m;
    /** The duration of a year in milliseconds. */
    public static readonly Years : number = y;
}