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
const moment = require("moment");
const momentTimezone = require("moment-timezone");
const MOMENT_ARR_DATE_PARSE = ["MM-DD-YYYY", "YYYY-MM-DD", "M-D-YYYY", "YYYY-M-D", "M-DD-YYYY", "YYYY-MM-D"];
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
                    const name = LuisHelper.parsePatternAny(recognizerResult, "itemName");
                    const itemType = LuisHelper.getEntityType(recognizerResult, "video", "product");
                    const platform = LuisHelper.parseListEntity(recognizerResult, "platform");
                    intentData.data = {
                        name,
                        itemType,
                        platform
                    };
                    break;
                case "Cancel":
                    break;
            }
            return intentData;
        });
    }
    static getEntityType(recognizerResult, ...entityNames) {
        for (let i = 0; i < entityNames.length; i++) {
            const entity = recognizerResult.entities[entityNames[i]];
            if (entity)
                return entityNames[i];
        }
        return undefined;
    }
    static parsePatternAny(recognizerResult, entityName) {
        const entity = recognizerResult.entities[entityName];
        if (!entity || !entity[0])
            return undefined;
        return entity[0];
    }
    static parseListEntity(recognizerResult, entityName) {
        const entity = recognizerResult.entities[entityName];
        if (!entity || !entity[0])
            return undefined;
        const itemName = entity[0][0];
        return itemName;
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
        const now = momentTimezone()
            .tz("America/Los_Angeles")
            .format("YYYY-MM-DD");
        const utc = moment(momentTimezone()
            .tz("Africa/Abidjan")
            .format("YYYY-MM-DD"));
        const text = recognizerResult.text;
        const regex = /(\d{4}|\d{2}|\d{1})[./-](\d{2}|\d{1})[./-](\d{4}|\d{2}|\d{1})/;
        const parsedArr = text.match(regex);
        const dateData = {};
        console.log("parsedArr-->" + parsedArr);
        if (parsedArr && parsedArr.length > 0 && moment(parsedArr[0], MOMENT_ARR_DATE_PARSE).isValid()) {
            dateData.pdt = moment(parsedArr[0], MOMENT_ARR_DATE_PARSE).format("YYYY-MM-DD");
            dateData.utc = moment(parsedArr[0], MOMENT_ARR_DATE_PARSE).format("YYYY-MM-DD");
            dateData.currentDay = dateData.pdt !== now ? false : true;
            return dateData;
        }
        const diffByDay = utc.diff(now, "days");
        console.log("utc: " + utc + " now:" + now + " different by days: " + diffByDay);
        dateData.utc =
            timex[0] !== "PRESENT_REF"
                ? moment(timex[0], "YYYY-MM-DD")
                    .subtract({ days: diffByDay })
                    .format("YYYY-MM-DD")
                : momentTimezone()
                    .tz("Africa/Abidjan")
                    .format("YYYY-MM-DD");
        dateData.pdt =
            timex[0] !== "PRESENT_REF"
                ? dateData.utc
                : momentTimezone()
                    .tz("America/Los_Angeles")
                    .format("YYYY-MM-DD");
        if (timex[0] === "PRESENT_REF" || timex[0].split("T")[0] === moment(utc).format("YYYY-MM-DD"))
            dateData.currentDay = true;
        else
            dateData.currentDay = false;
        return dateData;
    }
}
exports.default = LuisHelper;
//# sourceMappingURL=luisHelper.js.map