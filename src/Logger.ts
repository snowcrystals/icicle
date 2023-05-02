import { Console } from "console";
import {
	LogLevel,
	type LoggerOptions,
	type LogMethods,
	type LoggerStyles,
	type LevelStyleOptions,
	type LoggerStyleOptions,
	type LoggerStyleResolvable
} from "./types.js";
import { MessageParser } from "./lib/MessageParser.js";
import { bgRed, blue, dim, isColorSupported, magenta, red, white, yellow } from "colorette";
import { TimeStamp } from "./lib/TimeStamp.js";
import { Style } from "./lib/Style.js";

export class Logger {
	/** The console the messages are written to */
	public readonly console: Console;

	/** The name of the logger */
	public readonly name?: string;

	/** The minimum log level */
	public level: LogLevel;

	public readonly levels = new Map<LogLevel, LogMethods>([
		[LogLevel.Trace, "trace"],
		[LogLevel.Debug, "debug"],
		[LogLevel.Info, "info"],
		[LogLevel.Warn, "warn"],
		[LogLevel.Error, "error"],
		[LogLevel.Fatal, "error"]
	]);

	protected parser: MessageParser;
	protected timestamp: TimeStamp;

	protected readonly styles: Map<LogLevel, LoggerStyles>;

	public constructor(options: LoggerOptions = {}) {
		this.console = new Console(options.stdout ?? process.stdout, options.stderr ?? process.stderr);

		this.name = options.name;
		this.level = options.level ?? LogLevel.Info;

		this.parser = new MessageParser(options.parser ?? {});
		this.timestamp = new TimeStamp(options.timestamp);

		this.styles = this.generateLevelStyleMap(options.styles);
	}

	/**
	 * Gets whether or not colorette is enabled.
	 */
	public static get stylize() {
		return isColorSupported;
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

		const parsed = this.parser.parse(...values);
		const method = this.levels.get(level) ?? "log";

		const styles = this.styles.get(level)!;
		const styledLevel = styles.level.run(`[${LogLevel[level].toUpperCase()}]`);

		const processed = this.process(parsed, styledLevel, styles.message);
		this.console[method](processed);
	}

	protected process(content: string, level: string, style?: Style) {
		const prefix = `${this.timestamp.run()}${level} » ${this.name ? `[${this.name}]: ` : ""}`;

		if (prefix.length) {
			const formatter = style ? (line: string) => prefix + style.run(line) : (line: string) => prefix + line;
			return content.split("\n").map(formatter).join("\n");
		}

		return style ? style.run(content) : content;
	}

	private generateLevelStyleMap(options: LoggerOptions["styles"]) {
		if (!options)
			return new Map<LogLevel, LoggerStyles>([
				[LogLevel.Trace, { level: new Style(dim) }],
				[LogLevel.Debug, { level: new Style(magenta) }],
				[LogLevel.Info, { level: new Style(blue) }],
				[LogLevel.Warn, { level: new Style(yellow) }],
				[LogLevel.Error, { level: new Style(red) }],
				[LogLevel.Fatal, { level: new Style(bgRed) }],
				[LogLevel.None, { level: new Style(white) }]
			]);

		const getStyle = (
			defaultStyle: LoggerStyleResolvable,
			style?: LoggerStyleOptions,
			overrideStyle?: LoggerStyleOptions
		): LoggerStyleResolvable => {
			if (!style && !overrideStyle) return defaultStyle;
			if (style && overrideStyle) return { ...style, ...overrideStyle };

			return style ? style : overrideStyle ?? defaultStyle;
		};

		const getStyles = (defaultStyles: LoggerStyleResolvable, styles?: LevelStyleOptions): LoggerStyles => {
			return {
				level: new Style(getStyle(defaultStyles, styles?.level, options.default?.level)),
				message: new Style(getStyle((str) => str.toString(), styles?.message, options.default?.message))
			};
		};

		return new Map<LogLevel, LoggerStyles>([
			[LogLevel.Trace, getStyles(dim, options.trace)],
			[LogLevel.Debug, getStyles(dim, options.debug)],
			[LogLevel.Info, getStyles(dim, options.info)],
			[LogLevel.Warn, getStyles(dim, options.warn)],
			[LogLevel.Error, getStyles(dim, options.error)],
			[LogLevel.Fatal, getStyles(dim, options.fatal)],
			[LogLevel.None, getStyles(dim, options.none)]
		]);
	}
}
