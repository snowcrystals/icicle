import { Timestamp } from "@sapphire/timestamp";
import type { LoggerTimestampOptions } from "../types.js";
import * as colorette from "colorette";
import { Style } from "./Style.js";

/**
 * Logger utility that formats a timestamp.
 */
export class TimeStamp {
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
	public color: Style;

	/**
	 * The final formatter.
	 */
	public formatter: (timestamp: string) => string;

	public constructor(options: LoggerTimestampOptions = {}) {
		this.timestamp = new Timestamp(options.pattern ?? "YYYY-MM-DD HH:mm:ss");
		this.color = options.color ? new Style(options.color) : new Style(colorette.gray);
		this.formatter = options.formatter ?? ((timestamp) => `${timestamp} `);
		this.utc = options.utc ?? false;
	}

	/**
	 * Formats the current time
	 */
	public run(): string {
		const date = new Date();
		const result = this.utc ? this.timestamp.displayUTC(date) : this.timestamp.display(date);
		const colored = this.color ? this.color.run(result) : result;

		return this.formatter(colored);
	}
}
