import { ActivityHandler, ConversationState, UserState, StatePropertyAccessor, TurnContext } from "botbuilder";
import MainDialog from "./MainDialog";

class HobbyBot extends ActivityHandler {
  private _name: string;
  private _conversationState: ConversationState;
  private _userState: UserState;
  private _dialog: MainDialog;
  private _dialogState: StatePropertyAccessor;

  constructor(name: string, conversationState: ConversationState, userState: UserState, dialog: MainDialog) {
    super();
    this._name = name;
    this._conversationState = conversationState;
    this._userState = userState;
    this._dialog = dialog;

    this._dialogState = this._conversationState.createProperty("DialogState");

    // not supported yet
    this.onMembersAdded(async (turnContext, next) => {
      await next();
    });

    //passing in a bothandler
    this.onMessage(async (turnContext, next) => {
      //console.log("Running Dialogs");
      await this._dialog.run(turnContext, this._dialogState);

      await next();
    });

    // For saving states
    this.onDialog(async (turnContext, next) => {
      await this._conversationState.saveChanges(turnContext, false);
      await next();
    });
  }
}

export default HobbyBot;
