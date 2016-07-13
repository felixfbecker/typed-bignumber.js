
interface Format {
    /** the decimal separator */
    decimalSeparator?: string;
    /** the grouping separator of the integer part */
    groupSeparator?: string;
    /** the primary grouping size of the integer part */
    groupSize?: number;
    /** the secondary grouping size of the integer part */
    secondaryGroupSize?: number;
    /** the grouping separator of the fraction part */
    fractionGroupSeparator?: string;
    /** the grouping size of the fraction part */
    fractionGroupSize?: number;
}

interface Configuration {

    /**
     * The maximum number of decimal places of the results of operations involving division, i.e. division, square root and base conversion operations, and power operations with negative exponents.
     * number: integer, 0 to 1e+9 inclusive
     * Default value: 20
     */
    DECIMAL_PLACES?: number;

    /**
     * The rounding mode used in the above operations and the default rounding mode of round, toExponential, toFixed, toFormat and toPrecision.
     * The modes are available as enumerated properties of the BigNumber constructor.
     * number: integer, 0 to 8 inclusive
     * Default value: 4 (ROUND_HALF_UP)
     */
    ROUNDING_MODE?: RoundingMode;

    /**
     * The exponent value(s) at which toString returns exponential notation.
     * If a single number is assigned, the value is the exponent magnitude.
     * If an array of two numbers is assigned then the first number is the negative exponent value at and beneath which exponential notation is used, and the second number is the positive exponent value at and above which the same.
     * For example, to emulate JavaScript numbers in terms of the exponent values at which they begin to use exponential notation, use [-7, 20].
     * number: integer, magnitude 0 to 1e+9 inclusive, or
     * number[]: [ integer -1e+9 to 0 inclusive, integer 0 to 1e+9 inclusive ]
     * Default value: [-7, 20]
     */
    EXPONENTIAL_AT?: number | [number, number];

    /**
     * The exponent value(s) beyond which overflow to Infinity and underflow to zero occurs.
     * If a single number is assigned, it is the maximum exponent magnitude: values wth a positive exponent of greater magnitude become Infinity and those with a negative exponent of greater magnitude become zero.
     * If an array of two numbers is assigned then the first number is the negative exponent limit and the second number is the positive exponent limit.
     * For example, to emulate JavaScript numbers in terms of the exponent values at which they become zero and Infinity, use [-324, 308].
     * number: integer, magnitude 1 to 1e+9 inclusive, or
     * number[]: [ integer -1e+9 to -1 inclusive, integer 1 to 1e+9 inclusive ]
     * Default value: [-1e+9, 1e+9]
     */
    RANGE?: number | [number, number];

    /**
     * The value that determines whether BigNumber Errors are thrown.
     * If ERRORS is false, no errors will be thrown.
     * See Errors.
     * boolean|number: true, false, 0 or 1.
     * Default value: true
     */
    ERRORS?: boolean | number;

    /**
     * The value that determines whether cryptographically-secure pseudo-random number generation is used.
     * If CRYPTO is set to true then the random method will generate random digits using crypto.getRandomValues in browsers that support it, or crypto.randomBytes if using a version of Node.js that supports it.
     * If neither function is supported by the host environment then attempting to set CRYPTO to true will fail, and if ERRORS is true an exception will be thrown.
     * If CRYPTO is false then the source of randomness used will be Math.random (which is assumed to generate at least 30 bits of randomness).
     * See random.
     * boolean|number: true, false, 0 or 1.
     * Default value: false
     */
    CRYPTO?: boolean | number;

    /**
     * The modulo mode used when calculating the modulus: a mod n.
     * The quotient, q = a / n, is calculated according to the ROUNDING_MODE that corresponds to the chosen MODULO_MODE.
     * The remainder, r, is calculated as: r = a - n * q.
     * The modes that are most commonly used for the modulus/remainder operation are shown in the following table. Although the other rounding modes can be used, they may not give useful results.
     * Property        Value Description
     * ROUND_UP        0     The remainder is positive if the dividend is negative, otherwise it is negative.
     * ROUND_DOWN      1     The remainder has the same sign as the dividend.
     *                       This uses 'truncating division' and matches the behaviour of JavaScript's remainder operator %.
     * ROUND_FLOOR     3     The remainder has the same sign as the divisor.
     *                       This matches Python's % operator.
     * ROUND_HALF_EVEN 6     The IEEE 754 remainder function.
     * EUCLID          9     The remainder is always positive. Euclidian division:
     *                       q = sign(n) * floor(a / abs(n))
     * The rounding/modulo modes are available as enumerated properties of the BigNumber constructor.
     * See modulo.
     * number: integer, 0 to 9 inclusive
     * Default value: 1 (ROUND_DOWN)
     */
    MODULO_MODE?: RoundingMode;

