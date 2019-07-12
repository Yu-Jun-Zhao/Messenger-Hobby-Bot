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
const WATERFALL_DIALOG = "waterFallDialog";
const TEXT_PROMPT = "textPrompt";
class RegularDialog extends cancelAndHelpDialog_1.default {
    constructor(id) {
        super(id || "regularDialog");
        this._qnaHelper = new qnaHelper_1.default();
        this.addDialog(new botbuilder_dialogs_1.TextPrompt(TEXT_PROMPT)).addDialog(new botbuilder_dialogs_1.WaterfallDialog(WATERFALL_DIALOG, [this.actStep.bind(this)]));
        this.initialDialogId = WATERFALL_DIALOG;
    }
    actStep(stepContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const answers = yield this._qnaHelper.qnaQuery(stepContext.context);
            yield stepContext.context.sendActivity(answers[0].answer);
            return yield stepContext.endDialog();
        });
    }
}
exports.default = RegularDialog;
//# sourceMappingURL=regularDialog.js.map