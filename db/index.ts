import { join } from "node:path";
import { DataSource } from "typeorm";
import { ChatEntity } from "../entities/chat.entity";
import { EventEntity } from "../entities/event.entity";
import { UserEntity } from "../entities/user.entity";

export const db = new DataSource({
  type: "better-sqlite3",
  database: join(process.cwd(), "/tmp/db"),
  entities: [ChatEntity, EventEntity, UserEntity],
  synchronize: true,
  // migrations: [join(process.cwd(), "/db")__dirname + '/migration/**/*{.js,.ts}']
});

export async function initDB() {
  try {
    await db.initialize();
    console.log("Data Source has been initialized!");
  } catch (error) {
    console.error("Error during Data Source initialization", error);
    throw error;
  }
}
