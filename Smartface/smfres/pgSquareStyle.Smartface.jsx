var index = 0;
var index2 = 0;
var index3 = 0;
// setting which open dialog
function showdlgSquareInfo() {
    Dialogs.dlgSquareInfo.show();
}
function pgSquareStyle_Self_OnShow(e) {
    var title = "Square Content";
    if (Device.deviceOS == "Android") {}
    else {
        header.init(this, listHeader, listStatusbarColor, title);
        header.setLeftItem(pagesBack);
        header.setRightItem(showdlgSquareInfo);
    }
    // setting position of svNewsImages0,svNewsImages1,svNewsImages2
    this.svNewsContentPager.svNewsContent0.svNewsImages0.height = Device.screenWidth / 1.5;
    this.svNewsContentPager.svNewsContent0.svNewsImages0.width = Device.screenWidth;
    this.svNewsContentPager.svNewsContent1.svNewsImages1.height = Device.screenWidth / 1.5;
    this.svNewsContentPager.svNewsContent1.svNewsImages1.width = Device.screenWidth;
    this.svNewsContentPager.svNewsContent2.svNewsImages2.width = Device.screenWidth;
    this.svNewsContentPager.svNewsContent2.svNewsImages2.height = Device.screenWidth / 1.5;
    Pages.pgSquareStyle.svNewsContentPager.svNewsContent0.contSlideIndex0.controls[0].image = "point_selected.png";
    Pages.pgSquareStyle.svNewsContentPager.svNewsContent1.contSlideIndex1.controls[0].image = "point_selected.png";
    Pages.pgSquareStyle.svNewsContentPager.svNewsContent2.contSlideIndex2.controls[0].image = "point_selected.png";
}
function pgSquareStyle_svNewsContentPager_OnPageChanged(e) {
    // using 3 scrollview for scroll performance and better UI
    // setting position of scrollviews and filling data to objects
    var index = e.pageIndex;
    if (index > 0 && index < newsArray.length - 1) {
        for (i = 0; i < 3; i++) {
            var innerSv = squareStyleNewsScrollViews[i];
            innerSv.controls[0].scrollX = 0;
            if (innerSv.left == Device.screenWidth * (index + 2)) {
                innerSv.left = Device.screenWidth * (index - 1);
                innerSv.controls[0].contentWidth = newsArray[index - 1].image.length * Device.screenWidth;
                innerSv.controls[1].text = newsArray[index - 1].title;
                innerSv.controls[2].text = newsArray[index - 1].description;
                innerSv.controls[2].height = squareStyleNewsLblHeights[index - 1];
                innerSv.contentHeight = squareStyleNewsScrollViewsContentHeights[index - 1] + 30;
                innerSv.controls[4].clear();
                for (j = 0; j < newsArray[index - 1].image.length; j++) {
                    innerSv.controls[0].controls[j].image = "";
                    innerSv.controls[0].controls[j].image = newsArray[index - 1].image[j].url;
                    innerSv.controls[4].add(new SMF.UI.Image({
                            width : "2.81%",
                            height : "100%",
                            image : "point.png",
                            enableScroll : false,
                        }));
                }
            }
            if (innerSv.left == Device.screenWidth * (index - 2)) {
                innerSv.left = Device.screenWidth * (index + 1);
                innerSv.controls[0].contentWidth = newsArray[index + 1].image.length * Device.screenWidth;
                innerSv.controls[1].text = newsArray[index + 1].title;
                innerSv.controls[2].text = newsArray[index + 1].description;
                innerSv.controls[2].height = squareStyleNewsLblHeights[index + 1];
                innerSv.contentHeight = squareStyleNewsScrollViewsContentHeights[index + 1] + 30;
                innerSv.controls[4].clear();
                for (j = 0; j < newsArray[index + 1].image.length; j++) {
                    innerSv.controls[0].controls[j].image = "";
                    innerSv.controls[0].controls[j].image = newsArray[index + 1].image[j].url;
                    innerSv.controls[4].add(new SMF.UI.Image({
                            width : "2.81%",
                            height : "100%",
                            image : "point.png",
                            enableScroll : false,
                        }));
                }
            }
            for (var j = 1; j < innerSv.controls[4].controls.length; j++) {
                innerSv.controls[4].controls[j].image = "point.png";
            }
            innerSv.controls[4].controls[0].image = "point_selected.png"
        }
    }
}
function pgSquareStyle_Self_OnKeyPress(e) {
    if (e.keyCode == 4) {
        Pages.back();
    }
}
function pgSquareStyle_svNewsImages0_OnPageChanged(e) {
    // setting sliderPointBar
    if (index < e.pageIndex) {
        Pages.pgSquareStyle.svNewsContentPager.svNewsContent0.contSlideIndex0.controls[e.pageIndex - 1].image = "point.png"
    } else {
        Pages.pgSquareStyle.svNewsContentPager.svNewsContent0.contSlideIndex0.controls[e.pageIndex + 1].image = "point.png";
    }
    Pages.pgSquareStyle.svNewsContentPager.svNewsContent0.contSlideIndex0.controls[e.pageIndex].image = "point_selected.png";
    index = e.pageIndex;
}
function pgSquareStyle_svNewsImages1_OnPageChanged(e) {
    // setting sliderPointBar
    if (index2 < e.pageIndex) {
        Pages.pgSquareStyle.svNewsContentPager.svNewsContent1.contSlideIndex1.controls[e.pageIndex - 1].image = "point.png"
    } else {
        Pages.pgSquareStyle.svNewsContentPager.svNewsContent1.contSlideIndex1.controls[e.pageIndex + 1].image = "point.png";
    }
    Pages.pgSquareStyle.svNewsContentPager.svNewsContent1.contSlideIndex1.controls[e.pageIndex].image = "point_selected.png";
    index2 = e.pageIndex;
}
function pgSquareStyle_svNewsImages2_OnPageChanged(e) {
    // setting sliderPointBar
    if (index3 < e.pageIndex) {
        Pages.pgSquareStyle.svNewsContentPager.svNewsContent2.contSlideIndex2.controls[e.pageIndex - 1].image = "point.png"
    } else {
        Pages.pgSquareStyle.svNewsContentPager.svNewsContent2.contSlideIndex2.controls[e.pageIndex + 1].image = "point.png";
    }
    Pages.pgSquareStyle.svNewsContentPager.svNewsContent2.contSlideIndex2.controls[e.pageIndex].image = "point_selected.png";
    index3 = e.pageIndex;
}