import type { QueryDeepPartialEntity } from "typeorm";
import { db } from "../db";
import { ChatEntity } from "../entities/chat.entity";
import { createDebug } from "../utils/debug";

const debug = createDebug("controllers:ChatController");

class ChatController {
  repository = db.getRepository(ChatEntity);

  async findOrCreate(tgId: number): Promise<ChatEntity> {
    debug("findOrCreate(%o)", tgId);

    let chat = await this.repository.findOneBy({ tgId });

    if (!chat) {
      debug("findOrCreate(): Chat not found. Creating new one");

      chat = this.repository.create({ tgId, settings: {} });
      await this.repository.save(chat);

      debug("findOrCreate(): New chat successfully created: %o", chat);
    } else {
      debug("findOrCreate(): Chat found: %o", chat);
    }

    return chat;
  }

  async update(
    chat: QueryDeepPartialEntity<ChatEntity> & Pick<ChatEntity, "tgId">,
  ) {
    const result = await this.repository.update({ tgId: chat.tgId }, chat);

    return result.raw[0] as ChatEntity;
  }
}

export const chatController = new ChatController();
