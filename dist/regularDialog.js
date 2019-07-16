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
const qnaHelper_1 = require("./qnaHelper");
const luisHelper_1 = require("./luisHelper");
const searchWeatherDialog_1 = require("./searchWeatherDialog");
const WATERFALL_DIALOG = "waterFallDialog";
const TEXT_PROMPT = "textPrompt";
const SEARCH_WEATHER_DIALOG = "searchWeatherDialog";
class RegularDialog extends cancelAndHelpDialog_1.default {
    constructor(id) {
        super(id || "regularDialog");
        this._qnaHelper = new qnaHelper_1.default();
        this._luisHelper = new luisHelper_1.default();
        this.addDialog(new botbuilder_dialogs_1.TextPrompt(TEXT_PROMPT))
            .addDialog(new botbuilder_dialogs_1.WaterfallDialog(WATERFALL_DIALOG, [this.actStep.bind(this)]))
            .addDialog(new searchWeatherDialog_1.default(SEARCH_WEATHER_DIALOG));
        this.initialDialogId = WATERFALL_DIALOG;
    }
    actStep(stepContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const answers = yield this._qnaHelper.qnaQuery(stepContext.context);
            const qnaScore = answers[0] ? answers[0].score : 0;
            const intentDetail = yield this._luisHelper.executeLuisQuery(stepContext.context);
            const intentScore = intentDetail.score;
            if (intentScore >= qnaScore && intentScore >= 0.7) {
                switch (intentDetail.intent) {
                    case "SearchWeather": {
                        return yield stepContext.beginDialog(SEARCH_WEATHER_DIALOG, intentDetail.data);
                    }
                }
            }
            else if (answers[0]) {
                yield stepContext.context.sendActivity(answers[0].answer);
            }
            else {
                yield stepContext.context.sendActivity("Sorry. I do not understand what you just said.");
            }
            return yield stepContext.endDialog();
        });
    }
}
exports.default = RegularDialog;
//# sourceMappingURL=regularDialog.js.map