sap.ui.define([], function () {
	"use strict";

	// return {

	// 	/**
	// 	 * Rounds the number unit value to 2 digits
	// 	 * @public
	// 	 * @param {string} sValue the number string to be rounded
	// 	 * @returns {string} sValue with 2 digits rounded
	// 	 */
	// 	numberUnit : function (sValue) {
	// 		if (!sValue) {
	// 			return "";
	// 		}
	// 		return parseFloat(sValue).toFixed(2);
	// 	}
	// };

		return {
			countryText: function (sValue) {
				switch (sValue) {
					case "CHN":
						return "中国";
					case "USA":
						return "美国";
					case "SGP":
						return "新加坡";
					case "IND":
						return "印度";
					case "KOR":
						return "韩国";
					case "AUS":
						return "澳大利亚";
					default:
						return sValue;
				}
			},
			numberText: function (sValue) {
				if ( sValue == "Undisclosed") {
					return "未披露";
				}
				var exchage = 7;
				var b = 100000000;
				
				return sValue * exchage / 100000000
			}
		}
});