import { Timestamp } from "@sapphire/timestamp";
import { dim } from "colorette";

import { Style } from "../src/lib/Style.js";
import { TimeStamp } from "../src/lib/TimeStamp.js";

function isClass(input: unknown) {
	return typeof input === "function" && typeof input.prototype === "object";
}

describe("TimeStamp", () => {
	test("TimeStamp should be a class", () => {
		expect(isClass(TimeStamp)).toBe(true);
	});

	test("Empty Constructor", () => {
		const timestamp = new TimeStamp();
		expect(timestamp.utc).toBe(false);
		expect(timestamp.color).toBeInstanceOf(Style);
		expect(timestamp.formatter("Hello World")).toBe("Hello World ");
		expect(timestamp.timestamp.pattern).toBe("YYYY-MM-DD HH:mm:ss");
	});

	test("Empty Object Constructor", () => {
		const timestamp = new TimeStamp({});
		expect(timestamp.utc).toBe(false);
		expect(timestamp.color).toBeInstanceOf(Style);
		expect(timestamp.formatter("Hello World")).toBe("Hello World ");
		expect(timestamp.timestamp.pattern).toBe("YYYY-MM-DD HH:mm:ss");
	});

	test("Color", () => {
		const style = new Style(dim);
		const timestamp = new TimeStamp({ color: dim });
		expect(timestamp.color).toStrictEqual(style);
	});

	test("Formatter", () => {
		const timestamp = new TimeStamp({ formatter: (str) => `${str} - ` });
		expect(timestamp.formatter("Hello World")).toBe("Hello World - ");
	});

	test("Utc", () => {
		const timestamp = new TimeStamp({ utc: true });
		expect(timestamp.utc).toBe(true);
	});

	test("timestamp", () => {
		const timestamp = new TimeStamp({ pattern: "MMMM d YYYY[, at ]HH:mm:ss:SSS" });
		const sapphireTimestamp = new Timestamp("MMMM d YYYY[, at ]HH:mm:ss:SSS");
		expect(timestamp.timestamp).toStrictEqual(sapphireTimestamp);
	});

	test("timestamp", () => {
		const timestamp = new TimeStamp();
		const sapphireTimestamp = new Timestamp(timestamp.timestamp.pattern);

		const date = new Date();
		expect(timestamp.run()).toBe(timestamp.formatter(timestamp.color.run(sapphireTimestamp.display(date))));
	});
});
