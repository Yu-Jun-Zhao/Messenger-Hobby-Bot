import * as restify from "restify";
import { config } from "dotenv";
import { BotFrameworkAdapter, ConversationState, MemoryStorage, UserState } from "botbuilder";
import HobbyBot from "./dialogs/hobbyBot";
import MainDialog from "./dialogs/MainDialog";

config();

const adapter = new BotFrameworkAdapter({
  appId: process.env.MicrosoftAppId,
  appPassword: process.env.MicrosoftAppPassword
});

adapter.onTurnError = async (context, error) => {
  console.error(`\n [onTurnError]: ${error}`);
  await context.sendActivity("Oops something went wrong");
  await conversationState.delete(context);
};

const memoryStorage: MemoryStorage = new MemoryStorage();
const conversationState: ConversationState = new ConversationState(memoryStorage);
const userState = new UserState(memoryStorage);

// name for bot
const NAME = "Clover";

// create dialog
const mainDialog: MainDialog = new MainDialog(NAME);

// TODO
const bot: HobbyBot = new HobbyBot(NAME, conversationState, userState, mainDialog);

let server = restify.createServer();

server.listen(process.env.port || process.env.PORT || 3978, () => {
  console.log(`${server.name} listening on ${server.url}`);
});

server.post("/api/messages", (req, res) => {
  adapter.processActivity(req, res, async turnContext => {
    await bot.run(turnContext); // bot base method run
  });
});
