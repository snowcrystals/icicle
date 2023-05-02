export * from "./types.js";
export * from "./Logger.js";

import { Logger } from "./Logger.js";
const logger = new Logger({ name: "SERVER" });
logger.info("Hello World!");
