import { Telegraf } from "telegraf";
import "dotenv/config";
import { idGuardMiddleware } from "./middleware/id-guard";
import { db, initDB } from "./db";
import { chatMiddleware } from "./middleware/chat";
import { helpCommand } from "./commands/help";
import { userMiddleware } from "./middleware/user";
import { birthdayCommand } from "./commands/birthday";
import { exceptionHandlerMiddleware } from "./middleware/exception-handler";

const bot = new Telegraf(process.env.BOT_TOKEN as string);

bot.use(exceptionHandlerMiddleware);
bot.use(idGuardMiddleware);
bot.use(userMiddleware);
bot.use(chatMiddleware);

bot.start(helpCommand);
bot.command("help", helpCommand);
bot.command("birthday", birthdayCommand);

await initDB();

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
