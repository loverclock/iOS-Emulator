function dlgListLineInfo_imgClose_OnTouchEnded(e) {
    Dialogs.dlgListLineInfo.close();
}
function dlgListLineInfo_Self_OnKeyPress(e) {
    if (e.keyCode === 4) {
        Dialogs.dlgListLineInfo.close();
    }
}