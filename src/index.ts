//!nocheck
//!nolint
//!optimize 2

namespace StringUtilities {
	/**
	 * Uncapitalizes a string. Basically just turns the first letter to a
	 * lowercase letter.
	 *
	 * @param value
	 * @returns
	 */
	export function uncapitalize<T extends string>(value: T): Uncapitalize<T> {
		return (value.sub(1, 1).lower() + value.sub(2)) as Uncapitalize<T>;
	}

	/**
	 * Extracts a number from a string. This is more complicated than vanilla
	 * `tonumber` because it can handle strings like `"-1.0"` and `"1.0e-2"`,
	 * as well as extracting anywhere in a string.
	 *
	 * @param value
	 * @param defaultValue
	 * @returns
	 */
	export function getNumberFromString(value?: number | string, defaultValue = 0) {
		if (value === undefined) return defaultValue;
		if (typeIs(value, "string")) {
			const number = tonumber(value);
			if (number !== undefined) return number;

			const [match] = value.match("%-?%d+%.?%d*");
			return match === undefined ? defaultValue : (tonumber(match) ?? defaultValue);
		}

		return value;
	}

	const ESCAPED_CHARACTERS = ["%", "^", "$", "(", ")", ".", "[", "]", "*", "+", "-", "?"];
	const ESCAPABLE = `([%${ESCAPED_CHARACTERS.join("%")}])`;

	/**
	 * Turns strings into Lua-readable format. Returns Objects location in
	 * proper Luau format. Useful for when you are doing string-intensive
	 * coding. Those minus signs are so tricky!
	 *
	 * @author Validark
	 *
	 * @param value
	 * @returns
	 */
	export function escapeString(value: string) {
		return value.gsub(ESCAPABLE, "%%%1")[0].gsub("([\"'\\])", "\\%1")[0];
	}
}

export = StringUtilities;