    /**
     * The maximum number of significant digits of the result of the power operation (unless a modulus is specified).
     * If set to 0, the number of signifcant digits will not be limited.
     * See toPower.
     * number: integer, 0 to 1e+9 inclusive.
     * Default value: 100
     */
    POW_PRECISION?: number;

    /**
     * The FORMAT object configures the format of the string returned by the toFormat method.
     * The example below shows the properties of the FORMAT object that are recognised, and their default values.
     * Unlike the other configuration properties, the values of the properties of the FORMAT object will not be checked for validity. The existing FORMAT object will simply be replaced by the object that is passed in. Note that all the properties shown below do not have to be included.
     * See toFormat for examples of usage.
     */
    FORMAT?: Format;
}

declare enum RoundingMode {
    ROUND_UP = 0,
    ROUND_DOWN = 1,
    ROUND_CEIL = 2,
    ROUND_FLOOR = 3,
    ROUND_HALF_UP = 4,
    ROUND_HALF_DOWN = 5,
    ROUND_HALF_EVEN = 6,
    ROUND_HALF_CEIL = 7,
    ROUND_HALF_FLOOR = 8,
    EUCLID = 9
}

declare class BigNumber {

    /** Rounds away from zero */
    static ROUND_UP: RoundingMode;

    /** Rounds towards zero */
    static ROUND_DOWN: RoundingMode;

    /** Rounds towards Infinity */
    static ROUND_CEIL: RoundingMode;

    /** Rounds towards -Infinity */
    static ROUND_FLOOR: RoundingMode;

    /**
     * Rounds towards nearest neighbour.
     * If equidistant, rounds away from zero
     */
    static ROUND_HALF_UP: RoundingMode;

    /**
     * Rounds towards nearest neighbour.
     * If equidistant, rounds towards zero
     */
    static ROUND_HALF_DOWN: RoundingMode;

    /**
     * Rounds towards nearest neighbour.
     * If equidistant, rounds towards even neighbour
     */
    static ROUND_HALF_EVEN: RoundingMode;

    /**
     * Rounds towards nearest neighbour.
     * If equidistant, rounds towards Infinity
     */
    static ROUND_HALF_CEIL: RoundingMode;

    /**
     * Rounds towards nearest neighbour.
     * If equidistant, rounds towards -Infinity
     */
    static ROUND_HALF_FLOOR: RoundingMode;

    /**
     * The remainder is always positive. Euclidian division:
     * q = sign(n) * floor(a / abs(n))
     */
    static EUCLID: RoundingMode;

    /**
     * Returns a new independent BigNumber constructor with configuration as described by obj (see config), or with the default configuration if obj is null or undefined.
     */
    static another(config?: Configuration): typeof BigNumber;

    /**
     * Returns the configuration
     */
    static config(): Configuration;

    /**
     * Configures the 'global' settings for this particular BigNumber constructor.
     * Returns an object with the above properties and their current values.
     * If the value to be assigned to any of the above properties is null or undefined it is ignored.
     * See Errors for the treatment of invalid values.
     */
    static config(config: Configuration): Configuration;

    /**
     * Configures the 'global' settings for this particular BigNumber constructor.
     * Returns an object with the above properties and their current values.
     * If the value to be assigned to any of the above properties is null or undefined it is ignored.
     * See Errors for the treatment of invalid values.
     */
    static config(
        decimalPlaces?: number,
        roundingMode?: RoundingMode,
        exponentialAt?: number | [number, number],
        range?: number | [number, number],
        errors?: boolean | number,
        crypto?: boolean | number,
        moduloMode?: RoundingMode,
        powPrecision?: number,
        format?: Format
    ): Configuration;

    /**
     * Returns a BigNumber whose value is the maximum of arg1, arg2,... .
     * The argument to this method can also be an array of values.
     * The return value is always exact and unrounded.
     * See BigNumber for further parameter details.
     */
    static max(...args: Array<number | string | BigNumber>): BigNumber;
    static max(args: Array<number | string | BigNumber>): BigNumber;

