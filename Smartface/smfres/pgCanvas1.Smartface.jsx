function pgCanvas1_Self_OnKeyPress(e) {
    if (e.keyCode === 4) {
        Pages.back();
    }
}
function showDlgCanvasInfo() {
    Dialogs.dlgCanvasInfo.show();
}
function pgCanvas1_Self_OnShow(e) {
    var title = "Canvas";
    if (Device.deviceOS == "Android") {}
    else {
        header.init(this, canvasHeader, canvasStatusBarColor, title);
        header.setLeftItem(homeBack);
        header.setRightItem(showDlgCanvasInfo);
    }
}
function pgCanvas1_contLineGraph1_OnTouchEnded(e) {
    if (Device.deviceOS == "Android") {
        header.init(Pages.pgCanvas2, canvasHeader, canvasStatusBarColor, "Line Graph 1");
        header.setLeftItem(pagesBack);
        header.setRightItem(Dialogs.dlgCanvasLineInfo);
    }
    Pages.pgCanvas2.show(SMF.UI.MotionEase.accelerating, SMF.UI.TransitionEffect.rightToLeft, SMF.UI.TransitionEffectType.push, false, false);
    SES.Analytics.eventLog("Show LineGraph1", '{\"function\":\"pgCanvas1_contLineGraph1_OnTouch\"}');
}
function pgCanvas1_contLineGraph2_OnTouchEnded(e) {
    if (Device.deviceOS == "Android") {
        header.init(Pages.pgCanvas3, canvasHeader, canvasStatusBarColor, "Line Graph 2");
        header.setLeftItem(pagesBack);
        header.setRightItem(Dialogs.dlgCanvasLineInfo);
    }
    Pages.pgCanvas3.show(SMF.UI.MotionEase.accelerating, SMF.UI.TransitionEffect.rightToLeft, SMF.UI.TransitionEffectType.push, false, false);
    SES.Analytics.eventLog("Show LineGraph2", '{\"function\":\"pgCanvas1_contLineGraph2_OnTouch\"}');
}
function pgCanvas1_contCounter_OnTouchEnded(e) {
    if (Device.deviceOS == "Android") {
        header.init(Pages.pgCanvas4, canvasHeader, canvasStatusBarColor, "Counter");
        header.setLeftItem(pagesBack);
        header.setRightItem(Dialogs.dlgCanvasCounterInfo);
    }
    Pages.pgCanvas4.show(SMF.UI.MotionEase.accelerating, SMF.UI.TransitionEffect.rightToLeft, SMF.UI.TransitionEffectType.push, false, false);
    SES.Analytics.eventLog("Show Counter Graph", '{\"function\":\"pgCanvas1_contCounter_OnTouch\"}');
}
function pgCanvas1_contBarGraph_OnTouchEnded(e) {
    if (Device.deviceOS == "Android") {
        header.init(Pages.pgCanvas6, canvasHeader, canvasStatusBarColor, "Bar Graph");
        header.setLeftItem(pagesBack);
        header.setRightItem(Dialogs.dlgCanvasLineInfo);
    }
    Pages.pgCanvas6.show(SMF.UI.MotionEase.accelerating, SMF.UI.TransitionEffect.rightToLeft, SMF.UI.TransitionEffectType.push, false, false);
    SES.Analytics.eventLog("Show Bar Graph", '{\"function\":\"pgCanvas1_contBarGraph2_OnTouch\"}');
}