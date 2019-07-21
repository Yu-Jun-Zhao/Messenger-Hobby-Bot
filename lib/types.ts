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

export interface YoutubeData extends Data {
  name?: string;
  itemType?: string; // video or product
  platform?: string; // youtube or amazon
}

export interface IntentDetail {
  intent: string;
  score: number;
  data?: Data;
}
