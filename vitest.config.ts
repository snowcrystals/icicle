import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		globals: true
		// coverage: {
		// 	provider: "c8",
		// 	enabled: true,
		// 	reporter: ["text", "lcov", "clover"],
		// 	exclude: ["**/node_modules/**", "**/dist/**", "**/tests/**"]
		// }
	},
	esbuild: {
		target: "ES2020"
	}
});