    /**
     * See BigNumber for further parameter details.
     * Returns a BigNumber whose value is the minimum of arg1, arg2,... .
     * The argument to this method can also be an array of values.
     * The return value is always exact and unrounded.
     */
    static min(...args: Array<number | string | BigNumber>): BigNumber;
    static min(args: Array<number | string | BigNumber>): BigNumber;

    /**
     * Returns a new BigNumber with a pseudo-random value equal to or greater than 0 and less than 1.
     * The return value will have dp decimal places (or less if trailing zeros are produced).
     * If dp is omitted then the number of decimal places will default to the current DECIMAL_PLACES setting.
     * Depending on the value of this BigNumber constructor's CRYPTO setting and the support for the crypto object in the host environment, the random digits of the return value are generated by either Math.random (fastest), crypto.getRandomValues (Web Cryptography API in recent browsers) or  crypto.randomBytes (Node.js).
     * If CRYPTO is true, i.e. one of the crypto methods is to be used, the value of a returned BigNumber should be cryptographically-secure and statistically indistinguishable from a random value.
     * @param dp integer, 0 to 1e+9 inclusive
     */
    static random(dp?: number): BigNumber;

    /**
     * coefficient
     * Array of base 1e14 numbers
     */
    c: number[];

    /**
     * exponent
     * Integer, -1000000000 to 1000000000 inclusive
     */
    e: number;

    /**
     * sign
     * -1 or 1
     */
    s: number;

    /**
     * Returns a new instance of a BigNumber object.
     * If a base is specified, the value is rounded according to the current DECIMAL_PLACES and ROUNDING_MODE configuration.
     * See Errors for the treatment of an invalid value or base.
     * @param value
     *     A numeric value.
     *     Legitimate values include ±0, ±Infinity and NaN.
     *     Values of type number with more than 15 significant digits are considered invalid (if ERRORS is true) as calling toString or valueOf on such numbers may not result in the intended value.
     *     There is no limit to the number of digits of a value of type string (other than that of JavaScript's maximum array size).
     *     Decimal string values may be in exponential, as well as normal (fixed-point) notation. Non-decimal values must be in normal notation.
     *     String values in hexadecimal literal form, e.g. '0xff', are valid, as are string values with the octal and binary prefixs '0o' and '0b'. String values in octal literal form without the prefix will be interpreted as decimals, e.g. '011' is interpreted as 11, not 9.
     *     Values in any base may have fraction digits.
     *     For bases from 10 to 36, lower and/or upper case letters can be used to represent values from 10 to 35.
     *     For bases above 36, a-z represents values from 10 to 35, A-Z from 36 to 61, and $ and _ represent 62 and 63 respectively (this can be changed by editing the ALPHABET variable near the top of the source file).
     * @param base
     *     integer, 2 to 64 inclusive
     *     The base of value.
     *     If base is omitted, or is null or undefined, base 10 is assumed.
     */
    constructor(value: number | string | BigNumber, base?: number);

    /**
     * Returns a BigNumber whose value is the absolute value, i.e. the magnitude, of the value of this BigNumber.
     * The return value is always exact and unrounded.
     */
    absoluteValue(): BigNumber;

    /**
     * Returns a BigNumber whose value is the absolute value, i.e. the magnitude, of the value of this BigNumber.
     * The return value is always exact and unrounded.
     */
    abs(): BigNumber;

    /**
     * Returns a BigNumber whose value is the value of this BigNumber rounded to a whole number in the direction of positive Infinity.
     */
    ceil(): BigNumber;

    /**
     * Returns
     * 1    If the value of this BigNumber is greater than the value of n
     * -1   If the value of this BigNumber is less than the value of n
     * 0    If this BigNumber and n have the same value
     * null If the value of either this BigNumber or n is NaN
     */
    comparedTo(n: number | string | BigNumber, base?: number): number;

    /**
     * Returns
     * 1    If the value of this BigNumber is greater than the value of n
     * -1   If the value of this BigNumber is less than the value of n
     * 0    If this BigNumber and n have the same value
     * null If the value of either this BigNumber or n is NaN
     */
    cmp(n: number | string | BigNumber, base?: number): number;

