function dlgInterestList_imgClose_OnTouchEnded(e) {
    Dialogs.dlgInterestList.close();
}
function dlgInterestList_Self_OnKeyPress(e) {
    if (e.keyCode === 4) {
        Dialogs.dlgInterestList.close();
    }
}