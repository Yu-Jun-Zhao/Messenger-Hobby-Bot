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
const botbuilder_dialogs_1 = require("botbuilder-dialogs");
class CancelAndHelpDialog extends botbuilder_dialogs_1.ComponentDialog {
    onBeginDialog(innerDialogContext, options) {
        const _super = Object.create(null, {
            onBeginDialog: { get: () => super.onBeginDialog }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.interrupt(innerDialogContext);
            if (result) {
                return result;
            }
            return _super.onBeginDialog.call(this, innerDialogContext, options);
        });
    }
    onContinueDialog(innerDialogContext) {
        const _super = Object.create(null, {
            onContinueDialog: { get: () => super.onContinueDialog }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.interrupt(innerDialogContext);
            if (result) {
                return result;
            }
            return _super.onContinueDialog.call(this, innerDialogContext);
        });
    }
    interrupt(innerDialogContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const text = innerDialogContext.context.activity.text.toLowerCase();
            switch (text) {
                case "help":
                case "?":
                    yield innerDialogContext.context.sendActivity("You could \n1. Weather Forecast. Ask me: What is the weather?\nOR Type quit to quit. ");
                    return { status: botbuilder_dialogs_1.DialogTurnStatus.waiting };
                case "cancel":
                case "quit":
                    yield innerDialogContext.context.sendActivity("Cancelling");
                    return yield innerDialogContext.cancelAllDialogs();
            }
        });
    }
}
exports.default = CancelAndHelpDialog;
//# sourceMappingURL=cancelAndHelpDialog.js.map