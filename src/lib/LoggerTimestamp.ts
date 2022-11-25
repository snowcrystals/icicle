import { Timestamp } from "@sapphire/timestamp";
import * as colorrete from "colorette";
import { LoggerStyle } from "./LoggerStyle.js";
import type { LoggerTimestampFormatter, LoggerTimestampOptions } from "./LoggerTypes.js";

/**
 * Logger utility that formats a timestamp.
 */
export class LoggerTimestamp {
	/**
	 * The timestamp used to format the current date.
	 */
	public timestamp: Timestamp;

	/**
	 * Whether or not the logger will show a timestamp in UTC.
	 */
	public utc: boolean;

	/**
	 * The logger style to apply the color to the timestamp.
	 */
	public color: LoggerStyle | null;

	/**
	 * The final formatter.
	 */
	public formatter: LoggerTimestampFormatter;

	public constructor(options: LoggerTimestampOptions = {}) {
		this.timestamp = new Timestamp(options.pattern ?? "YYYY-MM-DD HH:mm:ss");
		this.utc = options.utc ?? false;
		this.color = options.color === null ? new LoggerStyle(colorrete.gray) : new LoggerStyle(options.color);
		this.formatter = options.formatter ?? ((timestamp) => `${timestamp} `);
	}

	/**
	 * Formats the current time.
	 */
	public run() {
		const date = new Date();
		const result = this.utc ? this.timestamp.displayUTC(date) : this.timestamp.display(date);
		return this.formatter(this.color ? this.color.run(result) : result);
	}
}
