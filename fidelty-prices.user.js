// ==UserScript==
// @name        fidelty-prices
// @namespace   org.davegymer
// @description Change Fidelity fund prices from pence to pounds
// @match       https://www.fidelity.co.uk/secure/dashboard/*
// @version     20230917.0
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js
// @require     https://gist.github.com/raw/2625891/waitForKeyElements.js
// @require     https://raw.githubusercontent.com/MikeMcl/decimal.js/master/decimal.js
// @updateURL   https://github.com/gizmo71/CurrencyCorrectingUserScripts/raw/main/fidelty-prices.user.js
// @downloadURL https://github.com/gizmo71/CurrencyCorrectingUserScripts/raw/main/fidelty-prices.user.js
// @grant       GM_addStyle
// ==/UserScript==

function convert(jNode) {
    var price = jNode.text().match(/^\s*((?:\d+,)*\d+(?:\.\d+)?)p\s*$/);
    if (price) {
        jNode.css("background", "lightgoldenrodyellow");
        var pence = new Decimal(price[1].replace(',', ''));
        jNode.prop('title', jNode.text().trim());
        var poundsPence = pence.dividedBy(100);
        jNode.html("£" + poundsPence + "<a href='javascript:navigator.clipboard.writeText(&quot;" + poundsPence + "&quot;);'>📋</a>");
    }
}
waitForKeyElements('div[data-test="latest-price-cell"]', convert, false);
