import { google } from "googleapis";
import { YoutubeReqData, YoutubeResponseData } from "../types";
import axios from "axios";
import moment = require("moment");

class YoutubeDataHelper {
  static async query(reqData: YoutubeReqData): Promise<YoutubeResponseData[]> {
    const youtube = google.youtube({
      version: "v3",
      auth: process.env.youtubeAPIKey
    });

    const results = await youtube.search.list({
      part: "snippet",
      q: reqData.name,
      maxResults: reqData.max,
      order: "relevance",
      videoDuration: "any",
      type: "video"
    });

    const youtubeResults: YoutubeResponseData[] = [];

    for (let i = 0; i < results.data.items.length; i++) {
      const item = results.data.items[i];
      const contentRes = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?id=${item.id.videoId}&part=contentDetails&key=${
          process.env.youtubeAPIKey
        }`
      );
      //console.log(item.id.videoId);

      let duration;
      if (contentRes.data.items) {
        const d = moment.duration(contentRes.data.items[0].contentDetails.duration);
        duration = moment(d.asMilliseconds()).format("mm:ss");
      }

      const youtubeResponseData: YoutubeResponseData = {
        title: item.snippet.title,
        channelTitle: item.snippet.channelTitle,
        link: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        length: duration
      };

      youtubeResults.push(youtubeResponseData);
    }

    //console.log(youtubeResults);

    return youtubeResults;
  }
}

export default YoutubeDataHelper;