    /**
     * Return the number of decimal places of the value of this BigNumber, or null if the value of this BigNumber is ±Infinity or NaN.
     */
    decimalPlaces(): number;

    /**
     * Return the number of decimal places of the value of this BigNumber, or null if the value of this BigNumber is ±Infinity or NaN.
     */
    dp(): number;

    /**
     * Returns a BigNumber whose value is the value of this BigNumber divided by n, rounded according to the current DECIMAL_PLACES and ROUNDING_MODE configuration.
     */
    dividedBy(n: number | string | BigNumber, base?: number): BigNumber;

    /**
     * Returns a BigNumber whose value is the value of this BigNumber divided by n, rounded according to the current DECIMAL_PLACES and ROUNDING_MODE configuration.
     */
    div(n: number | string | BigNumber, base?: number): BigNumber;

    /**
     * Return a BigNumber whose value is the integer part of dividing the value of this BigNumber by n.
     */
    dividedToIntegerBy(n: number | string | BigNumber, base?: number): BigNumber;

    /**
     * Return a BigNumber whose value is the integer part of dividing the value of this BigNumber by n.
     */
    divToInt(n: number | string | BigNumber, base?: number): BigNumber;

    /**
     * Returns true if the value of this BigNumber equals the value of n, otherwise returns false.
     * As with JavaScript, NaN does not equal NaN.
     * Note: This method uses the comparedTo method internally.
     */
    equals(n: number | string | BigNumber, base?: number): boolean;

    /**
     * Returns true if the value of this BigNumber equals the value of n, otherwise returns false.
     * As with JavaScript, NaN does not equal NaN.
     * Note: This method uses the comparedTo method internally.
     */
    eq(n: number | string | BigNumber, base?: number): boolean;

    /**
     * Returns a BigNumber whose value is the value of this BigNumber rounded to a whole number in the direction of negative Infinity.
     */
    floor(): BigNumber;

    /**
     * Returns true if the value of this BigNumber is greater than the value of n, otherwise returns false.
     * Note: This method uses the comparedTo method internally.
     */
    greaterThan(n: number | string | BigNumber, base?: number): boolean;

    /**
     * Returns true if the value of this BigNumber is greater than the value of n, otherwise returns false.
     * Note: This method uses the comparedTo method internally.
     */
    gt(n: number | string | BigNumber, base?: number): boolean;

    /**
     * Returns true if the value of this BigNumber is greater than or equal to the value of n, otherwise returns false.
     * Note: This method uses the comparedTo method internally.
     */
    greaterThanOrEqualTo(n: number | string | BigNumber, base?: number): boolean;

    /**
     * Returns true if the value of this BigNumber is greater than or equal the value of n, otherwise returns false.
     * Note: This method uses the comparedTo method internally.
     */
    gte(n: number | string | BigNumber, base?: number): boolean;

    /**
     * Returns true if the value of this BigNumber is a finite number, otherwise returns false.
     * The only possible non-finite values of a BigNumber are NaN, Infinity and -Infinity.
     * Note: The native method isFinite() can be used if n <= Number.MAX_VALUE.
     */
    isFinite(): boolean;

    /**
     * Returns true if the value of this BigNumber is a whole number, otherwise returns false.
     */
    isInteger(): boolean;

    /**
     * Returns true if the value of this BigNumber is a whole number, otherwise returns false.
     */
    isInt(): boolean;

    /**
     * Returns true if the value of this BigNumber is NaN, otherwise returns false.
     * Note: The native method isNaN() can also be used.
     */
    isNaN(): boolean;

    /**
     * Returns true if the value of this BigNumber is negative, otherwise returns false.
     * Note: n < 0 can be used if n <= -Number.MIN_VALUE.
     */
    isNegative(): boolean;

    /**
     * Returns true if the value of this BigNumber is negative, otherwise returns false.
     * Note: n < 0 can be used if n <= -Number.MIN_VALUE.
     */
    isNeg(): boolean;

    /**
     * Returns true if the value of this BigNumber is zero or minus zero, otherwise returns false.
     * Note: n == 0 can be used if n >= Number.MIN_VALUE.
     */
    isZero(): boolean;

    /**
     * Returns true if the value of this BigNumber is less than the value of n, otherwise returns false.
     * Note: This method uses the comparedTo method internally.
     */
    lessThan(n: number | string | BigNumber, base?: number): boolean;

