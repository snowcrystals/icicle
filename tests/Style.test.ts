import { Style } from "../src/lib/Style.js";
import { dim } from "colorette";

function isClass(input: unknown) {
	return typeof input === "function" && typeof input.prototype === "object";
}

describe("Style", () => {
	test("Style should be a class", () => {
		expect(isClass(Style)).toBe(true);
	});

	test("Empty Constructor", () => {
		const style = new Style();
		expect(style.style).toBeDefined();
	});

	test("Empty Object Constructor", () => {
		const style = new Style({});
		expect(style.style).toBeDefined();
	});

	test("Style", () => {
		const style = new Style(dim);
		expect(style.style).toBe(dim);
	});

	test("Run", () => {
		const style = new Style(dim);
		expect(style.run("Test")).toBe(dim("Test"));
	});
});
