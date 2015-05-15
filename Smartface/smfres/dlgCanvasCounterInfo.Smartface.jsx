function dlgCanvasCounterInfo_imgClose_OnTouchEnded(e) {
    Dialogs.dlgCanvasCounterInfo.close();
}
function dlgCanvasCounterInfo_Self_OnKeyPress(e) {
    if (e.keyCode === 4) {
        Dialogs.dlgCanvasCounterInfo.close();
    }
}