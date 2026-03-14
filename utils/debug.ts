import createRootDebug from "debug";

const debug = createRootDebug("app");

export const createDebug = debug.extend.bind(debug);
