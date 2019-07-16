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
const locationSearch_1 = require("./locationSearch");
const dateResolverDialog_1 = require("./dateResolverDialog");
const moment = require("moment");
const WATERFALL_DIALOG = "waterFallDialog";
const TEXT_PROMPT = "textPrompt";
const DATE_RESOLVER = "dateResolver";
class SearchWeatherDialog extends cancelAndHelpDialog_1.default {
    constructor(id) {
        super(id || "searchWeatherDialog");
        this.addDialog(new botbuilder_dialogs_1.WaterfallDialog(WATERFALL_DIALOG, [
            this.cityStep.bind(this),
            this.checkCityStep.bind(this),
            this.countryStep.bind(this),
            this.checkCountryStep.bind(this),
            this.timeStep.bind(this),
            this.apiStep.bind(this)
        ]))
            .addDialog(new botbuilder_dialogs_1.TextPrompt(TEXT_PROMPT))
            .addDialog(new dateResolverDialog_1.default(DATE_RESOLVER));
    }
    cityStep(stepContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const weatherDetails = stepContext.options;
            if (!weatherDetails.city) {
                return yield stepContext.prompt(TEXT_PROMPT, { prompt: "Please enter the city name." });
            }
            return yield stepContext.next(weatherDetails.city);
        });
    }
    checkCityStep(stepContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const weatherDetails = stepContext.options;
            const city = this.capitalizeCityName(stepContext.result);
            let countryCode = locationSearch_1.default.getCountryCode(city);
            if (countryCode === false) {
                return yield stepContext.replaceDialog(WATERFALL_DIALOG, {});
            }
            weatherDetails.city = city;
            return yield stepContext.next(countryCode);
        });
    }
    countryStep(stepContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const weatherDetails = stepContext.options;
            const countryCode = stepContext.result;
            if (countryCode === true) {
                return yield stepContext.prompt(TEXT_PROMPT, {
                    prompt: "Please specify the country. Do not enter shorthanded code. Enter for example: United States"
                });
            }
            return yield stepContext.next(countryCode);
        });
    }
    checkCountryStep(stepContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const weatherDetails = stepContext.options;
            const countryCode = locationSearch_1.default.countryNameToCode(stepContext.result);
            if (countryCode === undefined) {
                return yield stepContext.replaceDialog(WATERFALL_DIALOG, {});
            }
            weatherDetails.country = countryCode;
            return yield stepContext.next();
        });
    }
    timeStep(stepContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const weatherDetails = stepContext.options;
            console.log(weatherDetails.date);
            if (!weatherDetails.date || this.isAmbiguous(weatherDetails.date)) {
                return yield stepContext.beginDialog(DATE_RESOLVER, { date: weatherDetails.date });
            }
            return yield stepContext.next(weatherDetails.date);
        });
    }
    apiStep(stepContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const weatherDetails = stepContext.options;
            weatherDetails.date = stepContext.result !== "PRESEN" ? stepContext.result : moment().format("YYYY-MM-DD");
            yield stepContext.context.sendActivity(`${weatherDetails.city}, ${weatherDetails.country} : ${weatherDetails.date}`);
            return yield stepContext.endDialog();
        });
    }
    isAmbiguous(date) {
        return moment(date, moment.ISO_8601) == undefined;
    }
    capitalizeCityName(city) {
        return city
            .split(" ")
            .map(city => city.charAt(0).toUpperCase() + city.slice(1))
            .join(" ");
    }
}
exports.default = SearchWeatherDialog;
//# sourceMappingURL=searchWeatherDialog.js.map