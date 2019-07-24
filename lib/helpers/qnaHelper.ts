import { QnAMaker, QnAMakerResult } from "botbuilder-ai";
import { TurnContext } from "botbuilder";

class QnAHelper {
  private _qnaMaker: QnAMaker;
  constructor() {
    this._qnaMaker = new QnAMaker({
      knowledgeBaseId: process.env.KBId,
      endpointKey: process.env.qnaEndPointKey,
      host: process.env.qnaHostName
    });
  }
  //query the qna knowledge base and returns the results
  async qnaQuery(context: TurnContext): Promise<QnAMakerResult[]> {
    const qnaMakerResults: QnAMakerResult[] = await this._qnaMaker.getAnswers(context, {
      scoreThreshold: 0.65,
      top: 3
    });
    return Promise.resolve(qnaMakerResults);
  }
}

export default QnAHelper;