    /**
     * Returns true if the value of this BigNumber is less than the value of n, otherwise returns false.
     * Note: This method uses the comparedTo method internally.
     */
    lt(n: number | string | BigNumber, base?: number): boolean;

    /**
     * Returns true if the value of this BigNumber is less than or equal the value of n, otherwise returns false.
     * Note: This method uses the comparedTo method internally.
     */
    lessThanOrEqualTo(n: number | string | BigNumber, base?: number): boolean;

    /**
     * Returns true if the value of this BigNumber is less than or equal the value of n, otherwise returns false.
     * Note: This method uses the comparedTo method internally.
     */
    lte(n: number | string | BigNumber, base?: number): boolean;

    /**
     * Returns a BigNumber whose value is the value of this BigNumber minus n.
     * The return value is always exact and unrounded.
     */
    minus(n: number | string | BigNumber, base?: number): BigNumber;

    /**
     * Returns a BigNumber whose value is the value of this BigNumber modulo n, i.e. the integer remainder of dividing this BigNumber by n.
     * The value returned, and in particular its sign, is dependent on the value of the MODULO_MODE setting of this BigNumber constructor. If it is 1 (default value), the result will have the same sign as this BigNumber, and it will match that of Javascript's % operator (within the limits of double precision) and BigDecimal's remainder method.
     * The return value is always exact and unrounded.
     * See MODULO_MODE for a description of the other modulo modes.
     */
    modulo(n: number | string | BigNumber, base?: number): BigNumber;

    /**
     * Returns a BigNumber whose value is the value of this BigNumber modulo n, i.e. the integer remainder of dividing this BigNumber by n.
     * The value returned, and in particular its sign, is dependent on the value of the MODULO_MODE setting of this BigNumber constructor. If it is 1 (default value), the result will have the same sign as this BigNumber, and it will match that of Javascript's % operator (within the limits of double precision) and BigDecimal's remainder method.
     * The return value is always exact and unrounded.
     * See MODULO_MODE for a description of the other modulo modes.
     */
    mod(n: number | string | BigNumber, base?: number): BigNumber;

    /** Returns a BigNumber whose value is the value of this BigNumber negated, i.e. multiplied by -1. */
    negated(): BigNumber;

    /** Returns a BigNumber whose value is the value of this BigNumber negated, i.e. multiplied by -1. */
    neg(): BigNumber;

    /**
     * Returns a BigNumber whose value is the value of this BigNumber plus n.
     * The return value is always exact and unrounded.
     */
    plus(n: number | string | BigNumber, base?: number): BigNumber;

    /**
     * If z is true or 1 then any trailing zeros of the integer part of a number are counted as significant digits, otherwise they are not.
     * @param z true, false, 0 or 1
     */
    precision(z?: boolean | number): number;

    /**
     * If z is true or 1 then any trailing zeros of the integer part of a number are counted as significant digits, otherwise they are not.
     * @param z true, false, 0 or 1
     */
    sd(z?: boolean | number): number;

    /**
     * Returns a BigNumber whose value is the value of this BigNumber rounded by rounding mode rm to a maximum of dp decimal places.
     * if dp is omitted, or is null or undefined, the return value is n rounded to a whole number.
     * if rm is omitted, or is null or undefined, ROUNDING_MODE is used.
     * See Errors for the treatment of other non-integer or out of range dp or rm values.
     * @param dp integer, 0 to 1e+9 inclusive
     * @param rm integer, 0 to 8 inclusive
     */
    round(dp?: number, rm?: number): BigNumber;

    /**
     * Returns a BigNumber whose value is the value of this BigNumber shifted n places.
     * The shift is of the decimal point, i.e. of powers of ten, and is to the left if n is negative or to the right if n is positive.
     * The return value is always exact and unrounded.
     * @param n integer, -9007199254740991 to 9007199254740991 inclusive
     */
    shift(n: number): BigNumber;

    /**
     * Returns a BigNumber whose value is the square root of the value of this BigNumber, rounded according to the current DECIMAL_PLACES and ROUNDING_MODE configuration.
     * The return value will be correctly rounded, i.e. rounded as if the result was first calculated to an infinite number of correct digits before rounding.
     */
    squareRoot(): BigNumber;

