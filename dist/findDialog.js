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
const FIND_WATERFALL = "findWaterfall";
const TEXT_PROMPT = "textPrompt";
const CHOOSE_PROMPT = "choosePrompt";
const START_VIDEO_WATERFALL = "startVideoWaterfall";
const FIND_VIDEO_WATERFALL = "findVideoWaterfall";
const NUMBER_PROMPT = "numberPrompt";
class FindDialog extends cancelAndHelpDialog_1.default {
    constructor(id) {
        super(id || "FindDialog");
        this.addDialog(new botbuilder_dialogs_1.WaterfallDialog(FIND_WATERFALL, [
            this.choiceStep.bind(this),
            this.nameStep.bind(this),
            this.splitStep.bind(this)
        ]))
            .addDialog(new botbuilder_dialogs_1.ChoicePrompt(CHOOSE_PROMPT))
            .addDialog(new FindVideoDialog(START_VIDEO_WATERFALL))
            .addDialog(new botbuilder_dialogs_1.TextPrompt(TEXT_PROMPT));
        this.initialDialogId = FIND_WATERFALL;
    }
    choiceStep(stepContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const youtubeData = stepContext.options;
            if (!youtubeData.itemType && !youtubeData.platform) {
                return yield stepContext.prompt(CHOOSE_PROMPT, {
                    prompt: "video or products(Not supported yet)?",
                    choices: ["video", "product"]
                });
            }
            return yield stepContext.next({ value: youtubeData.itemType });
        });
    }
    nameStep(stepContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const youtubeData = stepContext.options;
            youtubeData.itemType = stepContext.result.value;
            if (!youtubeData.name) {
                return yield stepContext.prompt(TEXT_PROMPT, {
                    prompt: `What is the ${youtubeData.itemType} name?`
                });
            }
            return yield stepContext.next(youtubeData.name);
        });
    }
    splitStep(stepContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const youtubeData = stepContext.options;
            youtubeData.name = stepContext.result;
            console.log(youtubeData);
            if (youtubeData.platform === "youtube") {
                return yield stepContext.beginDialog(START_VIDEO_WATERFALL, stepContext.options);
            }
            else if (youtubeData.platform === "amazon") {
            }
            if (youtubeData.itemType === "video") {
                return yield stepContext.beginDialog(START_VIDEO_WATERFALL, stepContext.options);
            }
            else if (youtubeData.itemType === "product") {
            }
            return yield stepContext.endDialog();
        });
    }
}
exports.FindDialog = FindDialog;
class FindVideoDialog extends cancelAndHelpDialog_1.default {
    constructor(id) {
        super(id || "findVideoDialog");
        this.addDialog(new botbuilder_dialogs_1.WaterfallDialog(FIND_VIDEO_WATERFALL, [this.numberStep.bind(this), this.apiStep.bind(this)])).addDialog(new botbuilder_dialogs_1.NumberPrompt(NUMBER_PROMPT, this.resultsPromptValidator.bind(this)));
        this.initialDialogId = FIND_VIDEO_WATERFALL;
    }
    numberStep(stepContext) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield stepContext.prompt(NUMBER_PROMPT, {
                prompt: "How many videos do you want? Max:10"
            });
        });
    }
    apiStep(stepContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const youtubeData = stepContext.options;
            const numOfVideo = stepContext.result;
            yield stepContext.context.sendActivity(`Searching for ${youtubeData.name} on Youtube. Testing #${numOfVideo}. Testing itemType: ${youtubeData.itemType}. Testing platform: ${youtubeData.platform}`);
            return yield stepContext.endDialog();
        });
    }
    resultsPromptValidator(promptContext) {
        return __awaiter(this, void 0, void 0, function* () {
            return promptContext.recognized.value > 0 && promptContext.recognized.value <= 10;
        });
    }
}
exports.FindVideoDialog = FindVideoDialog;
//# sourceMappingURL=findDialog.js.map