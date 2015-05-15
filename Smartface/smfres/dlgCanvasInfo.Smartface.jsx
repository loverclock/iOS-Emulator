function dlgCanvasInfo_imgClose_OnTouchEnded(e) {
    Dialogs.dlgCanvasInfo.close();
}
function dlgCanvasInfo_Self_OnKeyPress(e) {
    if (e.keyCode === 4) {
        Dialogs.dlgCanvasInfo.close();
    }
}