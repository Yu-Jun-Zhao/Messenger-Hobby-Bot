import CancelAndHelpDialog from "./cancelAndHelpDialog";
import { WaterfallDialog, WaterfallStepContext, DialogTurnResult, TextPrompt } from "botbuilder-dialogs";
import { WeatherData, DateData } from "./types";
import LocationSearch from "./locationSearch";
import DateResolverDialog from "./dateResolverDialog";
import axios from "axios";
import moment = require("moment");
import momentTimezone = require("moment-timezone");

const WATERFALL_DIALOG = "waterFallDialog";
const TEXT_PROMPT = "textPrompt";
const DATE_RESOLVER = "dateResolver";
const UTC_TO_PST_11AM = "18:00:00";

class SearchWeatherDialog extends CancelAndHelpDialog {
  constructor(id) {
    super(id || "searchWeatherDialog");

    this.addDialog(
      new WaterfallDialog(WATERFALL_DIALOG, [
        this.cityStep.bind(this),
        this.checkCityStep.bind(this),
        this.countryStep.bind(this),
        this.checkCountryStep.bind(this),
        this.timeStep.bind(this),
        this.apiStep.bind(this)
      ])
    )
      .addDialog(new TextPrompt(TEXT_PROMPT))
      .addDialog(new DateResolverDialog(DATE_RESOLVER));
  }

  async cityStep(stepContext: WaterfallStepContext): Promise<DialogTurnResult> {
    const weatherDetails: WeatherData = stepContext.options;
    if (!weatherDetails.city) {
      return await stepContext.prompt(TEXT_PROMPT, { prompt: "Please enter the city name." });
    }
    return await stepContext.next(weatherDetails.city);
  }

  async checkCityStep(stepContext: WaterfallStepContext): Promise<DialogTurnResult> {
    const weatherDetails: WeatherData = stepContext.options;

    const city = this.capitalizeCityName(stepContext.result);

    let countryCode = LocationSearch.getCountryCode(city);
    //console.log(countryCode);
    // cannot find city restart this waterfall
    if (countryCode === false) {
      return await stepContext.replaceDialog(WATERFALL_DIALOG, {});
    }
    weatherDetails.city = city;
    return await stepContext.next(countryCode);
  }

  // check if there are multiple cities name
  async countryStep(stepContext: WaterfallStepContext): Promise<DialogTurnResult> {
    const weatherDetails: WeatherData = stepContext.options;

    //capture the data from previous step
    const countryCode = stepContext.result;

    if (countryCode === true) {
      // countryCode === true more than 1 country detected
      return await stepContext.prompt(TEXT_PROMPT, {
        prompt: "Please specify the country. Enter for example: United States"
      });
    }

    return await stepContext.next(countryCode);
  }

  async checkCountryStep(stepContext: WaterfallStepContext): Promise<DialogTurnResult> {
    const weatherDetails: WeatherData = stepContext.options;
    //capture the data from previous step
    const countryCode = LocationSearch.countryNameToCode(stepContext.result);

    if (countryCode === undefined) {
      // for now restart
      return await stepContext.replaceDialog(WATERFALL_DIALOG, {});
    }

    weatherDetails.country = countryCode;
    return await stepContext.next();
  }

  async timeStep(stepContext: WaterfallStepContext): Promise<DialogTurnResult> {
    const weatherDetails: WeatherData = stepContext.options;

    //    console.log(weatherDetails.date);
    if (!weatherDetails.date) {
      return await stepContext.beginDialog(DATE_RESOLVER, { date: weatherDetails.date });
    }

    return await stepContext.next(weatherDetails.date);
  }

  async apiStep(stepContext: WaterfallStepContext): Promise<DialogTurnResult> {
    const weatherDetails: WeatherData = stepContext.options;
    weatherDetails.date = stepContext.result;
    console.log(weatherDetails.date);
    let weather;
    let temperature;
    try {
      if (weatherDetails.date.currentDay) {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${weatherDetails.city},${weatherDetails.country}&appid=${
            process.env.weatherAPIKey
          }`
        );
        weather = response.data.weather[0].description;
        temperature = this.kelvinToFah(response.data.main.temp).toFixed(2);
      } else {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${weatherDetails.city},${weatherDetails.country}&appid=${
            process.env.weatherAPIKey
          }`
        );
        const weatherList = response.data.list;

        const weatherNode = weatherList.find(element => {
          return element.dt_txt === `${weatherDetails.date.utc} ${UTC_TO_PST_11AM}`;
        });

        weather = weatherNode !== undefined ? weatherNode.weather[0].description : "not available (up to 5 days only).";
        temperature = weatherNode !== undefined ? this.kelvinToFah(weatherNode.main.temp).toFixed(2) : "N/A";
      }

      await stepContext.context.sendActivity(
        `The weather in ${weatherDetails.city}, ${weatherDetails.country} on ${
          weatherDetails.date.pdt
        } PDT/PST is ${weather}, ${temperature} degrees fahrenheit.`
      );
    } catch (err) {
      console.log(err);
    }

    return await stepContext.endDialog();
  }

  // // utils
  // isAmbiguous(date: DateData): boolean {
  //   const checkDate =
  //     date === "PRESENT_REF"
  //       ? moment()
  //           .format("YYYY-MM-DD")
  //           .toString()
  //       : date;
  //   return false; //moment(date, moment.ISO_8601) == undefined;
  // }

  capitalizeCityName(city: string): string {
    return city
      .split(" ")
      .map(city => city.charAt(0).toUpperCase() + city.slice(1))
      .join(" ");
  }

  kelvinToFah(kel: number): number {
    return (kel - 273.15) * (9 / 5) + 32;
  }
}

export default SearchWeatherDialog;
