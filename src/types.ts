import type * as Colorette from "colorette";
import type { Style } from "./lib/Style.js";

export enum LogLevel {
	/**
	 * The lowest log level, used when calling {@link Logger.trace}.
	 */
	Trace = 10,

	/**
	 * The debug level, used when calling {@link Logger.debug}.
	 */
	Debug = 20,

	/**
	 * The info level, used when calling {@link Logger.info}.
	 */
	Info = 30,

	/**
	 * The warning level, used when calling {@link Logger.warn}.
	 */
	Warn = 40,

	/**
	 * The error level, used when calling {@link Logger.error}.
	 */
	Error = 50,

	/**
	 * The critical level, used when calling {@link Logger.fatal}.
	 */
	Fatal = 60,

	/**
	 * An unknown or uncategorized level.
	 */
	None = 100
}

/** The Logger options */
export interface LoggerOptions {
	/**
	 * The stream for the output logs
	 * @default process.stdout
	 */
	stdout?: NodeJS.WriteStream;

	/**
	 * The stream for the error logs
	 * @default process.stderr
	 */
	stderr?: NodeJS.WritableStream;

	/**
	 * The name of the logger
	 * @default ""
	 * @example
	 * ```typescript
	 * const logger = new Logger({ name: "SERVER" });
	 * logger.info("Hello World!"); // 2022-11-25 20:18:33 INFO » [SERVER]: Hello World!
	 * ```
	 */
	name?: string;

	/**
	 * The minimum log level
	 * @default LogLevel.Info
	 */
	level?: LogLevel;

	/**
	 * The options for the message parser
	 */
	parser?: MessageParserOptions;

	/**
	 * The options for the timestamp
	 */
	timestamp?: LoggerTimestampOptions;

	/**
	 * Customisable style options for the log level
	 */
	styles?: Partial<{
		trace: LevelStyleOptions;
		debug: LevelStyleOptions;
		info: LevelStyleOptions;
		warn: LevelStyleOptions;
		error: LevelStyleOptions;
		fatal: LevelStyleOptions;
		none: LevelStyleOptions;
		default: LevelStyleOptions;
	}>;
}

export interface LevelStyleOptions {
	/**
	 * The style options for the messages
	 */
	message?: LoggerStyleOptions;

	/**
	 * The style options for the log level
	 */
	level: LoggerStyleOptions;
}

export interface MessageParserOptions {
	/**
	 * The string that joins different messages
	 * @default " "
	 */
	join?: string;

	/**
	 * The inspect depth when logging objects
	 * @default 0
	 */
	depth?: number;
}

export interface LoggerTimestampOptions {
	/**
	 * Whether or not the date should be UTC.
	 * @default false
	 */
	utc?: boolean;

	/**
	 * The Timestamp pattern
	 * @see https://github.com/sapphiredev/utilities/tree/main/packages/timestamp#formatting-a-date
	 * @default 'YYYY-MM-DD HH:mm:ss'
	 * @example
	 * ```typescript
	 * 'YYYY-MM-DD HH:mm:ss'
	 * // 2020-12-23 22:01:10
	 * ```
	 */
	pattern?: string;

	/**
	 * An optional timestamp formatter function
	 * @default (value) => `${value} `
	 */
	formatter?: (timestamp: string) => string;

	/**
	 * The color to use.
	 * @default colorette.gray
	 */
	color?: LoggerStyleOptions;
}

/**
 * The options for {@link Style}.
 */
export interface LoggerStyleOptions {
	/**
	 * The text effects, e.g. `italic`, `strikethrough`, etc
	 */
	effects?: LoggerStyleEffect[];

	/**
	 * The text color, e.g. `red` or `yellow`
	 */
	text?: LoggerStyleText;

	/**
	 * The background color, e.g. `magenta` or `red`
	 */
	background?: LoggerStyleBackground;
}

/**
 * The value accepted by {@link Style}'s constructor. Read `colorette`'s documentation for more information.
 * @see https://www.npmjs.com/package/colorette
 */
export type LoggerStyleResolvable = Colorette.Color | LoggerStyleOptions;

/**
 * The text styles.
 */
export enum LoggerStyleEffect {
	Reset = "reset",
	Bold = "bold",
	Dim = "dim",
	Italic = "italic",
	Underline = "underline",
	Inverse = "inverse",
	Hidden = "hidden",
	Strikethrough = "strikethrough"
}

/**
 * The text colors.
 */
export enum LoggerStyleText {
	Black = "black",
	Red = "red",
	Green = "green",
	Yellow = "yellow",
	Blue = "blue",
	Magenta = "magenta",
	Cyan = "cyan",
	White = "white",
	Gray = "gray",
	BlackBright = "blackBright",
	RedBright = "redBright",
	GreenBright = "greenBright",
	YellowBright = "yellowBright",
	BlueBright = "blueBright",
	MagentaBright = "magentaBright",
	CyanBright = "cyanBright",
	WhiteBright = "whiteBright"
}

/**
 * The background colors.
 */
export enum LoggerStyleBackground {
	Black = "bgBlack",
	Red = "bgRed",
	Green = "bgGreen",
	Yellow = "bgYellow",
	Blue = "bgBlue",
	Magenta = "bgMagenta",
	Cyan = "bgCyan",
	White = "bgWhite",
	BlackBright = "bgBlackBright",
	RedBright = "bgRedBright",
	GreenBright = "bgGreenBright",
	YellowBright = "bgYellowBright",
	BlueBright = "bgBlueBright",
	MagentaBright = "bgMagentaBright",
	CyanBright = "bgCyanBright",
	WhiteBright = "bgWhiteBright"
}

export type LogMethods = "trace" | "debug" | "info" | "warn" | "error";

export interface LoggerStyles {
	level: Style;
	message?: Style;
}
