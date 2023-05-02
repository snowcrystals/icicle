import { inspect, type InspectOptions } from "node:util";
import type { MessageParserOptions } from "../types.js";
import { isColorSupported } from "colorette";

/**
 * Utility class for parsing log values
 */
export class MessageParser {
	/** The string that joins different messages */
	public join: string;

	/**
	 * The inspect depth when logging objects
	 */
	public depth: number;

	public constructor(options: MessageParserOptions) {
		this.join = options.join ?? " ";
		this.depth = options.depth ?? 0;
	}

	/**
	 * Parse the provided values and turn them into a string
	 * @param values The values to parse
	 */
	public parse(...values: readonly unknown[]): string {
		const inspectOptions: InspectOptions = { colors: isColorSupported, depth: this.depth };
		return values.map((value) => (typeof value === "string" ? value : inspect(value, inspectOptions))).join(this.join);
	}
}
