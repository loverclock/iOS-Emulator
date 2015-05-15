var canvasHeader = "canvas_header.png";
var formHeader = "form_header.png";
var mapHeader = "map_header.png";
var listHeader = "list_header.png";
var mapStatusbarColor = "#F39B13";
var listStatusbarColor = "#000000";
var formStatusbarColor = "#C1392D";

var navbarHeader1 = "header.png";
var navbarHeader2 = "header2.png";
var statusbarColor1 = "#11191D";
var statusbarColor2 = "#3F2F3B";
var mapStatusbarColor = "#F39B13";
var canvasStatusBarColor = "#004449";

header = new HeaderBar();
function HeaderBar() {
    SMF.UI.StatusBar.style = SMF.UI.StatusBarStyle.lightContent;
    this.navigationItem = null;
    this.actionBar = null;
    this.isAndroid = Device.deviceOS == "Android" ? true : false;

    this.init = function (page, image, color, titleText) {
        SMF.UI.StatusBar.color = color;
        if (this.isAndroid == true) {

            this.actionBar = page.actionBar;
            this.actionBar.visible = true;
            this.actionBar.backgroundImage = image;
            this.actionBar.titleView = {
                type : SMF.UI.TitleViewType.text,
                text : titleText,
                textSize : 16,
                textColor : "#FFFFFF",
                alignment : SMF.UI.Alignment.center,
            };
        } else {
            //Sets NavigationITem for iOS


            this.navigationItem = page.navigationItem;
            this.navigationItem.titleView = {
                type : SMF.UI.TitleViewType.text,
                frame : [0, 0, 320, 44], // left, top, width, height
                text : titleText,
                textColor : "#FFFFFF",
                fontName : "Helvetica-Bold",
                fontSize : 16,
                alignment : SMF.UI.TextAlignment.center
            }
            SMF.UI.iOS.NavigationBar.visible = true;
            SMF.UI.iOS.NavigationBar.backgroundImage = image;
            SMF.UI.iOS.NavigationBar.tintColor = "#FFFFFF";
        }
    }
    this.setRightItem = function (infoPressed) {
        if (this.isAndroid) {
            var item2 = new SMF.UI.Android.MenuItem({
                    id : "itemRefresh",
                    icon : "info.png",
                    showAsAction : SMF.UI.Android.ShowAsAction.always,
                    onSelected : function () {
                        infoPressed.show();
                    }
                });
            this.actionBar.menuItems = [item2];
        } else {
            var rightItem = new SMF.UI.iOS.BarButtonItem({
                    image : "info.png",
                    onSelected : infoPressed
                });
            this.navigationItem.rightBarButtonItems = [rightItem];
        }
    }
    this.setRightItemBos = function () {
        if (this.isAndroid) {
            var item2 = new SMF.UI.Android.MenuItem({
                    id : "itemRefresh2",
                    icon : "bosimaj.png",
                    showAsAction : SMF.UI.Android.ShowAsAction.always,
                    onSelected : function (e) {}
                });
            this.actionBar.menuItems = [item2];
        } else {
            var rightItem = new SMF.UI.iOS.BarButtonItem({
                    image : "bosimaj.png",
                    onSelected : function (e) {}
                });
            this.navigationItem.rightBarButtonItems = [rightItem];
        }
    }
    this.setLeftItem = function (back) {
        if (this.isAndroid) {
            this.actionBar.displayHomeAsUpEnabled = true;
            this.actionBar.displayShowHomeEnabled = true;
            this.actionBar.onHomeIconItemSelected = back;
            this.actionBar.icon = "bosimaj.png";
        } else {
            var leftItem = new SMF.UI.iOS.BarButtonItem({
                    image : "navbar_back.png",
                    onSelected : back
                });
            this.navigationItem.leftBarButtonItems = [leftItem];
        }
    }
    this.setLeftItemBos = function () {
        if (this.isAndroid) {
            this.actionBar.displayHomeAsUpEnabled = false;
            this.actionBar.displayShowHomeEnabled = false;
            this.actionBar.onHomeIconItemSelected = function () {}
            this.actionBar.icon = " ";
        } else {
            var leftItem = new SMF.UI.iOS.BarButtonItem({
                    image : "bosimaj.png",
                    onSelected : function (e) {}
                });
            this.navigationItem.leftBarButtonItems = [leftItem];
        }
    }

}