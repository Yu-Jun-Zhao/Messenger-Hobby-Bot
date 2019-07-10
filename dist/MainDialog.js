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
const botbuilder_dialogs_1 = require("botbuilder-dialogs");
const MAIN_WATERFALL_DIALOG = "mainWaterFallDialog";
const CONVERSATION_TEXT = "conversationText";
class MainDialog extends botbuilder_dialogs_1.ComponentDialog {
    constructor(botName) {
        super("MainDialog");
        this._botName = botName;
        this.addDialog(new botbuilder_dialogs_1.WaterfallDialog(MAIN_WATERFALL_DIALOG, [
            this.introStep.bind(this),
            this.actStep.bind(this),
            this.finalStep.bind(this)
        ])).addDialog(new botbuilder_dialogs_1.TextPrompt(CONVERSATION_TEXT));
        this.initialDialogId = MAIN_WATERFALL_DIALOG;
    }
    run(turnContext, accessor) {
        return __awaiter(this, void 0, void 0, function* () {
            const dialogSet = new botbuilder_dialogs_1.DialogSet(accessor);
            console.log(accessor);
            dialogSet.add(this);
            const dialogContext = yield dialogSet.createContext(turnContext);
            const result = yield dialogContext.continueDialog();
            if (result.status === botbuilder_dialogs_1.DialogTurnStatus.empty) {
                yield dialogContext.beginDialog(this.id);
            }
        });
    }
    introStep(stepContext) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!process.env.LuisAppId || !process.env.LuisAPIKey || !process.env.LuisAPIHostName) {
                yield stepContext.context.sendActivity("NOTE: LUIS is not configured. To enable all capabilities, add `LuisAppId`, `LuisAPIKey` and `LuisAPIHostName` to the .env file.");
                return yield stepContext.next();
            }
            yield stepContext.context.sendActivity(`My name is ${this._botName}. I am pleased to serve you.`);
            return Promise.resolve(stepContext.prompt(CONVERSATION_TEXT, {
                prompt: `What can I help you with? Ask for help if you don't know what I can do.`
            }));
        });
    }
    actStep(stepContext) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    finalStep(stepContext) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.default = MainDialog;
//# sourceMappingURL=MainDialog.js.map