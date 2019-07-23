import CancelAndHelpDialog from "./cancelAndHelpDialog";
import { TextPrompt, WaterfallDialog, WaterfallStepContext, DialogTurnResult } from "botbuilder-dialogs";
import QnAHelper from "../helpers/qnaHelper";
import { QnAMakerResult } from "botbuilder-ai";
import LuisHelper from "../helpers/luisHelper";
import { IntentDetail, WeatherData } from "../types";
import SearchWeatherDialog from "./searchWeatherDialog";
import { FindDialog } from "./findDialog";

const WATERFALL_DIALOG = "waterFallDialog";
const TEXT_PROMPT = "textPrompt";
const SEARCH_WEATHER_DIALOG = "searchWeatherDialog";
const FIND_DIALOG = "findDialog";

class RegularDialog extends CancelAndHelpDialog {
  private _qnaHelper: QnAHelper;
  private _luisHelper: LuisHelper;
  constructor(id) {
    super(id || "regularDialog");

    this._qnaHelper = new QnAHelper();
    this._luisHelper = new LuisHelper();

    this.addDialog(new TextPrompt(TEXT_PROMPT))
      .addDialog(new WaterfallDialog(WATERFALL_DIALOG, [this.actStep.bind(this)]))
      .addDialog(new SearchWeatherDialog(SEARCH_WEATHER_DIALOG))
      .addDialog(new FindDialog(FIND_DIALOG));

    this.initialDialogId = WATERFALL_DIALOG;
  }

  async actStep(stepContext: WaterfallStepContext): Promise<DialogTurnResult> {
    // qna
    const answers: QnAMakerResult[] = await this._qnaHelper.qnaQuery(stepContext.context);
    const qnaScore = answers[0] ? answers[0].score : 0;

    //luis
    const intentDetail: IntentDetail = await this._luisHelper.executeLuisQuery(stepContext.context);
    const intentScore = intentDetail.score;

    if (intentScore >= qnaScore && intentScore >= 0.7) {
      // intents
      switch (intentDetail.intent) {
        case "SearchWeather":
          return await stepContext.beginDialog(SEARCH_WEATHER_DIALOG, intentDetail.data);

        case "Find":
          return await stepContext.beginDialog(FIND_DIALOG, intentDetail.data);
      }
    } else if (answers[0]) {
      // qna

      await stepContext.context.sendActivity(answers[0].answer);
    } else {
      await stepContext.context.sendActivity("Sorry. I do not understand what you just said.");
    }

    return await stepContext.endDialog();
  }
}

export default RegularDialog;
