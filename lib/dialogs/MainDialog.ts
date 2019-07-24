import {
  ComponentDialog,
  WaterfallStepContext,
  WaterfallDialog,
  DialogTurnResult,
  DialogSet,
  DialogTurnStatus,
  TextPrompt
} from "botbuilder-dialogs";
import { TurnContext, StatePropertyAccessor } from "botbuilder";
import QnAHelper from "../helpers/qnaHelper";
import LuisHelper from "../helpers/luisHelper";
import SearchWeatherDialog from "./searchWeatherDialog";
import { FindDialog } from "./findDialog";
import { QnAMakerResult } from "botbuilder-ai";
import { IntentDetail } from "../types";
import CancelAndHelpDialog from "./cancelAndHelpDialog";

const NEW_WATERFALL_DIALOG = "newWaterFallDialog";
const CONTINUE_WATERFALL_DIALOG = "continueWaterFallDialog";
const CONVERSATION_TEXT = "conversationText";
const SEARCH_WEATHER_DIALOG = "searchWeatherDialog";
const FIND_DIALOG = "findDialog";

class MainDialog extends CancelAndHelpDialog {
  private _botName: string;
  private _qnaHelper: QnAHelper;
  private _luisHelper: LuisHelper;

  constructor(botName: string) {
    super("MainDialog");
    this._botName = botName;

    this._qnaHelper = new QnAHelper();
    this._luisHelper = new LuisHelper();

    this.addDialog(
      new WaterfallDialog(NEW_WATERFALL_DIALOG, [
        this.introStep.bind(this),
        this.actStep.bind(this),
        this.finalStep.bind(this)
      ])
    )
      .addDialog(new WaterfallDialog(CONTINUE_WATERFALL_DIALOG, [this.actStep.bind(this), this.finalStep.bind(this)]))
      .addDialog(new TextPrompt(CONVERSATION_TEXT))
      .addDialog(new SearchWeatherDialog(SEARCH_WEATHER_DIALOG))
      .addDialog(new FindDialog(FIND_DIALOG));

    // set the initial dialog to begin with
    this.initialDialogId = NEW_WATERFALL_DIALOG;
  }

  // create and run the dialog system based on the accessor state
  async run(turnContext: TurnContext, accessor: StatePropertyAccessor) {
    // get data from the turnContext
    // set default value if value not found
    const conversationData = await accessor.get(turnContext, { continueConversation: false });
    // continueConversation is used to keep track of which waterfalldialog to use
    if (conversationData.continueConversation) {
      this.initialDialogId = CONTINUE_WATERFALL_DIALOG;
    } else {
      this.initialDialogId = NEW_WATERFALL_DIALOG;
    }
    console.log("CONVERSATIONDATA");
    console.log(conversationData);
    // passing in a stateAccessor because dialogset needs access to state
    const dialogSet = new DialogSet(accessor);
    //console.log("ACCESSOR");
    //console.log(accessor);
    dialogSet.add(this); // add this component dialog
    //console.log("DIALOGSET");
    //console.log(dialogSet);
    const dialogContext = await dialogSet.createContext(turnContext);
    const result = await dialogContext.continueDialog();
    console.log("RESULT");
    console.log(result);
    if (result.status === DialogTurnStatus.empty) {
      // new user will skip introstep
      conversationData.continueConversation = true;

      // start new conversation
      await dialogContext.beginDialog(this.id);
    }
  }

  async introStep(stepContext: WaterfallStepContext): Promise<DialogTurnResult> {
    // this checks if the keys are correct.
    // for testing only.
    if (!process.env.LuisAppId || !process.env.LuisAPIKey || !process.env.LuisAPIHostName) {
      await stepContext.context.sendActivity(
        "NOTE: LUIS is not configured. To enable all capabilities, add `LuisAppId`, `LuisAPIKey` and `LuisAPIHostName` to the .env file."
      );
      return await stepContext.next();
    }

    await stepContext.context.sendActivity(`My name is ${this._botName}. I am pleased to serve you.`);
    return await stepContext.prompt(CONVERSATION_TEXT, {
      prompt: `What can I help you with? Ask for help if you don't know what I can do.`
    });
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

  // for saving purposes. for now not used.
  async finalStep(stepContext: WaterfallStepContext): Promise<DialogTurnResult> {
    return await stepContext.endDialog();
  }
}

export default MainDialog;
