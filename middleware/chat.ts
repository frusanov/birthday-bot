import type { MiddlewareFn, Context } from "telegraf";
import { chatController } from "../controllers/chat.controller";
import type { ChatEntity } from "../entities/chat.entity";

declare module "telegraf" {
  interface Context {
    chatEntity?: ChatEntity;
  }
}

export const chatMiddleware: MiddlewareFn<Context> = async (c, next) => {
  const tgChat = await c.getChat();

  if (["group", "supergroup"].includes(tgChat.type)) {
    c.chatEntity = await chatController.findOrCreate(tgChat.id);
  }

  return next();
};
