// ==UserScript==
// @name        landg-prices
// @namespace   org.davegymer
// @description Change L&G fund prices from pence to pounds
// @match       https://mya.landg.com/product/investments?productId=*
// @version     20230617.1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js
// @require     https://gist.github.com/raw/2625891/waitForKeyElements.js
// @require     https://raw.githubusercontent.com/MikeMcl/decimal.js/master/decimal.js
// @updateURL    https://github.com/gizmo71/CurrencyCorrectingUserScripts/raw/main/landg-prices.user.js
// @downloadURL  https://github.com/gizmo71/CurrencyCorrectingUserScripts/raw/main/landg-prices.user.js
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
waitForKeyElements('div[class="lg-table-cell__content lg-table-cell__content--align-end"]', convert, false);
//<td _ngcontent-urq-c134="" lg-table-cell="" class="lg-table-cell"><span aria-hidden="true" class="lg-table-cell__label"> Unit price </span><div class="lg-table-cell__content lg-table-cell__content--align-end">3,589.84p</div></td>
