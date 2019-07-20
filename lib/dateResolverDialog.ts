import CancelAndHelpDialog from "./cancelAndHelpDialog";
import {
  WaterfallDialog,
  WaterfallStepContext,
  DialogTurnResult,
  DateTimePrompt,
  PromptValidatorContext,
  DateTimeResolution,
  ChoicePrompt
} from "botbuilder-dialogs";
import moment = require("moment");
import momentTimezone = require("moment-timezone");
import { DateData } from "./types";

const WATERFALL_DIALOG = "waterFallDialog";
const CHOICE_PROMPT = "choicePrompt";

//const DATETIME_PROMPT = "dateTimePrompt"; // may consider using later

class DateResolverDialog extends CancelAndHelpDialog {
  constructor(id) {
    super(id || "dateResolverDialog");

    this.addDialog(
      new WaterfallDialog(WATERFALL_DIALOG, [this.initialStep.bind(this), this.finalStep.bind(this)])
    ).addDialog(new ChoicePrompt(CHOICE_PROMPT));

    //.addDialog(new DateTimePrompt(DATETIME_PROMPT, this.dateTimePromptValidator.bind(this)));

    this.initialDialogId = WATERFALL_DIALOG;
  }

  async initialStep(stepContext: WaterfallStepContext): Promise<DialogTurnResult> {
    const options: any = stepContext.options;
    const date = options.date;

    const promptMsg = "Choose a date. I can forecast up to 5 days.";
    const repromptMsg = "For best result, please choose an option.";

    const now = moment(momentTimezone().tz("America/Los_Angeles"));
    const dateChoice = [
      now.format("ddd YYYY-MM-DD"),
      now.add({ days: 1 }).format("ddd YYYY-MM-DD"),
      now.add({ days: 1 }).format("ddd YYYY-MM-DD"),
      now.add({ days: 1 }).format("ddd YYYY-MM-DD"),
      now.add({ days: 1 }).format("ddd YYYY-MM-DD"),
      now.add({ days: 1 }).format("ddd YYYY-MM-DD")
    ];

    if (!date) {
      return await stepContext.prompt(CHOICE_PROMPT, {
        prompt: promptMsg,
        retryPrompt: repromptMsg,
        choices: dateChoice
      });
    }

    // } else {
    //   // have the date in options // in this case probably will never go through this part of code
    //   const time = moment(date, moment.ISO_8601);
    //   console.log("time:-->" + time);
    //   if (time != undefined) {
    //     return await stepContext.prompt(DATETIME_PROMPT, { prompt: repromptMsg });
    //   } else {
    //     return await stepContext.next({ timex: time });
    //   }
    // }
  }

  async finalStep(stepContext: WaterfallStepContext): Promise<DialogTurnResult> {
    const pdt = moment(stepContext.result.value, "ddd YYYY-MM-DD").format("YYYY-MM-DD");

    const utc = pdt;
    const currentDay = pdt === moment(momentTimezone().tz("America/Los_Angeles")).format("YYYY-MM-DD");

    const dateData: DateData = {
      pdt,
      utc,
      currentDay
    };

    return await stepContext.endDialog(dateData);
  }

  /* May use later
  //this will return local time
  //so it might be different from luis datetime value
  async dateTimePromptValidator(promptContext: PromptValidatorContext<DateTimeResolution>): Promise<boolean> {
    if (promptContext.recognized.succeeded) {
      //const timex = promptContext.recognized.value[0].timex.split("T")[0];
      const value = promptContext.recognized.value[0];
      const timex =
        value.timex !== "PRESENT_REF"
          ? value.timex
          : momentTimezone()
              .tz("America/Los_Angeles")
              .format("YYYY-MM-DD");
      console.log("iso moment: " + moment(timex, moment.ISO_8601).toString());
      return moment(timex, moment.ISO_8601).isValid();
    } else {
      return false;
    }
  }

  */
}

export default DateResolverDialog;
