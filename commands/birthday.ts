import type { MiddlewareFn, Context } from "telegraf";
import { createDebug } from "../utils/debug";
import type { Update } from "telegraf/types";
import { parse } from "date-fns";
import { eventController } from "../controllers/event.controller";

const debug = createDebug("commands:birthday");

export const birthdayCommand: MiddlewareFn<Context> = async (c) => {
  if (!c.chatEntity) {
    return c.reply("Please add this bot to a group chat to use this command.");
  }

  if (!c.message || !("text" in c.message)) {
    throw new Error("birthdayCommand(): No message or message text");
  }

  const date = c.message.text.split(" ")[1]?.trim();

  if (!date) {
    return c.reply(
      `Please provide your birthday in the format: /birthday dd.mm.yyyy`,
    );
  }

  await eventController.createOrUpdateBirthday(
    c.chatEntity,
    c.userEntity,
    date,
  );

  return c.reply(date);
};
