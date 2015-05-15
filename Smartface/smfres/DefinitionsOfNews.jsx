var isUsingSwipe = false; // a flag , control svNewsContentPages in pgLineStyle swipe
widthOfScreen = Device.screenWidth; // value of Device screenwidth
heightOfScreen = Device.screenHeight; // value of Device screenHeight
changeLang(Device.language, true);

// making shortcut for better performance
lineStyleNewsScrollViews = [Pages.pgLineStyle.svNewsContentPager.svNewsContent0,
    Pages.pgLineStyle.svNewsContentPager.svNewsContent1,
    Pages.pgLineStyle.svNewsContentPager.svNewsContent2];

// making shortcut for better performance
lineStyleNewsScrollViews1 = [Pages.pgLineStyle.svNewsContentPager.svNewsContent0.content0,
    Pages.pgLineStyle.svNewsContentPager.svNewsContent1.content1,
    Pages.pgLineStyle.svNewsContentPager.svNewsContent2.content2];

lineStyleNewsLblHeights = []; // array for holding lblNewsContentDescription height value in pgLineStyle
lineStyleNewsScrollViewsContentHeights = []; // array for holding scrollView(content) height value in pgLineStyle

// making shortcut for better performance
boxedStyleNewsScrollViews = [Pages.pgBoxedStyle.svNewsContentPager.svNewsContent0,
    Pages.pgBoxedStyle.svNewsContentPager.svNewsContent1,
    Pages.pgBoxedStyle.svNewsContentPager.svNewsContent2];

boxedStyleNewsLblHeights = []; // array for holding lblNewsContentDescription height value in pgBoxedStyle
boxedStyleNewsScrollViewsContentHeights = []; // array for holding scrollView(content) height value in pgBoxedStyle

// making shortcut for better performance
squareStyleNewsScrollViews = [Pages.pgSquareStyle.svNewsContentPager.svNewsContent0,
    Pages.pgSquareStyle.svNewsContentPager.svNewsContent1,
    Pages.pgSquareStyle.svNewsContentPager.svNewsContent2];

squareStyleNewsLblHeights = []; // array for holding lblNewsContentDescription height value in pgSquareStyle
squareStyleNewsScrollViewsContentHeights = []; // array for holding scrollView(content) height value in pgSquareStyle


setupNewsRepeatBoxImageHeights(); // array for holding rpbxLine,rpbxSquare and rpbxBoxed height values in pgSquareStyle

// making shortcut for better performance
dlgboxedStyleNewsScrollViews = [Dialogs.dlgBoxedStyle.scrollContent.ScrollView1,
    Dialogs.dlgBoxedStyle.scrollContent.ScrollView2,
    Dialogs.dlgBoxedStyle.scrollContent.ScrollView3];

dlgboxedStyleNewsLblHeights = [];
dlgboxedStyleNewsScrollViewsContentHeights = [];