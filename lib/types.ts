interface Data {}

// currently utc and pdt are the same
export interface DateData {
  utc?: string;
  pdt?: string;
  currentDay?: boolean;
}

// Data used for searchWeatherDialog
export interface WeatherData extends Data {
  city?: string;
  country?: string;

  date?: DateData;

  //temperature?: string;
  //weather?: string; // sunny rainy etc
}

export interface YoutubeReqData extends Data {
  name?: string;
  itemType?: string; // video or product
  platform?: string; // youtube or amazon. This takes priority
  max?: number;
}

export interface YoutubeResponseData extends Data {
  link: string;
  title: string;
  channelTitle: string;
  length: string;
  picUrl: string;
}

export interface IntentDetail {
  intent: string;
  score: number;
  data?: Data;
}
