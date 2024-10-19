// ==UserScript==
// @name        ajbell-prices
// @namespace   org.davegymer
// @description Add copy function to YouInvest prices
// @match       https://www.ajbell.co.uk/platform/*
// @version     20241019.00
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js
// @require     https://gist.github.com/raw/2625891/waitForKeyElements.js
// @require     https://raw.githubusercontent.com/MikeMcl/decimal.js/master/decimal.js
// @grant       GM_addStyle
// @updateURL    https://github.com/gizmo71/CurrencyCorrectingUserScripts/raw/main/ajbell-prices.user.js
// @downloadURL  https://github.com/gizmo71/CurrencyCorrectingUserScripts/raw/main/ajbell-prices.user.js
// ==/UserScript==

function convert(jNode) {
    var price = jNode.text().match(/^(\* |)((?:\d+,)*\d+(?:\.\d+)?)\s+GBP\s*$/);
//console.log("is " + jNode.text() + " now " + price);
    if (price) {
        jNode.css("background", "lightgoldenrodyellow");
        var poundsPence = new Decimal(price[2].replace(',', ''));
        jNode.html(price[1] + "£" + poundsPence + "<a href='javascript:navigator.clipboard.writeText(&quot;" + poundsPence + "&quot;);' title='" + price + "'>📋</a>");
    }
}
//console.log("gonna wait");
waitForKeyElements('div[class^="price-"] > div', convert); // [class="no-wrap"]
