var firstRunListWebclient = true; // a flag for checking run webclient
var fromLogin; // a flag for control come from which page
var countTwitter = 20; // default value
var twitterWebClient; //webClient object for fetching server response
var isAnimateUp = false; // a flag for controll animate tweet1 in pgDashboard
var resObjGetTwitter; // response of getTwitter webclient
var url = "twitter://twitter.com"; // base url of getTwitter webClient
var canOpen; // a flag , controlling device has twitter application
var newsArray; // response of webclient11
var newsArrayList; // response of webclientList
var controlAddingCanvas = null;
var index;
var index2;

var myCurrentLat; // latitude value of user location address
var myCurrentLon; // longtitude value of user location address

var lineStyleNewsScrollViews; // array , holding 3 scrollview path in pgLineStyle
var lineStyleNewsLblHeights; // array , holding 3 scrollview height in pgLineStyle
var lineStyleNewsScrollViewsContentHeights; // holding 3 scrollview content height in pgLineStyle

var boxedStyleNewsScrollViews; // array , holding 3 scrollview path in pgBoxedStyle
var boxedStyleNewsLblHeights; // array , holding 3 scrollview height in pgBoxedStyle
var boxedStyleNewsScrollViewsContentHeights; // holding 3 scrollview content height in pgBoxedStyle

var squareStyleNewsScrollViews; // array , holding 3 scrollview path in pgSquareStyle
var squareStyleNewsLblHeights; // array , holding 3 scrollview height in pgSquareStyle
var squareStyleNewsScrollViewsContentHeights; // holding 3 scrollview content height in pgSquareStyle


var rowNum = 11; // default value.it is using on setting url of webclientList
var pageNum = 1; // default value.it is using on setting url of webclientList

function Global_Events_OnStart(e) {
    Device.setGPSStatus(true); // to find user location

    // Smartface
    SES.Configuration.useAnalytics = true;
    SES.Configuration.logEnabled = true;

    Data.DS_twitterTable.clear();
    Data.notify("Data.DS_twitterTable");
    countTwitter = 20;
    SMF.Net.getTwitter.URL = "https://api.twitter.com/1.1/statuses/user_timeline.json?count=" + countTwitter + "&screen_name=smartface_io";
    SMF.Net.getTwitter.run(true);

    load("DefinitionsForCanvas.js");
    load("MethodsForCanvas.js");
    load("MapDefs.js");
    load("DefinitionsofForm.js");
    load("MethodsOfForm");
    load("WebClientsofForm.js");
    load("MethodsForNews.js");
    load("Header.js");
    load("DefinitionsOfNews.js");
    load("MethodForCrop.js");

    /**************************************************************************************/

}
function pagesBack(e) {
    Pages.back();
}
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

var lastNetworkErrorDisplayTime = new Date();
function Global_Events_OnError(e) {
    Dialogs.dlgHomePgLoading.close();
    switch (e.type) {
    case "Server Error":
    case "Size Overflow":
        var requiredTimeDiff = 3000;
        var currentTime = new Date(Number(new Date()) + requiredTimeDiff);
        var timeGap = currentTime - lastNetworkErrorDisplayTime;
        if (timeGap > requiredTimeDiff) { //checks for time gap for displaying network error alers; for not frequent displaying the alerts.
            alert(lang.networkError);
            lastNetworkErrorDisplayTime = currentTime;
        }
        break;
    default:
        SES.Analytics.eventLog("error", JSON.stringify(e));
        var err = JSON.parse(JSON.stringify(e));
        err.message = e.message;
        break;
    }
}
function Global_Events_OnLocationChanged(e) {
    myCurrentLat = e.lat;
    myCurrentLon = e.lng;
    SMF.Map.lookupAddress(Number(myCurrentLat), Number(myCurrentLon),
        function (e) {
        address = e.results[0].addressValue;
        Pages.pgRegister.scrollMainRegister.contUserInfo3.lblAddress.text = address;
        isAddressFound = true;
    },
        function (e) {});
}
function showdlgCanvasLineInfo() {
    Dialogs.dlgCanvasLineInfo.show();
}
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
function homeBack() {
    Pages.pgDashboard.show(SMF.UI.MotionEase.accelerating, SMF.UI.TransitionEffect.leftToRight, SMF.UI.TransitionEffectType.push, false, false);
}