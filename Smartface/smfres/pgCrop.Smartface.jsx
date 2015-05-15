var path = Pages.pgCrop.Rectangle1;
var defaultHeight;
var defaultWidth;
function pgCrop_Self_OnShow(e) {
    path.height = firstHeight;
    path.width = firstWidth;
    path.top = (Device.screenHeight - path.height) / 2;
    path.left = (Device.screenWidth - path.width) / 2;
    defaultHeight = path.height;
    defaultWidth = path.width;
    Pages.pgCrop.Rectangle1.addGesture({
        id : "0",
        type : "pinch",
        callback : function (e) {
            if (e.scale > 1) {
                if (path.width < Device.screenWidth && path.height < Device.screenHeight && Pages.pgCrop.Image1.top <= path.top && (Pages.pgCrop.Image1.top + Pages.pgCrop.Image1.height) >= (path.top + path.height) && Pages.pgCrop.Image1.left <= path.left && (Pages.pgCrop.Image1.left + Pages.pgCrop.Image1.width) >= (path.left + path.width)) {
                    path.width = defaultWidth * e.scale;
                    path.height = defaultHeight * e.scale;
                    path.top = (Device.screenHeight - path.height) / 2;
                    path.left = (Device.screenWidth - path.width) / 2;
                    Pages.pgCrop.lblTop.height = path.top;
                    Pages.pgCrop.lblLeft.top = path.top;
                    Pages.pgCrop.lblLeft.height = path.height;
                    Pages.pgCrop.lblLeft.width = path.left;
                    Pages.pgCrop.lblRight.top = path.top;
                    Pages.pgCrop.lblRight.height = path.height;
                    Pages.pgCrop.lblRight.width = Device.screenWidth - (path.left + path.width);
                    Pages.pgCrop.lblRight.left = path.left + path.width;
                    Pages.pgCrop.lblBottom.top = path.top + path.height;
                }
            } else {
                if (path.width > (Device.screenWidth / 3)) {
                    path.width = defaultWidth * e.scale;
                    path.height = defaultHeight * e.scale;
                    path.top = (Device.screenHeight - path.height) / 2;
                    path.left = (Device.screenWidth - path.width) / 2;
                    Pages.pgCrop.lblTop.height = path.top;
                    Pages.pgCrop.lblLeft.top = path.top;
                    Pages.pgCrop.lblLeft.height = path.height;
                    Pages.pgCrop.lblLeft.width = path.left;
                    Pages.pgCrop.lblRight.top = path.top;
                    Pages.pgCrop.lblRight.height = path.height;
                    Pages.pgCrop.lblRight.width = Device.screenWidth - (path.left + path.width);
                    Pages.pgCrop.lblRight.left = path.left + path.width;
                    Pages.pgCrop.lblBottom.top = path.top + path.height;
                }
            }
            //Page2_Canvas1_OnTouchMove(e);
        }
    });
    var title = "Thumbnail";
    header.init(this, formHeader, formStatusbarColor, title);
    if (Device.deviceOS == "Android") {
        var item2 = new SMF.UI.Android.MenuItem({
                id : "Crop",
                title : "Crop",
                showAsAction : SMF.UI.Android.ShowAsAction.always,
                onSelected : function (e) {
                    var rx1 = Pages.pgCrop.Rectangle1.left - imageXDiff;
                    var ry1 = Pages.pgCrop.Rectangle1.top - imageYDiff;
                    var rx2 = Pages.pgCrop.Rectangle1.left + Pages.pgCrop.Rectangle1.width - imageXDiff;
                    var ry2 = Pages.pgCrop.Rectangle1.top + Pages.pgCrop.Rectangle1.height - imageYDiff;
                    cropImage(rx1, ry1, rx2, ry2);
                }
            });
        Pages.pgCrop.actionBar.menuItems = [item2];
        Pages.pgCrop.actionBar.displayHomeAsUpEnabled = true;
        Pages.pgCrop.actionBar.displayShowHomeEnabled = true;
        //Pages.pgCrop.actionBar.onHomeIconItemSelected = back;
        Pages.pgCrop.actionBar.icon = "navbar_back.png";
    } else {
        var item1 = new SMF.UI.iOS.BarButtonItem({
                title : "Back",
                onSelected : function () {
                    Pages.back();
                }
            });
        var item2 = new SMF.UI.iOS.BarButtonItem({
                title : "Crop",
                onSelected : function () {
                    //crop fonk
                    var rx1 = Pages.pgCrop.Rectangle1.left - imageXDiff;
                    var ry1 = Pages.pgCrop.Rectangle1.top - imageYDiff;
                    var rx2 = Pages.pgCrop.Rectangle1.left + Pages.pgCrop.Rectangle1.width - imageXDiff;
                    var ry2 = Pages.pgCrop.Rectangle1.top + Pages.pgCrop.Rectangle1.height - imageYDiff;
                    cropImage(rx1, ry1, rx2, ry2);
                }
            });
        this.navigationItem.leftBarButtonItems = [item1];
        this.navigationItem.rightBarButtonItems = [item2];
    }
    Pages.pgCrop.lblTop.height = Pages.pgCrop.Rectangle1.top;
    Pages.pgCrop.lblLeft.top = Pages.pgCrop.Rectangle1.top;
    Pages.pgCrop.lblLeft.height = Pages.pgCrop.Rectangle1.height;
    Pages.pgCrop.lblLeft.width = Pages.pgCrop.Rectangle1.left;
    Pages.pgCrop.lblRight.top = Pages.pgCrop.Rectangle1.top;
    Pages.pgCrop.lblRight.height = Pages.pgCrop.Rectangle1.height;
    Pages.pgCrop.lblRight.width = Device.screenWidth - (path.left + path.width);
    Pages.pgCrop.lblRight.left = path.left + path.width;
    Pages.pgCrop.lblBottom.top = Pages.pgCrop.Rectangle1.top + Pages.pgCrop.Rectangle1.height;
    Pages.pgCrop.Image1.left = 0;
    Pages.pgCrop.Image1.top = 0;
    imageFirstX1 = Pages.pgCrop.Image1.left;
    imageFirstY1 = Pages.pgCrop.Image1.top;
    imageFirstX2 = Pages.pgCrop.Image1.left + Pages.pgCrop.Image1.width;
    imageFirstY2 = Pages.pgCrop.Image1.top + Pages.pgCrop.Image1.height;
}
function pgCrop_Canvas1_OnTouchMove(e) {
    if (Pages.pgCrop.Image1.top >= Pages.pgCrop.Rectangle1.top) {
        if (firstTouchY > e.y) {
            Pages.pgCrop.Image1.top -= (firstTouchY - e.y);
            firstTouchY = e.y;
        }
    } else if ((Pages.pgCrop.Image1.top + Pages.pgCrop.Image1.height) <= (Pages.pgCrop.Rectangle1.top + Pages.pgCrop.Rectangle1.height)) {
        if (firstTouchY < e.y) {
            Pages.pgCrop.Image1.top -= (firstTouchY - e.y);
            firstTouchY = e.y;
        }
    } else {
        Pages.pgCrop.Image1.top -= (firstTouchY - e.y);
        firstTouchY = e.y;
    }
    if (Pages.pgCrop.Image1.left >= Pages.pgCrop.Rectangle1.left) {
        if (firstTouchX > e.x) {
            Pages.pgCrop.Image1.left -= (firstTouchX - e.x);
            firstTouchX = e.x;
        }
    } else if ((Pages.pgCrop.Image1.left + Pages.pgCrop.Image1.width) <= (Pages.pgCrop.Rectangle1.left + Pages.pgCrop.Rectangle1.width)) {
        if (firstTouchX < e.x) {
            Pages.pgCrop.Image1.left -= (firstTouchX - e.x);
            firstTouchX = e.x;
        }
    } else {
        Pages.pgCrop.Image1.left -= (firstTouchX - e.x);
        firstTouchX = e.x;
    }
}
function pgCrop_Canvas1_OnTouch(e) {
    firstTouchX = Device.touchX;
    firstTouchY = Device.touchY;
}
function pgCrop_Canvas1_OnTouchEnded(e) {
    imageLastX1 = Pages.pgCrop.Image1.left;
    imageLastY1 = Pages.pgCrop.Image1.top;
    imageLastX2 = Pages.pgCrop.Image1.left + Pages.pgCrop.Image1.width;
    imageLastY2 = Pages.pgCrop.Image1.top + Pages.pgCrop.Image1.height;
    imageXDiff = imageLastX1 - imageFirstX1;
    imageYDiff = imageLastY1 - imageFirstY1;
}
function pgCrop_Rectangle1_OnTouch(e) {
    defaultHeight = path.height;
    defaultWidth = path.width;
    this.borderColor = "red";
}
function pgCrop_Rectangle1_OnTouchEnded(e) {
    this.borderColor = "green";
}