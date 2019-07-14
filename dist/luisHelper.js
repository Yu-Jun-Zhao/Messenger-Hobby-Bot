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
const botbuilder_ai_1 = require("botbuilder-ai");
class LuisHelper {
    constructor() {
        this._luisRecognizer = new botbuilder_ai_1.LuisRecognizer({
            applicationId: process.env.LuisAppId,
            endpointKey: process.env.LuisAPIKey,
            endpoint: `https://${process.env.LuisAPIHostName}`
        });
    }
    executeLuisQuery(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const recognizerResult = yield this._luisRecognizer.recognize(context);
            const intent = botbuilder_ai_1.LuisRecognizer.topIntent(recognizerResult, "None", 0.7);
            let intentData = {
                intent,
                score: recognizerResult.intents["SearchWeather"].score
            };
            switch (intentData.intent) {
                case "SearchWeather":
                    break;
                case "Find":
                    break;
                case "FindVideo":
                    break;
                case "Cancel":
                    break;
                case "None":
                    break;
            }
            return intentData;
        });
    }
}
exports.default = LuisHelper;
//# sourceMappingURL=luisHelper.js.map