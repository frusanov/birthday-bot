import type { MiddlewareFn, Context } from "telegraf";

export const exceptionHandlerMiddleware: MiddlewareFn<Context> = async (
  c,
  next,
) => {
  try {
    await next();
  } catch (e) {
    return c.reply(
      (e as Error)?.message ||
        "An error occurred while processing your request.",
    );
  }
};