    /**
     * Returns a BigNumber whose value is the square root of the value of this BigNumber, rounded according to the current DECIMAL_PLACES and ROUNDING_MODE configuration.
     * The return value will be correctly rounded, i.e. rounded as if the result was first calculated to an infinite number of correct digits before rounding.
     */
    sqrt(): BigNumber;

    /**
     * Returns a BigNumber whose value is the value of this BigNumber times n.
     * The return value is always exact and unrounded.
     */
    times(n: number | string | BigNumber, base?: number): BigNumber;

    /**
     * Returns a BigNumber whose value is the value of this BigNumber rounded to sd significant digits using rounding mode rm.
     * If sd is omitted or is null or undefined, the return value will not be rounded.
     * If rm is omitted or is null or undefined, ROUNDING_MODE will be used.
     * See Errors for the treatment of other non-integer or out of range sd or rm values.
     * @param sd integer, 1 to 1e+9 inclusive
     * @param rm integer, 0 to 8 inclusive
     */
    toDigits(sd?: number, rm?: number): BigNumber;

    /**
     * Returns a string representing the value of this BigNumber in exponential notation rounded using rounding mode rm to dp decimal places, i.e with one digit before the decimal point and dp digits after it.
     * If the value of this BigNumber in exponential notation has fewer than dp fraction digits, the return value will be appended with zeros accordingly.
     * If dp is omitted, or is null or undefined, the number of digits after the decimal point defaults to the minimum number of digits necessary to represent the value exactly.
     * If rm is omitted or is null or undefined, ROUNDING_MODE is used.
     * See Errors for the treatment of other non-integer or out of range dp or rm values.
     * @param dp integer, 0 to 1e+9 inclusive
     * @param rm integer, 0 to 8 inclusive
     */
    toExponential(dp?: number, rm?: number): string;

    /**
     * Returns a string representing the value of this BigNumber in normal (fixed-point) notation rounded to dp decimal places using rounding mode rm.
     * If the value of this BigNumber in normal notation has fewer than dp fraction digits, the return value will be appended with zeros accordingly.
     * Unlike Number.prototype.toFixed, which returns exponential notation if a number is greater or equal to 1021, this method will always return normal notation.
     * If dp is omitted or is null or undefined, the return value will be unrounded and in normal notation. This is also unlike Number.prototype.toFixed, which returns the value to zero decimal places.
     * It is useful when fixed-point notation is required and the current EXPONENTIAL_AT setting causes toString to return exponential notation.
     * If rm is omitted or is null or undefined, ROUNDING_MODE is used.
     * See Errors for the treatment of other non-integer or out of range dp or rm values.
     * @param dp integer, 0 to 1e+9 inclusive
     * @param rm integer, 0 to 8 inclusive
     */
    toFixed(dp?: number, rm?: number): string;

    /**
     * Returns a string representing the value of this BigNumber in normal (fixed-point) notation rounded to dp decimal places using rounding mode rm, and formatted according to the properties of the FORMAT object.
     * See the examples below for the properties of the FORMAT object, their types and their usage.
     * If dp is omitted or is null or undefined, then the return value is not rounded to a fixed number of decimal places.
     * If rm is omitted or is null or undefined, ROUNDING_MODE is used.
     * See Errors for the treatment of other non-integer or out of range dp or rm values.
     * @param dp integer, 0 to 1e+9 inclusive
     * @param rm integer, 0 to 8 inclusive
     */
    toFormat(dp?: number, rm?: number): string;

    /**
     * Returns a string array representing the value of this BigNumber as a simple fraction with an integer numerator and an integer denominator. The denominator will be a positive non-zero value less than or equal to max.
     * If a maximum denominator, max, is not specified, or is null or undefined, the denominator will be the lowest value necessary to represent the number exactly.
     * See Errors for the treatment of other non-integer or out of range max values.
     * @param max integer >= 1 and < Infinity
     */
    toFraction(max?: number | string | BigNumber): [string, string];

    /**
     * Same as valueOf
     */
    toJSON(): string;

    /**
     * Returns the value of this BigNumber as a JavaScript number primitive.
     * Type coercion with, for example, the unary plus operator will also work, except that a BigNumber with the value minus zero will be converted to positive zero.
     */
    toNumber(): number;

