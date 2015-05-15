function dlgFormRegister_imgClose_OnTouchEnded(e) {
    Dialogs.dlgFormRegister.close();
}
function dlgFormRegister_Self_OnKeyPress(e) {
    if (e.keyCode === 4) {
        Dialogs.dlgFormRegister.close();
    }
}