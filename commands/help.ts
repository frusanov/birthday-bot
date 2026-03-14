import type { MiddlewareFn, Context } from "telegraf";
import { createDebug } from "../utils/debug";

const debug = createDebug("commands:help");

export const helpCommand: MiddlewareFn<Context> = async (c) => {
  if (c.chatEntity) {
    debug(
      `helpCommand(): User ${c.message?.from.id} sent /help command in chat ${c.chatEntity.tgId}`,
    );

    return c.reply(
      `Available commands:\n\n` +
        `  /help@${c.botInfo.username} - Show this help message\n` +
        `  /birthday@${c.botInfo.username} - Add your birthday (format: /birthday@${c.botInfo.username} dd.mm.yyyy)`,
    );
  }

  debug(
    `helpCommand(): User ${c.message?.from.id} sent /help command in private chat`,
  );

  return c.reply(
    `To start uing this bot add it to a group chat and send /help@${c.botInfo.username} command there.`,
  );
};
