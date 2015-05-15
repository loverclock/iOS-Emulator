function SplashPage_Self_OnShow(e) {
    try {
        if (Device.deviceOS == "iOS") {
            if (Device.screenHeight == 480) {
                Pages.SplashPage.backgroundImage = "default_splashi4.png";
            }
        }
    } catch (ex) {
        alert(ex);
    }
}