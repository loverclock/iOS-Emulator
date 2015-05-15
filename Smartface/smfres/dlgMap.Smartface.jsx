function dlgMap_imgClose_OnTouch(e) {
    Dialogs.dlgMap.close();
}
function dlgMap_Self_OnKeyPress(e) {
    if (e.keyCode === 4) {
        Dialogs.dlgMap.close();
    }
}