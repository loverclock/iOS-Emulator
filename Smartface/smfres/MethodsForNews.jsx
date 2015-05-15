function homePageSelectTab(touchedImage) {
    Pages.pgListView.contTabHome.contBoxed.imgBoxedInactive

    // making shortcut for better performance
    var inactiveImages = [Pages.pgListView.contTabHome.contLine.imgLineInactive,
        Pages.pgListView.contTabHome.contSquare.imgSquareInactive,
        Pages.pgListView.contTabHome.contBoxed.imgBoxedInactive];

    var activeImages = [Pages.pgListView.contTabHome.contLine.imgLineActive,
        Pages.pgListView.contTabHome.contSquare.imgSquareActive,
        Pages.pgListView.contTabHome.contBoxed.imgBoxedActive];

    var repeatBoxes = [Pages.pgListView.rpbxLine, Pages.pgListView.rpbxSquare, Pages.pgListView.rpbxBoxed];

    // setting UI of tabbar in pgListView
    for (i = 0; i < inactiveImages.length; i++) {
        if (inactiveImages[i] == touchedImage) {
            inactiveImages[i].visible = false;
            activeImages[i].visible = true;
            repeatBoxes[i].visible = true;
            repeatBoxes[i].scrollsToTop = true;
        } else {
            inactiveImages[i].visible = true;
            activeImages[i].visible = false;
            repeatBoxes[i].visible = false;
            repeatBoxes[i].scrollsToTop = false;
        }
    }
}

function fillDataToLineStyledScrollViews(startingIndex) {

    // filling data to objects and setting position of objects
    for (i = 0; i < 3; i++) {
        // lineStyleNewsScrollViews[i].scrollY = 0;
        lineStyleNewsScrollViews[i].left = (startingIndex + i) * Device.screenWidth;
        lineStyleNewsScrollViews[i].controls[0].image = newsArrayList[startingIndex + i].image[0].url;
        lineStyleNewsScrollViews[i].controls[1].controls[0].text = newsArrayList[startingIndex + i].title;
        lineStyleNewsScrollViews[i].controls[1].controls[1].text = newsArrayList[startingIndex + i].description;
        lineStyleNewsScrollViews[i].controls[1].controls[1].height = lineStyleNewsLblHeights[startingIndex + i];
        lineStyleNewsScrollViews[i].controls[1].contentHeight = lineStyleNewsScrollViewsContentHeights[startingIndex + i];
    }

}

function fillDataToBoxedStyledScrollViews(startingIndex) {

    // filling data to objects and setting position of objects
    for (i = 0; i < 3; i++) {
        boxedStyleNewsScrollViews[i].scrollY = 0;
        boxedStyleNewsScrollViews[i].left = (startingIndex + i) * Device.screenWidth;
        boxedStyleNewsScrollViews[i].controls[0].image = newsArray[startingIndex + i].image[0].url;
        boxedStyleNewsScrollViews[i].controls[1].text = newsArray[startingIndex + i].title;
        boxedStyleNewsScrollViews[i].controls[2].text = newsArray[startingIndex + i].description;
        boxedStyleNewsScrollViews[i].controls[2].height = boxedStyleNewsLblHeights[startingIndex + i];
        boxedStyleNewsScrollViews[i].contentHeight = boxedStyleNewsScrollViewsContentHeights[startingIndex + i];
    }
}

function fillDataToSquareStyledScrollViews(startingIndex) {

    // filling data to objects and setting position of objects
    for (i = 0; i < 3; i++) {
        squareStyleNewsScrollViews[i].scrollY = 0;
        squareStyleNewsScrollViews[i].left = (startingIndex + i) * Device.screenWidth;
        squareStyleNewsScrollViews[i].controls[0].contentWidth = newsArray[startingIndex + i].image.length * Device.screenWidth;
        squareStyleNewsScrollViews[i].controls[1].text = newsArray[startingIndex + i].title;
        squareStyleNewsScrollViews[i].controls[2].text = newsArray[startingIndex + i].description;
        squareStyleNewsScrollViews[i].controls[2].height = squareStyleNewsLblHeights[startingIndex + i];
        squareStyleNewsScrollViews[i].contentHeight = squareStyleNewsScrollViewsContentHeights[startingIndex + i];
        squareStyleNewsScrollViews[i].controls[4].clear(); ///
        for (j = 0; j < newsArray[startingIndex + i].image.length; j++) {
            squareStyleNewsScrollViews[i].controls[0].controls[j].image = "";
            squareStyleNewsScrollViews[i].controls[0].controls[j].image = newsArray[startingIndex + i].image[j].url;

            squareStyleNewsScrollViews[i].controls[4].add(new SMF.UI.Image({
                    width : "2.81%",
                    height : "100%",
                    image : "point.png",
                    enableScroll : false,
                }));
        }

    }
}

// setting position of objects in pgListView
function setupNewsRepeatBoxImageHeights() {
    var rpbxHeight = Device.screenHeight * 915 / 1000;

    var boxedImageHeight = rpbxHeight * 25 / 100;
    var boxedImageWidth = Device.screenWidth;
    if ((boxedImageWidth / boxedImageHeight) > 1.5) {
        Pages.pgListView.rpbxBoxed.imgBoxed.height = boxedImageWidth * 2 / 3;
        Pages.pgListView.rpbxBoxed.imgBoxed.top = (boxedImageHeight - boxedImageWidth * 2 / 3) / 2;
    } else {
        Pages.pgListView.rpbxBoxed.imgBoxed.width = boxedImageHeight * 3 / 2;
        Pages.pgListView.rpbxBoxed.imgBoxed.left = (boxedImageWidth - boxedImageHeight * 3 / 2) / 2;
    }

    var lineImageHeight = (rpbxHeight * 16 / 100) * 85 / 100;
    var lineImageWidth = Device.screenWidth * 40 / 100;
    if ((lineImageWidth / lineImageHeight) > 1.5) {
        Pages.pgListView.rpbxLine.Image1.height = lineImageWidth * 2 / 3;
    } else {
        Pages.pgListView.rpbxLine.Image1.width = lineImageHeight * 3 / 2;
        Pages.pgListView.rpbxLine.Image1.left = lineImageWidth - lineImageHeight * 3 / 2;
    }

    var squareImageHeight = rpbxHeight * 25 / 100;
    var squareImageWidth = Device.screenWidth * 50 / 100;
    if ((squareImageWidth / squareImageHeight) > 1.5) {
        Pages.pgListView.rpbxSquare.imgSquareLeft.height = squareImageWidth * 2 / 3;
        Pages.pgListView.rpbxSquare.imgSquareLeft.top = (squareImageHeight - squareImageWidth * 2 / 3) / 2;
        Pages.pgListView.rpbxSquare.imgSquareRight.height = squareImageWidth * 2 / 3;
        Pages.pgListView.rpbxSquare.imgSquareRight.top = (squareImageHeight - squareImageWidth * 2 / 3) / 2;
    } else {
        Pages.pgListView.rpbxSquare.imgSquareLeft.width = squareImageHeight * 3 / 2;
        Pages.pgListView.rpbxSquare.imgSquareLeft.left = squareImageWidth - squareImageHeight * 3 / 2;
        Pages.pgListView.rpbxSquare.imgSquareRight.width = squareImageHeight * 3 / 2;
    }
}