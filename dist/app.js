"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("restify");
const dotenv_1 = require("dotenv");
const botbuilder_1 = require("botbuilder");
const hobbyBot_1 = require("./hobbyBot");
dotenv_1.config();
const adapter = new botbuilder_1.BotFrameworkAdapter({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});
const memoryStorage = new botbuilder_1.MemoryStorage();
const conversationState = new botbuilder_1.ConversationState(memoryStorage);
const userState = new botbuilder_1.UserState(memoryStorage);
const bot = new hobbyBot_1.default(conversationState, userState, null);
let server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
    console.log(`${server.name} listening on ${server.url}`);
});
//# sourceMappingURL=app.js.map