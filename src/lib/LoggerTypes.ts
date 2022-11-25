import type * as colorette from "colorette";

export const enum LogLevel {
	/**
	 * The lowest log level, used when calling {@link ILogger.trace}.
	 */
	Trace = 10,

	/**
	 * The debug level, used when calling {@link ILogger.debug}.
	 */
	Debug = 20,

	/**
	 * The info level, used when calling {@link ILogger.info}.
	 */
	Info = 30,

	/**
	 * The warning level, used when calling {@link ILogger.warn}.
	 */
	Warn = 40,

	/**
	 * The error level, used when calling {@link ILogger.error}.
	 */
	Error = 50,

	/**
	 * The critical level, used when calling {@link ILogger.fatal}.
	 */
	Fatal = 60,

	/**
	 * An unknown or uncategorized level.
	 */
	None = 100
}

/**
 * The logger options.
 */
export interface LoggerOptions {
	/**
	 * The Console for the logs.
	 * @default Console
	 */
	console?: Console;
	/**
	 * The WriteStream for the output logs.
	 * @default process.stdout
	 */
	stdout?: NodeJS.WriteStream;

	/**
	 * A WriteStream for the error logs.
	 * @default process.stderr
	 */
	stderr?: NodeJS.WriteStream;

	/**
	 * The default options used to fill all the possible values for {@link LoggerOptions.format}.
	 * @default options.format.none ?? {}
	 */
	defaultFormat?: LoggerLevelOptions;

	/**
	 * The options for each log level. LogLevel.None serves to set the default for all keys, where only
	 * {@link LoggerTimestampOptions.timestamp} and {@link LoggerLevelOptions.prefix} would be overridden.
	 * @default {}
	 */
	format?: LoggerFormatOptions;

	/**
	 * The minimum log level.
	 * @default LogLevel.Info
	 */
	level?: LogLevel;

	/**
	 * The string that joins different messages.
	 * @default ' '
	 */
	join?: string;

	/**
	 * The inspect depth when logging objects.
	 * @default 0
	 */
	depth?: number;
}

/**
 * The logger format options.
 */
export interface LoggerFormatOptions {
	/**
	 * The logger options for the lowest log level, used when calling {@link ILogger.trace}.
	 */
	trace?: LoggerLevelOptions;

	/**
	 * The logger options for the debug level, used when calling {@link ILogger.debug}.
	 */
	debug?: LoggerLevelOptions;

	/**
	 * The logger options for the info level, used when calling {@link ILogger.info}.
	 */
	info?: LoggerLevelOptions;

	/**
	 * The logger options for the warning level, used when calling {@link ILogger.warn}.
	 */
	warn?: LoggerLevelOptions;

	/**
	 * The logger options for the error level, used when calling {@link ILogger.error}.
	 */
	error?: LoggerLevelOptions;

	/**
	 * The logger options for the critical level, used when calling {@link ILogger.fatal}.
	 */
	fatal?: LoggerLevelOptions;

	/**
	 * The logger options for an unknown or uncategorised level.
	 */
	none?: LoggerLevelOptions;
}

/**
 * The options for {@link LoggerLevel}.
 */
export interface LoggerLevelOptions {
	/**
	 * The timestamp options. Set to `null` to disable timestamp parsing.
	 * @default {}
	 */
	timestamp?: LoggerTimestampOptions | null;

	/**
	 * The infix to be included between the timestamp and the message.
	 * @default ''
	 */
	infix?: string;

	/**
	 * The style options for the message.
	 * @default colorette.clear
	 */
	message?: LoggerStyleResolvable | null;

	/**
	 * The style options for the level.
	 * @default true
	 */
	level?: boolean;
}

/**
 * The options for {@link LoggerTimestamp}.
 */
export interface LoggerTimestampOptions {
	/**
	 * The {@link Timestamp} pattern.
	 * @default 'YYYY-MM-DD HH:mm:ss'
	 * @example
	 * ```typescript
	 * 'YYYY-MM-DD HH:mm:ss'
	 * // 2020-12-23 22:01:10
	 * ```
	 */
	pattern?: string;

	/**
	 * Whether or not the date should be UTC.
	 * @default false
	 */
	utc?: boolean;

	/**
	 * The color to use.
	 * @default colorette.gray
	 */
	color?: LoggerStyleResolvable | null;

	/**
	 * The formatter. See {@link LoggerTimestampFormatter} for more information.
	 * @default (value) => `${value} - `
	 */
	formatter?: LoggerTimestampFormatter;
}

/**
 * The formatter used for {@link LoggerTimestampOptions}. This will be run **after** applying the color to the formatter.
 */
export interface LoggerTimestampFormatter {
	/**
	 * @param timestamp The output of {@link LoggerStyle.run} on {@link Timestamp.display}/{@link Timestamp.displayUTC}.
	 */
	(timestamp: string): string;
}

/**
 * The options for {@link LoggerStyle}.
 */
export interface LoggerStyleOptions {
	/**
	 * The text effects, e.g. `italic`, `strikethrough`, etc.
	 */
	effects?: LoggerStyleEffect[];

	/**
	 * The text color, e.g. `red` or `yellow`.
	 */
	text?: LoggerStyleText;

	/**
	 * The background color, e.g. `magenta` or `red`.
	 */
	background?: LoggerStyleBackground;
}

/**
 * The value accepted by {@link LoggerStyle}'s constructor. Read `colorette`'s documentation for more information.
 * @seealso https://www.npmjs.com/package/colorette
 */
export type LoggerStyleResolvable = colorette.Color | LoggerStyleOptions;

/**
 * The text styles.
 */
export const enum LoggerStyleEffect {
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
export const enum LoggerStyleText {
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
export const enum LoggerStyleBackground {
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