    /**
     * Returns a BigNumber whose value is the value of this BigNumber raised to the power n, and optionally modulo a modulus m.
     * If n is negative the result is rounded according to the current DECIMAL_PLACES and ROUNDING_MODE configuration.
     * If n is not an integer or is out of range:
     * If ERRORS is true a BigNumber Error is thrown,
     * else if n is greater than 9007199254740991, it is interpreted as Infinity;
     * else if n is less than -9007199254740991, it is interpreted as -Infinity;
     * else if n is otherwise a number, it is truncated to an integer;
     * else it is interpreted as NaN.
     * As the number of digits of the result of the power operation can grow so large so quickly, e.g. 123.45610000 has over 50000 digits, the number of significant digits calculated is limited to the value of the POW_PRECISION setting (default value: 100) unless a modulus m is specified.
     * Set POW_PRECISION to 0 for an unlimited number of significant digits to be calculated (this will cause the method to slow dramatically for larger exponents).
     * Negative exponents will be calculated to the number of decimal places specified by DECIMAL_PLACES (but not to more than POW_PRECISION significant digits).
     * If m is specified and the value of m, n and this BigNumber are positive integers, then a fast modular exponentiation algorithm is used, otherwise if any of the values is not a positive integer
     * @param n integer, -9007199254740991 to 9007199254740991 inclusive
     */
    toPower(n: number, m?: number | string | BigNumber): BigNumber;

    /**
     * Returns a BigNumber whose value is the value of this BigNumber raised to the power n, and optionally modulo a modulus m.
     * If n is negative the result is rounded according to the current DECIMAL_PLACES and ROUNDING_MODE configuration.
     * If n is not an integer or is out of range:
     * If ERRORS is true a BigNumber Error is thrown,
     * else if n is greater than 9007199254740991, it is interpreted as Infinity;
     * else if n is less than -9007199254740991, it is interpreted as -Infinity;
     * else if n is otherwise a number, it is truncated to an integer;
     * else it is interpreted as NaN.
     * As the number of digits of the result of the power operation can grow so large so quickly, e.g. 123.45610000 has over 50000 digits, the number of significant digits calculated is limited to the value of the POW_PRECISION setting (default value: 100) unless a modulus m is specified.
     * Set POW_PRECISION to 0 for an unlimited number of significant digits to be calculated (this will cause the method to slow dramatically for larger exponents).
     * Negative exponents will be calculated to the number of decimal places specified by DECIMAL_PLACES (but not to more than POW_PRECISION significant digits).
     * If m is specified and the value of m, n and this BigNumber are positive integers, then a fast modular exponentiation algorithm is used, otherwise if any of the values is not a positive integer
     * @param n integer, -9007199254740991 to 9007199254740991 inclusive
     */
    pow(n: number, m?: number | string | BigNumber): BigNumber;

    /**
     * Returns a string representing the value of this BigNumber rounded to sd significant digits using rounding mode rm.
     * If sd is less than the number of digits necessary to represent the integer part of the value in normal (fixed-point) notation, then exponential notation is used.
     * If sd is omitted, or is null or undefined, then the return value is the same as n.toString().
     * If rm is omitted or is null or undefined, ROUNDING_MODE is used.
     * See Errors for the treatment of other non-integer or out of range sd or rm values.
     * @param sd integer, 1 to 1e+9 inclusive
     * @param rm integer, 0 to 8 inclusive
     */
    toPrecision(sd?: number, rm?: number): string;

    /**
     * Returns a string representing the value of this BigNumber in the specified base, or base 10 if base is omitted or is null or undefined.
     * For bases above 10, values from 10 to 35 are represented by a-z (as with Number.prototype.toString), 36 to 61 by A-Z, and 62 and 63 by $ and _ respectively.
     * If a base is specified the value is rounded according to the current DECIMAL_PLACES and ROUNDING_MODE configuration.
     * If a base is not specified, and this BigNumber has a positive exponent that is equal to or greater than the positive component of the current EXPONENTIAL_AT setting, or a negative exponent equal to or less than the negative component of the setting, then exponential notation is returned.
     * If base is null or undefined it is ignored.
     * See Errors for the treatment of other non-integer or out of range base values.
     * @param base integer, 2 to 64 inclusive
     */
    toString(base?: number): string;

    /**
     * Returns a BigNumber whose value is the value of this BigNumber truncated to a whole number.
     */
    truncated(): BigNumber;

    /**
     * Returns a BigNumber whose value is the value of this BigNumber truncated to a whole number.
     */
    trunc(): BigNumber;
}

export = BigNumber;
