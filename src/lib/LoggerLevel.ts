import { LoggerStyle } from "./LoggerStyle.js";
import { LoggerTimestamp } from "./LoggerTimestamp.js";
import type { LoggerLevelOptions } from "./LoggerTypes.js";

/**
 * Logger utility that stores and applies a full style into the message.
 */
export class LoggerLevel {
	/**
	 * The timestamp formatter.
	 */
	public timestamp: LoggerTimestamp | null;

	/**
	 * The infix, added between the timestamp and the message.
	 */
	public infix: string;

	/**
	 * The style formatter for the message.
	 */
	public message: LoggerStyle | null;

	public constructor(options: LoggerLevelOptions = {}) {
		this.timestamp = options.timestamp === null ? null : new LoggerTimestamp(options.timestamp);
		this.infix = options.infix ?? "";
		this.message = options.message === null ? null : new LoggerStyle(options.message);
	}

	public run(content: string) {
		const prefix = (this.timestamp?.run() ?? "") + this.infix;

		if (prefix.length) {
			const formatter = this.message ? (line: string) => prefix + this.message!.run(line) : (line: string) => prefix + line;
			return content.split("\n").map(formatter).join("\n");
		}

		return this.message ? this.message.run(content) : content;
	}
}
