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
const botbuilder_1 = require("botbuilder");
class HobbyBot extends botbuilder_1.ActivityHandler {
    constructor(name, conversationState, userState, dialog) {
        super();
        this._name = name;
        this._conversationState = conversationState;
        this._userState = userState;
        this._dialog = dialog;
        this._dialogState = this._conversationState.createProperty("DialogState");
        this.onMessage((turnContext, next) => __awaiter(this, void 0, void 0, function* () {
            console.log("Running Dialogs");
            yield this._dialog.run(turnContext, this._dialogState);
            yield next();
        }));
        this.onDialog((turnContext, next) => __awaiter(this, void 0, void 0, function* () {
            yield next();
        }));
    }
}
exports.default = HobbyBot;
//# sourceMappingURL=hobbyBot.js.map