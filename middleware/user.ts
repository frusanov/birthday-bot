import type { MiddlewareFn, Context } from "telegraf";
import type { UserEntity } from "../entities/user.entity";
import { userController } from "../controllers/user.controller";

declare module "telegraf" {
  interface Context {
    userEntity: UserEntity;
  }
}

export const userMiddleware: MiddlewareFn<Context> = async (c, next) => {
  const tgUser = c.message?.from;

  if (tgUser) {
    c.userEntity = await userController.findOrCreate(tgUser.id);
  }

  return next();
};
