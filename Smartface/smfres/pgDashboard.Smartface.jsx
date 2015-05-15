function pgDashboard_Self_OnKeyPress(e) { // only Android,  press device back button
    if (e.keyCode === 4) {
        Application.exit();
    }
}
function showdlgDashboard() {
    Dialogs.dlgDashboard.show();
}
function pgDashboard_Self_OnShow(e) {
    isUsingSwipe = false;
    var title = "";
    this.conBottom.tweet1.RepeatBox1.allowDeletingItems = false;
    header.init(this, navbarHeader1, statusbarColor1, title);
    header.setLeftItemBos();
    if (Device.deviceOS == "Android") {
        header.setRightItem(Dialogs.dlgDashboard);
    } else {
        header.setRightItem(showdlgDashboard);
    }
    this.conBottom.tweet1.RepeatBox1.setTopIndex(0, 0, 0);
}
function pgDashboard_Twitter_OnPressed(e) {
    canOpen = Device.canOpenUrl(url);
    if (canOpen) {
        //first go to service and get the token. In success call the twitter app
        Application.call({
            app : "twitter://twitter.com/smartface_io",
            data : null
        });
    } else {
        SMF.Net.browseOut("https://twitter.com/smartface_io");
    }
    SES.Analytics.eventLog("Twitter", '{\"function\":\"pgDashboard_Twitter_OnPressed\"}');
}
function pgDashboard_lblAnimate_OnTouchEnded(e) {
    try {
        if (!isAnimateUp) {
            Pages.pgDashboard.conBottom.tweet1.ImageArrow.image = "ok2.png";
            Pages.pgDashboard.conBottom.tweet1.animate({
                property : 'Y',
                endValue : 0,
                motionEase : SMF.UI.MotionEase.decelerating,
                duration : '300',
                OnFinish :
                function () {
                    isAnimateUp = true;
                }
            });
        } else {
            Pages.pgDashboard.conBottom.tweet1.ImageArrow.image = "ok.png";
            Pages.pgDashboard.conBottom.tweet1.animate({
                property : 'Y',
                endValue : "56%",
                motionEase : SMF.UI.MotionEase.decelerating,
                duration : '300',
                OnFinish :
                function () {
                    isAnimateUp = false;
                }
            });
        }
    } catch (ex) {
        alert(ex);
    }
}
function pgDashboard_RepeatBox1_OnRowRender(e) {
    this.lblTwit.text = resObjGetTwitter[e.rowIndex].text;
    this.lblScreenName.text = resObjGetTwitter[e.rowIndex].user.name;
    this.lblUserName.text = "@" + resObjGetTwitter[e.rowIndex].user.screen_name;
    this.imgProfilePhoto.image = "https://pbs.twimg.com/profile_images/424187706583678977/HJAJ8BBA_400x400.png";
}
function pgDashboard_RepeatBox1_OnSelectedItem(e) {
    canOpen = Device.canOpenUrl(url);
    if (canOpen) {
        //first go to service and get the token. In success call the twitter app
        Application.call({
            app : "twitter://user?screen_name=smartface_io",
            data : null
        });
    } else {
        SMF.Net.browseOut("https://twitter.com/smartface_io");
    }
    SES.Analytics.eventLog("Twitter", '{\"function\":\"pgDashboard_RepeatBox1_OnSelectedItem\"}');
}
function pgDashboard_btnCanvas_OnPressed(e) {
    if (Device.deviceOS == "Android") {
        header.init(Pages.pgCanvas1, canvasHeader, canvasStatusBarColor, "Canvas");
        header.setLeftItem(homeBack);
        header.setRightItem(Dialogs.dlgCanvasInfo);
    }
    Pages.pgCanvas1.show(SMF.UI.MotionEase.accelerating, SMF.UI.TransitionEffect.rightToLeft, SMF.UI.TransitionEffectType.push, false, false);
    SES.Analytics.eventLog("Canvas", '{\"function\":\"pgDashboard_btnCanvas_OnPressed\"}');
}
function pgDashboard_btnMap_OnPressed(e) {
    if (Device.deviceOS == "Android") {
        header.init(Pages.pgMap1, mapHeader, mapStatusbarColor, "Map");
        header.setLeftItem(homeBack);
        header.setRightItem(Dialogs.dlgMap);
    }
    Pages.pgMap1.show(SMF.UI.MotionEase.accelerating, SMF.UI.TransitionEffect.rightToLeft, SMF.UI.TransitionEffectType.push, false, false);
    SES.Analytics.eventLog("Map", '{\"function\":\"pgDashboard_btnMap_OnPressed\"}');
}
function pgDashboard_btnListView_OnPressed(e) {
    Dialogs.dlgHomePgLoading.show();
    pageNum = 1;
    newsArrayList = [];
    Data.DS_News.clear();
    Data.webClientList_InDSet.rowNumber = rowNum;
    Data.webClientList_InDSet.pagenumber = 1;
    SMF.Net.webClientList.run();
    if (Device.deviceOS == "Android") {
        header.init(Pages.pgListView, listHeader, listStatusbarColor, "List View");
        header.setLeftItem(homeBack);
        header.setRightItem(Dialogs.dlgListViewInfo);
    }
    SES.Analytics.eventLog("ListView", '{\"function\":\"pgDashboard_btnListView_OnPressed\"}');
    if (firstRunListWebclient == true) {
        Data.WebClient11_InDSet.rowNumber = 21;
        Data.WebClient11_InDSet.pagenumber = 1;
        SMF.Net.WebClient11.run();
    }
}
function showDlgListViewInfo() {
    Dialogs.dlgListViewInfo.show();
}
function pgDashboard_btnForms_OnPressed(e) {
    if (Device.deviceOS == "Android") {
        header.init(Pages.pgLogin, formHeader, formStatusbarColor, "Login");
        header.setLeftItem(homeBack);
        header.setRightItem(Dialogs.dlgFormDashboard);
    }
    Pages.pgLogin.show(SMF.UI.MotionEase.accelerating, SMF.UI.TransitionEffect.rightToLeft, SMF.UI.TransitionEffectType.push, false, false);
    SES.Analytics.eventLog("Forms", '{\"function\":\"pgDashboard_btnForms_OnPressed\"}');
}
function pgDashboard_RepeatBox1_OnPullDown(e) {
    Data.DS_twitterTable.clear();
    SMF.Net.getTwitter.run(true);
}
function pgDashboard_contBackground_OnTouchEnded(e) {
    Pages.pgDashboard.conBottom.tweet1.RepeatBox1.setTopIndex(0, 0, 0);
}
function pgDashboard_RepeatBox1_OnPullUp(e) {
    countTwitter += 20;
    SMF.Net.getTwitter.URL = "https://api.twitter.com/1.1/statuses/user_timeline.json?count=" + countTwitter + "&screen_name=smartface_io";
    SMF.Net.getTwitter.run(true);
}