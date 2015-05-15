function dlgBoxedInfo_imgClose_OnTouchEnded(e) {
    Dialogs.dlgBoxedInfo.close();
}
function dlgBoxedInfo_Self_OnKeyPress(e) {
    if (e.keyCode === 4) {
        Dialogs.dlgBoxedInfo.close();
    }
}