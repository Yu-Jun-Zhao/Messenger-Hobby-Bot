import * as cities from "all-the-cities";
import { getCode, getName } from "country-list";

class LocationSearch {
  static getCitiesInfo(cityName: string): any[] {
    const cityArray = cities.filter(city => {
      return city.name.match(`^${cityName}$`);
    });

    return cityArray;
  }

  // string: exact 1 country code
  // true more than 1 location found
  // false 0 location found
  static getCountryCode(cityName: string): string | boolean {
    const cityArray = LocationSearch.getCitiesInfo(cityName);
    //console.log(cityArray);
    // exactly 1 city
    if (cityArray.length === 1) {
      return cityArray[0].country;
    } else if (cityArray.length > 1) {
      return true;
    } else {
      return false;
    }
  }

  static countryNameToCode(countryName: string): string {
    const name = getName(countryName); // if passed in is country code e.g. 'US'

    if (name === undefined) return getCode(countryName);

    //countryName is code
    return countryName.toUpperCase();
  }
}

export default LocationSearch;
