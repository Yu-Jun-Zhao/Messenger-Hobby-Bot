"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cities = require("all-the-cities");
const country_list_1 = require("country-list");
class LocationSearch {
    static getCitiesInfo(cityName) {
        const cityArray = cities.filter(city => {
            return city.name.match(`^${cityName}$`);
        });
        return cityArray;
    }
    static getCountryCode(cityName) {
        const cityArray = LocationSearch.getCitiesInfo(cityName);
        console.log(cityArray);
        if (cityArray.length === 1) {
            return cityArray[0].country;
        }
        else if (cityArray.length > 1) {
            return true;
        }
        else {
            return false;
        }
    }
    static countryNameToCode(countryName) {
        const name = country_list_1.getName(countryName);
        if (name === undefined)
            return country_list_1.getCode(countryName);
        return countryName.toUpperCase();
    }
}
exports.default = LocationSearch;
//# sourceMappingURL=locationSearch.js.map