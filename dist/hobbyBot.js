"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const botbuilder_1 = require("botbuilder");
class HobbyBot extends botbuilder_1.ActivityHandler {
    constructor(conversationState, userState, dialog) {
        super();
        this._conversationState = conversationState;
        this._userState = userState;
        this._dialog = dialog;
    }
}
exports.default = HobbyBot;
//# sourceMappingURL=hobbyBot.js.map