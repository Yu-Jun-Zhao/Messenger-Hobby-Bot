import { ComponentDialog, DialogContext, DialogTurnStatus, DialogTurnResult } from "botbuilder-dialogs";

class CancelAndHelpDialog extends ComponentDialog {
  //overriding
  async onBeginDialog(innerDialogContext: DialogContext, options?: {}): Promise<DialogTurnResult> {
    const result = await this.interrupt(innerDialogContext); // check if it is interrupted
    if (result) {
      return result;
    }

    return super.onBeginDialog(innerDialogContext, options);
  }

  //overridng
  async onContinueDialog(innerDialogContext: DialogContext): Promise<DialogTurnResult> {
    const result = await this.interrupt(innerDialogContext);
    if (result) {
      return result;
    }
    return super.onContinueDialog(innerDialogContext);
  }

  async interrupt(innerDialogContext: DialogContext): Promise<DialogTurnResult> {
    const text = innerDialogContext.context.activity.text.toLowerCase();
    switch (text) {
      case "menu":
      case "?":
        await innerDialogContext.context.sendActivity(
          "You could \n1. Weather Forecast. Ask me: What is the weather?\n2. Find video on Youtube. Ask me: Find me TITLE on youtube.\nOR Type quit to quit. "
        );
        return { status: DialogTurnStatus.waiting };
      //return await innerDialogContext.cancelAllDialogs();
      case "cancel":
      case "quit":
        await innerDialogContext.context.sendActivity("Cancelling");
        return await innerDialogContext.cancelAllDialogs();
    }
  }
}

export default CancelAndHelpDialog;
