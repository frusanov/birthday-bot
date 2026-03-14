import type { MiddlewareFn, Context } from "telegraf";
import { getAllowedGroups } from "../utils/get-allowed-groups";

export const idGuardMiddleware: MiddlewareFn<Context> = async (c, next) => {
  const allowedGroups = getAllowedGroups();

  if (c.chat?.id && allowedGroups.includes(c.chat.id)) {
    return next();
  }

  return c.reply("You are not allowed to use this bot.");
};
