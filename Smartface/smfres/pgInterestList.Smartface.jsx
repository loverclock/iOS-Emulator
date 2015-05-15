
// user selects interest with repeatbox selectedItem event
function pgInterestList_rBoxInterest_OnSelectedItem(e) {
    Data.DS_Interest.seek(e.rowIndex);
    if (Data.DS_Interest.image == "") {
        Data.DS_Interest.image = "list_check.png";
        Data.DS_Interest.fontColor = "#057AFB";
    } else {
        Data.DS_Interest.fontColor = "#999999";
        Data.DS_Interest.image = "";
    }
    Data.notify("Data.DS_Interest");
}
// filling data to objects in repeatbox
function pgInterestList_rBoxInterest_OnRowRender(e) {
    Data.DS_Interest.seek(e.rowIndex);
    Pages.pgInterestList.rBoxInterest.imgOk.image = Data.DS_Interest.image;
    Pages.pgInterestList.rBoxInterest.lblInterest.fontColor = Data.DS_Interest.fontColor;
}
function showdlgInterestListInfo() {
    Dialogs.dlgInterestList.show();
}
function pgInterestList_Self_OnShow(e) {
    this.rBoxInterest.allowDeletingItems = false;
    fromLogin = 3;
    var title = "Interest List";
    // setting iOS NavigationBar
    if (Device.deviceOS == "Android") {}
    else {
        header.init(this, formHeader, formStatusbarColor, title);
        header.setLeftItem(pagesBack);
        header.setRightItem(showdlgInterestListInfo);
    }
}
function pgInterestList_Self_OnKeyPress(e) {
    if (e.keyCode == 4)
        Pages.back();
}