import { Logger, LogLevel } from "../src/index.js";

const levels = [LogLevel.Trace, LogLevel.Debug, LogLevel.Info, LogLevel.Warn, LogLevel.Error, LogLevel.Fatal, LogLevel.Trace] as const;

function isClass(input: unknown) {
	return typeof input === "function" && typeof input.prototype === "object";
}

describe("Logger", () => {
	test("Logger should be a class", () => {
		expect(isClass(Logger)).toBe(true);
	});

	test("Empty Constructor", () => {
		const logger = new Logger();
		levels.forEach((level) => expect(logger.levels.has(level)).toBe(true));

		expect(logger.console).toBeDefined();
		expect(logger.name).toBe(undefined);
		expect(logger.level).toBe(LogLevel.Info);
	});

	test("Empty Object Constructor", () => {
		const logger = new Logger({});
		levels.forEach((level) => expect(logger.levels.has(level)).toBe(true));

		expect(logger.console).toBeDefined();
		expect(logger.name).toBe(undefined);
		expect(logger.level).toBe(LogLevel.Info);
	});

	test("Level", () => {
		const logger = new Logger({ level: LogLevel.Debug });
		expect(logger.level).toBe(LogLevel.Debug);
	});

	test("Name", () => {
		const logger = new Logger({ name: "test" });
		expect(logger.name).toBe("test");
	});
});
