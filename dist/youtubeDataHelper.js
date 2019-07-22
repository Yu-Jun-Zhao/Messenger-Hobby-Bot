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
const googleapis_1 = require("googleapis");
const axios_1 = require("axios");
const moment = require("moment");
class YoutubeDataHelper {
    static query(reqData) {
        return __awaiter(this, void 0, void 0, function* () {
            const youtube = googleapis_1.google.youtube({
                version: "v3",
                auth: process.env.youtubeAPIKey
            });
            const results = yield youtube.search.list({
                part: "snippet",
                q: reqData.name,
                maxResults: reqData.max,
                order: "relevance",
                videoDuration: "any"
            });
            const youtubeResults = [];
            for (let i = 0; i < results.data.items.length; i++) {
                const item = results.data.items[i];
                const contentRes = yield axios_1.default.get(`https://www.googleapis.com/youtube/v3/videos?id=${item.id.videoId}&part=contentDetails&key=${process.env.youtubeAPIKey}`);
                let duration;
                if (contentRes.data.items) {
                    const d = moment.duration(contentRes.data.items[0].contentDetails.duration);
                    duration = moment(d.asMilliseconds()).format("mm:ss");
                }
                const youtubeResponseData = {
                    title: item.snippet.title,
                    channelTitle: item.snippet.channelTitle,
                    link: `https://www.youtube.com/watch?v=${item.id.videoId}`,
                    length: duration
                };
                youtubeResults.push(youtubeResponseData);
            }
            console.log(youtubeResults);
            return youtubeResults;
        });
    }
}
exports.default = YoutubeDataHelper;
//# sourceMappingURL=youtubeDataHelper.js.map