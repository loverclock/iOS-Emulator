function dlgInfo_Self_OnKeyPress(e) {
    if (e.keyCode === 4) {
        Dialogs.dlgInfo.close();
    }
}
function dlgInfo_imgClose_OnTouchEnded(e) {
    Dialogs.dlgInfo.close();
}