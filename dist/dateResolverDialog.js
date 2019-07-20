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
const cancelAndHelpDialog_1 = require("./cancelAndHelpDialog");
const botbuilder_dialogs_1 = require("botbuilder-dialogs");
const moment = require("moment");
const momentTimezone = require("moment-timezone");
const WATERFALL_DIALOG = "waterFallDialog";
const CHOICE_PROMPT = "choicePrompt";
class DateResolverDialog extends cancelAndHelpDialog_1.default {
    constructor(id) {
        super(id || "dateResolverDialog");
        this.addDialog(new botbuilder_dialogs_1.WaterfallDialog(WATERFALL_DIALOG, [this.initialStep.bind(this), this.finalStep.bind(this)])).addDialog(new botbuilder_dialogs_1.ChoicePrompt(CHOICE_PROMPT));
        this.initialDialogId = WATERFALL_DIALOG;
    }
    initialStep(stepContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = stepContext.options;
            const date = options.date;
            const promptMsg = "Choose a date. I can forecast up to 5 days.";
            const repromptMsg = "For best result, please choose an option.";
            const now = moment(momentTimezone().tz("America/Los_Angeles"));
            const dateChoice = [
                now.format("ddd YYYY-MM-DD"),
                now.add({ days: 1 }).format("ddd YYYY-MM-DD"),
                now.add({ days: 1 }).format("ddd YYYY-MM-DD"),
                now.add({ days: 1 }).format("ddd YYYY-MM-DD"),
                now.add({ days: 1 }).format("ddd YYYY-MM-DD"),
                now.add({ days: 1 }).format("ddd YYYY-MM-DD")
            ];
            if (!date) {
                return yield stepContext.prompt(CHOICE_PROMPT, {
                    prompt: promptMsg,
                    retryPrompt: repromptMsg,
                    choices: dateChoice
                });
            }
        });
    }
    finalStep(stepContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const pdt = moment(stepContext.result.value, "ddd YYYY-MM-DD").format("YYYY-MM-DD");
            const utc = pdt;
            const currentDay = pdt === moment(momentTimezone().tz("America/Los_Angeles")).format("YYYY-MM-DD");
            const dateData = {
                pdt,
                utc,
                currentDay
            };
            return yield stepContext.endDialog(dateData);
        });
    }
}
exports.default = DateResolverDialog;
//# sourceMappingURL=dateResolverDialog.js.map