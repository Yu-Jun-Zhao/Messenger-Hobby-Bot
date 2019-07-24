import { YoutubeResponseData } from "../types";
import { Attachment, CardFactory, ActionTypes } from "botbuilder";

// adaptive and animation cards are not supported by facebook.

function createAdaptiveCard(youtubeData: YoutubeResponseData): Attachment {
  const card = CardFactory.adaptiveCard({
    $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
    version: "1.0",
    type: "AdaptiveCard",
    body: [
      {
        type: "Container",
        items: [
          {
            type: "FactSet",
            facts: [
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
      }
    ],
    actions: [
      {
        type: "Action.OpenUrl",
        title: youtubeData.link,
        url: youtubeData.link
      }
    ]
  });

  return card;
}

function createAnimationCard(youtubeData: YoutubeResponseData): Attachment {
  const card = CardFactory.animationCard(youtubeData.title, [youtubeData.link]);

  return card;
}

function createHeroCard(youtubeData: YoutubeResponseData): Attachment {
  const { title, link, channelTitle, length, picUrl } = youtubeData;
  const card = CardFactory.heroCard(
    title,
    [picUrl],
    CardFactory.actions([
      {
        type: ActionTypes.OpenUrl,
        title: "Open Youtube Link",
        value: link
      }
    ]),
    { subtitle: `By ${channelTitle}`, text: `Duration: ${length}` }
  );

  return card;
}

export function createCards(youtubeDataRes: YoutubeResponseData[], typeName: string): Attachment[] {
  const attachments: Attachment[] = [];
  for (let i = 0; i < youtubeDataRes.length; i++) {
    switch (typeName) {
      case "adaptive":
        attachments.push(createAdaptiveCard(youtubeDataRes[i]));
        break;
      case "animation":
        attachments.push(createAnimationCard(youtubeDataRes[i]));

        break;
      case "hero":
        attachments.push(createHeroCard(youtubeDataRes[i]));

        break;
    }
  }
  return attachments;
}
