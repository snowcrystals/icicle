import * as Colorette from "colorette";
import type { LoggerStyleResolvable } from "./LoggerTypes.js";

/**
 * Logger utility that applies a style to a string.
 */
export class LoggerStyle {
	public readonly style: Colorette.Color;

	public constructor(resolvable: LoggerStyleResolvable = {}) {
		if (typeof resolvable === "function") {
			this.style = resolvable;
		} else {
			const styles: Colorette.Color[] = [];
			if (resolvable.effects) styles.push(...resolvable.effects.map((text) => Colorette[text]));
			if (resolvable.text) styles.push(Colorette[resolvable.text]);
			if (resolvable.background) styles.push(Colorette[resolvable.background]);

			this.style = styles.length
				? styles.length === 1
					? styles[0]
					: (string) => styles.reduce((out, style) => style(out), string) as string
				: Colorette.reset;
		}
	}

	/**
	 * Applies the style to a string.
	 * @param string The value to apply the style to.
	 */
	public run(string: string | number) {
		return this.style(string);
	}
}
