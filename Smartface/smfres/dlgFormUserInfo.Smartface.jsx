function dlgFormUserInfo_imgClose_OnTouchEnded(e) {
    Dialogs.dlgFormUserInfo.close();
}
function dlgFormUserInfo_Self_OnKeyPress(e) {
    if (e.keyCode === 4) {
        Dialogs.dlgFormUserInfo.close();
    }
}