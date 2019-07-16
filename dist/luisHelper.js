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
                score: intent !== "None" ? recognizerResult.intents[intent].score : 0,
                data: {}
            };
            switch (intentData.intent) {
                case "SearchWeather": {
                    const city = LuisHelper.geographyEntity(recognizerResult);
                    const date = LuisHelper.parseDateTimeEntity(recognizerResult);
                    intentData.data = {
                        city,
                        date
                    };
                    break;
                }
                case "Find":
                    break;
                case "FindVideo":
                    break;
                case "Cancel":
                    break;
            }
            return intentData;
        });
    }
    static parseEntity(recognizerResult, entityName) {
        const entity = recognizerResult.entities[entityName];
        if (!entity || !entity[0])
            return undefined;
        return entity[0];
    }
    static geographyEntity(recognizerResult) {
        const geoEntity = recognizerResult.entities["geographyV2_city"];
        if (!geoEntity || !geoEntity[0])
            return undefined;
        const nameArr = geoEntity[0].split(" ");
        const name = nameArr
            .map(element => {
            return element.charAt(0).toUpperCase() + element.slice(1);
        })
            .join(" ");
        return name;
    }
    static parseDateTimeEntity(recognizerResult) {
        const dateTimeEntity = recognizerResult.entities["datetime"];
        if (!dateTimeEntity || !dateTimeEntity[0])
            return undefined;
        const timex = dateTimeEntity[0]["timex"];
        if (!timex || !timex[0])
            return undefined;
        return timex[0].split("T")[0];
    }
}
exports.default = LuisHelper;
//# sourceMappingURL=luisHelper.js.map