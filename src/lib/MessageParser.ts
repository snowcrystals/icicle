import { inspect, type InspectOptions } from "node:util";

import { isColorSupported } from "colorette";

import type { MessageParserOptions } from "../types.js";

/**
 * Utility class for parsing log values
 */
export class MessageParser {
	/** The string that joins different messages */
	public readonly join: string;

	/** The inspect depth when logging objects */
	public readonly depth: number;

	/** Whether colored output is allowed or not */
	public readonly color: boolean;

	public constructor(options: MessageParserOptions = {}) {
		this.join = options.join ?? " ";
		this.depth = options.depth ?? 0;
		this.color = options.color ?? isColorSupported;
	}

	/**
	 * Parse the provided values and turn them into a string
	 * @param values The values to parse
	 */
	public parse(...values: readonly unknown[]): string {
		const inspectOptions: InspectOptions = { colors: this.color, depth: this.depth };
		return values.map((value) => (typeof value === "string" ? value : inspect(value, inspectOptions))).join(this.join);
	}
}
