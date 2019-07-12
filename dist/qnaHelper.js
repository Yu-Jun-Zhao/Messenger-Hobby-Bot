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
const botbuilder_ai_1 = require("botbuilder-ai");
class QnAHelper {
    constructor() {
        this._qnaMaker = new botbuilder_ai_1.QnAMaker({
            knowledgeBaseId: process.env.KBId,
            endpointKey: process.env.qnaEndPointKey,
            host: process.env.qnaHostName
        });
    }
    qnaQuery(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const qnaMakerResults = yield this._qnaMaker.getAnswers(context, {
                scoreThreshold: 0.65,
                top: 3
            });
            return Promise.resolve(qnaMakerResults);
        });
    }
}
exports.default = QnAHelper;
//# sourceMappingURL=qnaHelper.js.map