import type { QueryDeepPartialEntity } from "typeorm";
import { db } from "../db";
import { ChatEntity } from "../entities/chat.entity";
import { createDebug } from "../utils/debug";
import { EventEntity } from "../entities/event.entity";
import { parse } from "date-fns";
import type { UserEntity } from "../entities/user.entity";

const debug = createDebug("controllers:EventController");

class EventController {
  repository = db.getRepository(EventEntity);

  async createOrUpdateBirthday(
    chat: ChatEntity,
    user: UserEntity,
    date: string,
  ) {
    debug("createOrUpdateBirthday(%o)", date);

    const dateParsed = parse(date, "dd.MM.yyyy", new Date());

    if (dateParsed.toString() === "Invalid Date") {
      throw new Error(
        `Invalid date format: ${date}. Expected format: dd.MM.yyyy`,
      );
    }
    //
    console.log({
      date: dateParsed.toString(),
    });

    debug("createOrUpdateBirthday(): Parsed date: %o", dateParsed);
  }
}

export const eventController = new EventController();
