import type { QueryDeepPartialEntity } from "typeorm";
import { db } from "../db";
import { ChatEntity } from "../entities/chat.entity";
import { createDebug } from "../utils/debug";
import { UserEntity } from "../entities/user.entity";

const debug = createDebug("controllers:UserController");

class UserController {
  repository = db.getRepository(UserEntity);

  async findOrCreate(tgId: number): Promise<UserEntity> {
    debug("findOrCreate(%o)", tgId);

    let user = await this.repository.findOneBy({ tgId });

    if (!user) {
      debug("findOrCreate(): User not found. Creating new one");

      user = this.repository.create({ tgId, settings: {} });
      await this.repository.save(user);

      debug("findOrCreate(): New user successfully created: %o", user);
    } else {
      debug("findOrCreate(): User found: %o", user);
    }

    return user;
  }
}

export const userController = new UserController();
