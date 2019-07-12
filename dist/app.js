"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("restify");
const dotenv_1 = require("dotenv");
const botbuilder_1 = require("botbuilder");
const hobbyBot_1 = require("./hobbyBot");
const MainDialog_1 = require("./MainDialog");
dotenv_1.config();
const adapter = new botbuilder_1.BotFrameworkAdapter({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});
adapter.onTurnError = (context, error) => __awaiter(this, void 0, void 0, function* () {
    console.error(`\n [onTurnError]: ${error}`);
    yield context.sendActivity("Oops something went wrong");
    yield conversationState.delete(context);
});
const memoryStorage = new botbuilder_1.MemoryStorage();
const conversationState = new botbuilder_1.ConversationState(memoryStorage);
const userState = new botbuilder_1.UserState(memoryStorage);
const NAME = "Clover";
const mainDialog = new MainDialog_1.default(NAME);
const bot = new hobbyBot_1.default(NAME, conversationState, userState, mainDialog);
let server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
    console.log(`${server.name} listening on ${server.url}`);
});
server.post("/api/messages", (req, res) => {
    adapter.processActivity(req, res, (turnContext) => __awaiter(this, void 0, void 0, function* () {
        yield bot.run(turnContext);
    }));
});
//# sourceMappingURL=app.js.map