import CancelAndHelpDialog from "./cancelAndHelpDialog";
import {
  WaterfallStepContext,
  DialogTurnResult,
  WaterfallDialog,
  ChoicePrompt,
  NumberPrompt,
  PromptValidatorContext,
  TextPrompt
} from "botbuilder-dialogs";
import { YoutubeReqData } from "../types";
import YoutubeDataHelper from "../helpers/youtubeDataHelper";

const FIND_WATERFALL = "findWaterfall";
const TEXT_PROMPT = "textPrompt";
const CHOOSE_PROMPT = "choosePrompt";
const START_VIDEO_WATERFALL = "startVideoWaterfall";

const FIND_VIDEO_WATERFALL = "findVideoWaterfall";
const NUMBER_PROMPT = "numberPrompt";

export class FindDialog extends CancelAndHelpDialog {
  constructor(id) {
    super(id || "FindDialog");

    this.addDialog(
      new WaterfallDialog(FIND_WATERFALL, [
        this.choiceStep.bind(this),
        this.nameStep.bind(this),
        this.splitStep.bind(this)
      ])
    )
      .addDialog(new ChoicePrompt(CHOOSE_PROMPT))
      .addDialog(new FindVideoDialog(START_VIDEO_WATERFALL))
      .addDialog(new TextPrompt(TEXT_PROMPT));

    this.initialDialogId = FIND_WATERFALL;
  }

  async choiceStep(stepContext: WaterfallStepContext): Promise<DialogTurnResult> {
    const youtubeData: YoutubeReqData = stepContext.options;

    if (!youtubeData.itemType && !youtubeData.platform) {
      return await stepContext.prompt(CHOOSE_PROMPT, {
        prompt: "video or products(Not supported yet)?",
        choices: ["video", "product"]
      });
    }

    return await stepContext.next({ value: youtubeData.itemType });
  }

  async nameStep(stepContext: WaterfallStepContext): Promise<DialogTurnResult> {
    const youtubeData: YoutubeReqData = stepContext.options;

    youtubeData.itemType = stepContext.result.value;
    if (!youtubeData.name) {
      return await stepContext.prompt(TEXT_PROMPT, {
        prompt: `What is the ${youtubeData.itemType} name?`
      });
    }

    return await stepContext.next(youtubeData.name);
  }

  async splitStep(stepContext: WaterfallStepContext): Promise<DialogTurnResult> {
    const youtubeData: YoutubeReqData = stepContext.options;

    youtubeData.name = stepContext.result;
    //console.log(youtubeData);
    // platform takes priority
    if (youtubeData.platform === "youtube") {
      return await stepContext.beginDialog(START_VIDEO_WATERFALL, stepContext.options);
    } else if (youtubeData.platform === "amazon") {
    }

    if (youtubeData.itemType === "video") {
      return await stepContext.beginDialog(START_VIDEO_WATERFALL, stepContext.options);
    } else if (youtubeData.itemType === "product") {
      // not supported yet
    }
    return await stepContext.endDialog();
  }
}

export class FindVideoDialog extends CancelAndHelpDialog {
  constructor(id) {
    super(id || "findVideoDialog");

    this.addDialog(
      new WaterfallDialog(FIND_VIDEO_WATERFALL, [this.numberStep.bind(this), this.apiStep.bind(this)])
    ).addDialog(new NumberPrompt(NUMBER_PROMPT, this.resultsPromptValidator.bind(this)));

    this.initialDialogId = FIND_VIDEO_WATERFALL;
  }

  //pick how many results returned
  async numberStep(stepContext: WaterfallStepContext): Promise<DialogTurnResult> {
    return await stepContext.prompt(NUMBER_PROMPT, {
      prompt: "How many videos do you want? Max:10"
    });
  }

  // handles youtube api
  async apiStep(stepContext: WaterfallStepContext): Promise<DialogTurnResult> {
    const youtubeData: YoutubeReqData = stepContext.options;

    youtubeData.max = stepContext.result;

    const youtubeApiRes = YoutubeDataHelper.query(youtubeData);
    await stepContext.context.sendActivity(
      `Searching for ${youtubeData.name} on Youtube. Testing #${youtubeData.max}. Testing itemType: ${
        youtubeData.itemType
      }. Testing platform: ${youtubeData.platform}`
    );

    return await stepContext.endDialog();
  }

  async resultsPromptValidator(promptContext: PromptValidatorContext<number>): Promise<boolean> {
    return promptContext.recognized.value > 0 && promptContext.recognized.value <= 10;
  }
}
