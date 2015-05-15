function dlgCanvasLineInfo_imgClose_OnTouchEnded(e) {
    Dialogs.dlgCanvasLineInfo.close();
}
function dlgCanvasLineInfo_Self_OnKeyPress(e) {
    if (e.keyCode === 4) {
        Dialogs.dlgCanvasLineInfo.close();
    }
}