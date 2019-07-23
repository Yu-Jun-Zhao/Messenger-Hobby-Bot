import { YoutubeResponseData } from "../types";
import { Attachment, CardFactory } from "botbuilder";

function createAdaptiveCard(youtubeData: YoutubeResponseData): Attachment {
  const card = CardFactory.adaptiveCard({
    type: "AdaptiveCard",
    body: [
      {
        type: "FactSet",
        facts: [
          {
            title: "Link",
            value: youtubeData.link
          },
          {
            title: "Title",
            value: youtubeData.title
          },
          {
            title: "By",
            value: youtubeData.channelTitle
          },
          {
            title: "length",
            value: youtubeData.length
          }
        ]
      }
    ]
  });

  return card;
}

function createAnimationCard(youtubeData: YoutubeResponseData): Attachment {
  const card = CardFactory.animationCard(youtubeData.title, [youtubeData.link]);

  return card;
}

export function createAdaptiveCards(youtubeDataRes: YoutubeResponseData[]): Attachment[] {
  const attachments: Attachment[] = [];
  for (let i = 0; i < youtubeDataRes.length; i++) {
    attachments.push(createAdaptiveCard(youtubeDataRes[i]));
  }
  return attachments;
}

export function createAnimationCards(youtubeDataRes: YoutubeResponseData[]): Attachment[] {
  const attachments: Attachment[] = [];
  for (let i = 0; i < youtubeDataRes.length; i++) {
    attachments.push(createAnimationCard(youtubeDataRes[i]));
  }
  return attachments;
}
