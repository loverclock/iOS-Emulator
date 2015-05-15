var imageKey = {
    width : "100%",
    height : "40%",
    left : 0,
    top : 100,
    visible : true,
    touchEnabled : false,
    image : "",
    imageFillType : "aspectFit",
    enableZoom : true,
    enableScroll : true
};
function dlgBoxedStyle_Self_OnShow(e) {
    Dialogs.dlgBoxedStyle.scrollContent.contentWidth = Device.screenWidth * newsArray[index].image.length;
    for (var i = 0; i < newsArray[index].image.length; i++) {
        imageKey.image = newsArray[index].image[i].url;
        imageKey.width = Device.screenWidth;
        imageKey.height = Device.screenWidth / 1.5;
        Dialogs.dlgBoxedStyle.scrollContent.add(new SMF.UI.Image(imageKey));
    }
    //Dialogs.dlgBoxedStyle.Image1.image = newsArray[index].image[0].url
    Dialogs.dlgBoxedStyle.Label1.text = newsArray[index].title;
    Dialogs.dlgBoxedStyle.Label2.text = 1;
}
function dlgBoxedStyle_scrollContent_OnPageChanged(e) {
    var i = e.pageIndex + 1;
    Dialogs.dlgBoxedStyle.Label2.text = i;
}
function dlgBoxedStyle_Image1_OnTouchEnded(e) {
    Dialogs.dlgBoxedStyle.close();
    Dialogs.dlgBoxedStyle.scrollContent.clear();
    Dialogs.dlgBoxedStyle.scrollContent.scrollX = 0;
}
function dlgBoxedStyle_Self_OnKeyPress(e) {
    if (e.keyCode === 4) {
        Dialogs.dlgBoxedStyle.close();
        Dialogs.dlgBoxedStyle.scrollContent.clear();
        Dialogs.dlgBoxedStyle.scrollContent.scrollX = 0;
    }
}