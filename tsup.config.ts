import { defineConfig } from "tsup";

export default defineConfig({
	clean: true,
	entry: ["src/**/*.ts"],
	format: ["cjs", "esm"],
	minify: false,
	skipNodeModulesBundle: true,
	sourcemap: true,
	target: "es2020",
	dts: true,
	tsconfig: "tsconfig.build.json",
	keepNames: true,
	treeshake: true,
	bundle: true,
	splitting: false
});
