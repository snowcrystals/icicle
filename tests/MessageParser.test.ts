import { inspect } from "node:util";
import { MessageParser } from "../src/lib/MessageParser.js";

function isClass(input: unknown) {
	return typeof input === "function" && typeof input.prototype === "object";
}

describe("MessageParser", () => {
	test("MessageParser should be a class", () => {
		expect(isClass(MessageParser)).toBe(true);
	});

	test("Empty Constructor", () => {
		const parser = new MessageParser();
		expect(parser.depth).toBe(0);
		expect(parser.join).toBe(" ");
	});

	test("Empty Object Constructor", () => {
		const parser = new MessageParser({});
		expect(parser.depth).toBe(0);
		expect(parser.join).toBe(" ");
	});

	test("Depth", () => {
		const parser = new MessageParser({ join: "\n" });
		expect(parser.join).toBe("\n");
	});

	test("Join", () => {
		const parser = new MessageParser({ depth: 2 });
		expect(parser.depth).toBe(2);
	});

	test("color", () => {
		const parser = new MessageParser({ color: false });
		expect(parser.color).toBe(false);
	});

	test("Parse", () => {
		const parser = new MessageParser({ color: false });
		expect(parser.parse("Hello", "World")).toBe("Hello World");

		const testObj = { hello: { world: { "!": true } } };
		expect(parser.parse(testObj)).toBe(inspect(testObj, { depth: 0 }));
	});
});
