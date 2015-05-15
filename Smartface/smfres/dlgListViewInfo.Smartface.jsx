function dlgListViewInfo_imgClose_OnTouchEnded(e) {
    Dialogs.dlgListViewInfo.close();
}
function dlgListViewInfo_Self_OnKeyPress(e) {
    if (e.keyCode === 4) {
        Dialogs.dlgListViewInfo.close();
    }
}