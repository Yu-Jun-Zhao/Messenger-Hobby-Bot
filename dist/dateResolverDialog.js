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
const WATERFALL_DIALOG = "waterFallDialog";
const DATETIME_PROMPT = "dateTimePrompt";
class DateResolverDialog extends cancelAndHelpDialog_1.default {
    constructor(id) {
        super(id || "dateResolverDialog");
        this.addDialog(new botbuilder_dialogs_1.WaterfallDialog(WATERFALL_DIALOG, [this.initialStep.bind(this), this.finalStep.bind(this)])).addDialog(new botbuilder_dialogs_1.DateTimePrompt(DATETIME_PROMPT, this.dateTimePromptValidator.bind(this)));
        this.initialDialogId = WATERFALL_DIALOG;
    }
    initialStep(stepContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = stepContext.options;
            const date = options.date;
            const promptMsg = "Enter a date. I can forecast up to 5 days. Try saying 'tomorrow' or '2 days from now.'";
            const repromptMsg = "For best result, please enter the date including month, day, and year.";
            if (!date) {
                return yield stepContext.prompt(DATETIME_PROMPT, {
                    prompt: promptMsg,
                    retryPrompt: repromptMsg
                });
            }
            else {
                const time = moment(date, moment.ISO_8601);
                console.log("time:-->" + time);
                if (time != undefined) {
                    return yield stepContext.prompt(DATETIME_PROMPT, { prompt: repromptMsg });
                }
                else {
                    return yield stepContext.next({ timex: time });
                }
            }
        });
    }
    finalStep(stepContext) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(stepContext.result[0].timex);
            return yield stepContext.endDialog(stepContext.result[0].timex);
        });
    }
    dateTimePromptValidator(promptContext) {
        return __awaiter(this, void 0, void 0, function* () {
            if (promptContext.recognized.succeeded) {
                const timex = promptContext.recognized.value[0].timex.split("T")[0];
                return moment(timex, moment.ISO_8601) != undefined;
            }
            else {
                return false;
            }
        });
    }
}
exports.default = DateResolverDialog;
//# sourceMappingURL=dateResolverDialog.js.map