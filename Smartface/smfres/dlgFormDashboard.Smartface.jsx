function dlgFormDashboard_imgClose_OnTouchEnded(e) {
    Dialogs.dlgFormDashboard.close();
}
function dlgFormDashboard_Self_OnKeyPress(e) {
    if (e.keyCode === 4) {
        Dialogs.dlgFormDashboard.close();
    }
}