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
import RegularDialog from "./regularDialog";

const NEW_WATERFALL_DIALOG = "newWaterFallDialog";
const CONTINUE_WATERFALL_DIALOG = "continueWaterFallDialog";
const REGULAR_DIALOG = "regularDialog";
const CONVERSATION_TEXT = "conversationText";

class MainDialog extends ComponentDialog {
  private _botName: string;

  constructor(botName: string) {
    super("MainDialog");
    this._botName = botName;
    this.addDialog(
      new WaterfallDialog(NEW_WATERFALL_DIALOG, [
        this.introStep.bind(this),
        this.actStep.bind(this),
        this.finalStep.bind(this)
      ])
    )
      .addDialog(new WaterfallDialog(CONTINUE_WATERFALL_DIALOG, [this.actStep, this.finalStep]))
      .addDialog(new TextPrompt(CONVERSATION_TEXT))
      .addDialog(new RegularDialog(REGULAR_DIALOG));

    // set the initial dialog to begin with
    this.initialDialogId = NEW_WATERFALL_DIALOG;
  }

  // create and run the dialog system based on the accessor state
  async run(turnContext: TurnContext, accessor: StatePropertyAccessor) {
    // get data from the turnContext
    // set default value if value not found
    const conversationData = await accessor.get(turnContext, { conversationData: false });
    // continueConversation is used to keep track of which waterfalldialog to use
    if (conversationData.continueConversation) {
      this.initialDialogId = CONTINUE_WATERFALL_DIALOG;
    }

    // passing in a stateAccessor because dialogset needs access to state
    const dialogSet = new DialogSet(accessor);
    console.log(accessor);
    dialogSet.add(this); // add this component dialog

    const dialogContext = await dialogSet.createContext(turnContext);
    const result = await dialogContext.continueDialog();

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
    return await stepContext.beginDialog(REGULAR_DIALOG);
  }

  async finalStep(stepContext: WaterfallStepContext): Promise<DialogTurnResult> {
    return await stepContext.endDialog();
  }
}

export default MainDialog;
