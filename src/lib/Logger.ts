/**
 * Build from https://github.com/sapphiredev/plugins/tree/main/packages/logger and https://github.com/ijsKoud/sapphire-logger
 */
import { bgRed, dim, magenta, isColorSupported, red, white, yellow, Color, blue } from "colorette";
import { Console } from "console";
import { inspect, InspectOptions } from "util";
import { LoggerLevel } from "./LoggerLevel.js";
import { LoggerFormatOptions, LoggerLevelOptions, LoggerOptions, LogLevel, LogMethods } from "./LoggerTypes.js";

/**
 * The logger class.
 */
export class Logger {
	/**
	 * The console this writes to.
	 */
	public readonly console: Console;

	/**
	 * The formats supported by the logger.
	 */
	public readonly formats: Map<LogLevel, LoggerLevel>;

	/**
	 * The string `write` will join values by.
	 */
	public readonly join: string;

	/**
	 * The inspect depth when logging objects.
	 */
	public readonly depth: number;

	public level: LogLevel;

	public constructor(options: LoggerOptions = {}) {
		this.console = options.console ?? new Console(options.stdout ?? process.stdout, options.stderr ?? process.stderr);
		this.formats = Logger.createFormatMap(options.format, options.defaultFormat);
		this.join = options.join ?? " ";
		this.depth = options.depth ?? 0;
		this.level = options.level ?? LogLevel.Info;
	}

	/**
	 * Checks whether a level is supported.
	 * @param level The level to check.
	 */
	public has(level: LogLevel): boolean {
		return level >= this.level;
	}

	/**
	 * Alias of Logger.write with {@link LogLevel.Trace} as level.
	 * @param values The values to log.
	 */
	public trace(...values: readonly unknown[]): void {
		this.write(LogLevel.Trace, ...values);
	}

	/**
	 * Alias of Logger.write with {@link LogLevel.Debug} as level.
	 * @param values The values to log.
	 */
	public debug(...values: readonly unknown[]): void {
		this.write(LogLevel.Debug, ...values);
	}

	/**
	 * Alias of Logger.write with {@link LogLevel.Info} as level.
	 * @param values The values to log.
	 */
	public info(...values: readonly unknown[]): void {
		this.write(LogLevel.Info, ...values);
	}

	/**
	 * Alias of Logger.write with {@link LogLevel.Warn} as level.
	 * @param values The values to log.
	 */
	public warn(...values: readonly unknown[]): void {
		this.write(LogLevel.Warn, ...values);
	}

	/**
	 * Alias of Logger.write with {@link LogLevel.Error} as level.
	 * @param values The values to log.
	 */
	public error(...values: readonly unknown[]): void {
		this.write(LogLevel.Error, ...values);
	}

	/**
	 * Alias of Logger.write with {@link LogLevel.Fatal} as level.
	 * @param values The values to log.
	 */
	public fatal(...values: readonly unknown[]): void {
		this.write(LogLevel.Fatal, ...values);
	}

	/**
	 * Writes the log message given a level and the value(s).
	 * @param level The log level.
	 * @param values The values to log.
	 */
	public write(level: LogLevel, ...values: readonly unknown[]): void {
		if (level < this.level) return;

		const method = this.levels.get(level) ?? "log";
		const formatter = this.formats.get(level) ?? this.formats.get(LogLevel.None)!;

		this.console[method](formatter.run(this.preprocess(values)));
	}

	/**
	 * Pre-processes an array of values.
	 * @param values The values to pre-process.
	 */
	protected preprocess(values: readonly unknown[]) {
		const inspectOptions: InspectOptions = { colors: isColorSupported, depth: this.depth };
		return values.map((value) => (typeof value === "string" ? value : inspect(value, inspectOptions))).join(this.join);
	}

	private get levels() {
		return Reflect.get(Logger, "levels") as Map<LogLevel, LogMethods>;
	}

	/**
	 * Gets whether or not colorette is enabled.
	 */
	public static get stylize() {
		return isColorSupported;
	}

	protected static readonly levels = new Map<LogLevel, LogMethods>([
		[LogLevel.Trace, "trace"],
		[LogLevel.Debug, "debug"],
		[LogLevel.Info, "info"],
		[LogLevel.Warn, "warn"],
		[LogLevel.Error, "error"],
		[LogLevel.Fatal, "error"]
	]);

	private static createFormatMap(options: LoggerFormatOptions = {}, defaults: LoggerLevelOptions = options.none ?? {}) {
		const clear = (str: string | number) => str.toString();
		const getColor = (lvlOptions?: LoggerLevelOptions): ColorFunction | false => {
			if ((options.none && !options.none?.level) || (lvlOptions && !lvlOptions.level)) return clear;

			return false;
		};
		return new Map<LogLevel, LoggerLevel>([
			[LogLevel.Trace, Logger.ensureDefaultLevel(options.trace, defaults, getColor() || dim, "TRACE")],
			[LogLevel.Debug, Logger.ensureDefaultLevel(options.debug, defaults, getColor() || magenta, "DEBUG")],
			[LogLevel.Info, Logger.ensureDefaultLevel(options.info, defaults, getColor() || blue, "INFO")],
			[LogLevel.Warn, Logger.ensureDefaultLevel(options.warn, defaults, getColor() || yellow, "WARN")],
			[LogLevel.Error, Logger.ensureDefaultLevel(options.error, defaults, getColor() || red, "ERROR")],
			[LogLevel.Fatal, Logger.ensureDefaultLevel(options.fatal, defaults, getColor() || bgRed, "FATAL")],
			[LogLevel.None, Logger.ensureDefaultLevel(options.none, defaults, getColor() || white, "")]
		]);
	}

	private static ensureDefaultLevel(options: LoggerLevelOptions | undefined, defaults: LoggerLevelOptions, color: Color, name: string) {
		if (options) return new LoggerLevel(options);
		return new LoggerLevel({
			...defaults,
			timestamp: defaults.timestamp === null ? null : { ...(defaults.timestamp ?? {}), color: null },
			infix: name.length ? `${color(`[${name}]`.padEnd(7, " "))} » ` : ""
		});
	}
}

type ColorFunction = (str: string | number) => string;
