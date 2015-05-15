function dlgSquareInfo_imgClose_OnTouchEnded(e) {
    Dialogs.dlgSquareInfo.close();
}
function dlgSquareInfo_Self_OnKeyPress(e) {
    if (e.keyCode === 4) {
        Dialogs.dlgSquareInfo.close();
    }
}