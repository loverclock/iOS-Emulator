function dlgDashboard_imgClose_OnTouchEnded(e) {
    Dialogs.dlgDashboard.close();
}
function dlgDashboard_Self_OnKeyPress(e) {
    if (e.keyCode === 4) {
        Dialogs.dlgDashboard.close();
    }
}