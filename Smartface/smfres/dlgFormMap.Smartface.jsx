function dlgFormMap_imgClose_OnTouchEnded(e) {
    Dialogs.dlgFormMap.close();
}
function dlgFormMap_Self_OnKeyPress(e) {
    if (e.keyCode === 4) {
        Dialogs.dlgFormMap.close();
    }
}