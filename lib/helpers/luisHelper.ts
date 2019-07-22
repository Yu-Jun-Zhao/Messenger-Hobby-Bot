import { LuisRecognizer } from "botbuilder-ai";
import { TurnContext, RecognizerResult } from "botbuilder";
import { IntentDetail, DateData } from "./types";
import moment = require("moment");
import momentTimezone = require("moment-timezone");

const MOMENT_ARR_DATE_PARSE = ["MM-DD-YYYY", "YYYY-MM-DD", "M-D-YYYY", "YYYY-M-D", "M-DD-YYYY", "YYYY-MM-D"];

class LuisHelper {
  private _luisRecognizer: LuisRecognizer;

  constructor() {
    this._luisRecognizer = new LuisRecognizer({
      applicationId: process.env.LuisAppId,
      endpointKey: process.env.LuisAPIKey,
      endpoint: `https://${process.env.LuisAPIHostName}`
    });
  }

  async executeLuisQuery(context: TurnContext): Promise<IntentDetail> {
    const recognizerResult = await this._luisRecognizer.recognize(context);
    const intent = LuisRecognizer.topIntent(recognizerResult, "None", 0.7);
    let intentData: IntentDetail = {
      intent,
      score: intent !== "None" ? recognizerResult.intents[intent].score : 0,
      data: {}
    };

    switch (intentData.intent) {
      case "SearchWeather": {
        const city = LuisHelper.geographyEntity(recognizerResult);
        const date: DateData = LuisHelper.parseDateTimeEntity(recognizerResult);
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
  }

  //get the name of the entity
  // returns video or product or ....
  static getEntityType(recognizerResult: RecognizerResult, ...entityNames: string[]): string {
    for (let i = 0; i < entityNames.length; i++) {
      const entity = recognizerResult.entities[entityNames[i]];
      if (entity) return entityNames[i];
    }

    return undefined;
  }

  static parsePatternAny(recognizerResult: RecognizerResult, entityName: string): string {
    const entity = recognizerResult.entities[entityName];
    if (!entity || !entity[0]) return undefined;
    return entity[0];
  }

  // get the text value within the entity
  static parseListEntity(recognizerResult: RecognizerResult, entityName: string): string {
    //console.log(recognizerResult.entities);
    const entity = recognizerResult.entities[entityName];
    if (!entity || !entity[0]) return undefined;

    const itemName = entity[0][0]; // list parsing

    return itemName;
  }

  static geographyEntity(recognizerResult: RecognizerResult): string {
    const geoEntity = recognizerResult.entities["geographyV2_city"];
    // console.log(recognizerResult.entities);
    if (!geoEntity || !geoEntity[0]) return undefined;

    const nameArr = geoEntity[0].split(" ");

    const name = nameArr
      .map(element => {
        return element.charAt(0).toUpperCase() + element.slice(1);
      })
      .join(" ");

    //console.log(name);

    return name;
  }

  //TODO: Fix mini bug
  //Depreciated way of parsing date: Does not accurately parse date with words: September, October, etc
  // Will be enhanced in later version
  static parseDateTimeEntity(recognizerResult: RecognizerResult): DateData {
    // gets date values from recognizerresult.entities
    const dateTimeEntity = recognizerResult.entities["datetime"];

    if (!dateTimeEntity || !dateTimeEntity[0]) return undefined;

    const timex = dateTimeEntity[0]["timex"];

    if (!timex || !timex[0]) return undefined;

    //current time in pst
    const now = momentTimezone()
      .tz("America/Los_Angeles")
      .format("YYYY-MM-DD");

    //current time in utc
    const utc = moment(
      momentTimezone()
        .tz("Africa/Abidjan")
        .format("YYYY-MM-DD")
    );

    // manually parsing the exact date. Because "tomorrow -> UTC" vs "exact date e.g. YYYY-MM-DD"
    const text: string = recognizerResult.text;
    const regex: RegExp = /(\d{4}|\d{2}|\d{1})[./-](\d{2}|\d{1})[./-](\d{4}|\d{2}|\d{1})/;
    const parsedArr = text.match(regex);
    const dateData: DateData = {};
    // exact date takes priority
    console.log("parsedArr-->" + parsedArr);
    if (parsedArr && parsedArr.length > 0 && moment(parsedArr[0], MOMENT_ARR_DATE_PARSE).isValid()) {
      dateData.pdt = moment(parsedArr[0], MOMENT_ARR_DATE_PARSE).format("YYYY-MM-DD");
      dateData.utc = moment(parsedArr[0], MOMENT_ARR_DATE_PARSE).format("YYYY-MM-DD");
      dateData.currentDay = dateData.pdt !== now ? false : true;
      //console.log("LUIS: --> " + dateData.pdt);
      return dateData;
    }

    // ------for date parsed from words like tomorrow, 2 days from now,...

    //for converting back to pst
    const diffByDay = utc.diff(now, "days");

    console.log("utc: " + utc + " now:" + now + " different by days: " + diffByDay);
    // timex[0] is in UTC
    dateData.utc =
      timex[0] !== "PRESENT_REF"
        ? moment(timex[0], "YYYY-MM-DD")
            .subtract({ days: diffByDay }) // get the correct utc date to check
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
    else dateData.currentDay = false;

    //return timex[0].split("T")[0];
    //console.log("Luis: " + timex[0]);
    return dateData;
  }
}

export default LuisHelper;
