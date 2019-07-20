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
const axios_1 = require("axios");
const WATERFALL_DIALOG = "waterFallDialog";
const TEXT_PROMPT = "textPrompt";
const DATE_RESOLVER = "dateResolver";
const UTC_TO_PST_11AM = "18:00:00";
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
                    prompt: "Please specify the country. Enter for example: United States"
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
            if (!weatherDetails.date) {
                return yield stepContext.beginDialog(DATE_RESOLVER, { date: weatherDetails.date });
            }
            return yield stepContext.next(weatherDetails.date);
        });
    }
    apiStep(stepContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const weatherDetails = stepContext.options;
            weatherDetails.date = stepContext.result;
            console.log(weatherDetails.date);
            let weather;
            let temperature;
            try {
                if (weatherDetails.date.currentDay) {
                    const response = yield axios_1.default.get(`https://api.openweathermap.org/data/2.5/weather?q=${weatherDetails.city},${weatherDetails.country}&appid=${process.env.weatherAPIKey}`);
                    weather = response.data.weather[0].description;
                    temperature = this.kelvinToFah(response.data.main.temp).toFixed(2);
                }
                else {
                    const response = yield axios_1.default.get(`https://api.openweathermap.org/data/2.5/forecast?q=${weatherDetails.city},${weatherDetails.country}&appid=${process.env.weatherAPIKey}`);
                    const weatherList = response.data.list;
                    const weatherNode = weatherList.find(element => {
                        return element.dt_txt === `${weatherDetails.date.utc} ${UTC_TO_PST_11AM}`;
                    });
                    weather = weatherNode !== undefined ? weatherNode.weather[0].description : "not available (up to 5 days only).";
                    temperature = weatherNode !== undefined ? this.kelvinToFah(weatherNode.main.temp).toFixed(2) : "N/A";
                }
                yield stepContext.context.sendActivity(`The weather in ${weatherDetails.city}, ${weatherDetails.country} on ${weatherDetails.date.pdt} PDT/PST is ${weather}, ${temperature} degrees fahrenheit.`);
            }
            catch (err) {
                console.log(err);
            }
            return yield stepContext.endDialog();
        });
    }
    capitalizeCityName(city) {
        return city
            .split(" ")
            .map(city => city.charAt(0).toUpperCase() + city.slice(1))
            .join(" ");
    }
    kelvinToFah(kel) {
        return (kel - 273.15) * (9 / 5) + 32;
    }
}
exports.default = SearchWeatherDialog;
//# sourceMappingURL=searchWeatherDialog.js.map