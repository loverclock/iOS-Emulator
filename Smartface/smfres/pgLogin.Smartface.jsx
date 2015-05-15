var fbName; // Facebook Name
var fbPhone; // Facebook Phone
var fbBirthDay; // Facebook BirthDay
var fbuserName; // Facebook UserName
function pgLogin_btnLogin_OnPressed(e) {
    Pages.pgProfile.scrollMainProfile.scrollY = 0; // before going to pgProfile page , making scroll of scrollview to top
    emailorFbLogin = 0;
    // controlling email and password
    if (Pages.pgLogin.cntLogin.edtEmail.text != "") {
        if (validateEmail(Pages.pgLogin.cntLogin.edtEmail.text)) {
            if (Pages.pgLogin.cntLogin.edtPassword.text.length == 4) {
                Dialogs.dlgHomePgLoading.show();
                // creating JSON object
                var req = {
                    "Email" : Pages.pgLogin.cntLogin.edtEmail.text,
                    "Password" : Pages.pgLogin.cntLogin.edtPassword.text
                };
                loginRequest = JSON.stringify(req);
                loginWebClient.requestBody = loginRequest;
                loginWebClient.run(true);
                loginWebClient.onSyndicationSuccess = function (e) {
                    responseObjectProfile = JSON.parse(loginWebClient.responseText);
                    if (responseObjectProfile.isSuccess == "false") {
                        Pages.pgLogin.contValidation.lblError.text = "Email or password is incorrect";
                        Pages.pgLogin.contValidation.animate({
                            property : 'Y',
                            endValue : 0,
                            motionEase : SMF.UI.MotionEase.bounce,
                            duration : 300,
                            onFinish : function () {
                                Pages.pgLogin.recBackground.touchEnabled = true;
                            }
                        });
                    } else {
                        fId = "";
                        var path = Pages.pgProfile.scrollMainProfile.contUserInfo2;
                        var path2 = Pages.pgProfile.scrollMainProfile.contUserInfo4;
                        // setting UI of pgProfile
                        path.edtEmail1.visible = true;
                        path.edtPassword.visible = true;
                        path.lblEmail.visible = true;
                        path.lblPassword.visible = true;
                        path.lblFbName.visible = false;
                        path.imgFbLogo.visible = false;
                        // filling data from service to objects
                        path.edtEmail1.text = responseObjectProfile.Email;
                        Pages.pgProfile.cntNotifications.recNotificationRectangle.height = "100%";
                        path.edtPassword.text = responseObjectProfile.Password;
                        path.edtPhoneNumber.text = responseObjectProfile.Phone;
                        path.lblBirthDate.text = responseObjectProfile.BirthDate.toString();
                        path2.lblInterest.text = responseObjectProfile.Interests;
                        interestCheck(responseObjectProfile.Interests);
                        path2.lblLikePoint.text = responseObjectProfile.LikePoint;
                        path2.sliderLike.value = Number(responseObjectProfile.LikePoint);
                        Pages.pgProfile.scrollMainProfile.contUserInfo3.lblAddress.text = responseObjectProfile.Address;
                        Pages.pgProfile.scrollMainProfile.contUserInfo4.SwitchButton1.checked = responseObjectProfile.IsAllowMessage === "true";
                        if (responseObjectProfile.ImageUrl == "") {
                            Pages.pgProfile.scrollMainProfile.contUserInfo1.cntProfile.imgProfile.image = "empty_photo.png";
                        } else {
                            Pages.pgProfile.scrollMainProfile.contUserInfo1.cntProfile.imgProfile.image = responseObjectProfile.ImageUrl;
                        }
                        fromLogin = 1;
                        // setting mapview's map position(not object position)
                        SMF.Map.lookupLocation(
                            Pages.pgProfile.scrollMainProfile.contUserInfo3.lblAddress.text,
                            function (e) {
                            for (var i = 0; i < e.results.length; i++) {
                                latfromService = e.results[i].lat;
                                lngfromService = e.results[i].lng;
                                Pages.pgProfile.scrollMainProfile.contUserInfo3.mapAddress.centerLatitude = e.results[i].lat;
                                Pages.pgProfile.scrollMainProfile.contUserInfo3.mapAddress.centerLongitude = e.results[i].lng;
                            }
                        },
                            function () {});
                        Data.DS_Notification.refresh();
                        Pages.pgProfile.cntNotifications.lineDivideRow7.top = "98%";
                        Pages.pgProfile.contNotificationNumber.lblNotificationNumber.text = 5;
                        // setting Android ActionBar
                        if (Device.deviceOS == "Android") {
                            header.init(Pages.pgProfile, formHeader, formStatusbarColor, "User Profile");
                            header.setLeftItem(profileBack);
                            header.setRightItem(Dialogs.dlgFormUserInfo);
                        }
                        Pages.pgProfile.show(SMF.UI.MotionEase.accelerating, SMF.UI.TransitionEffect.rightToLeft, SMF.UI.TransitionEffectType.push, false, false);
                        SES.Analytics.eventLog("Login", '{\"function\":\"pgLogin_btnLogin_OnPressed\"}');
                        SES.Analytics.customerLog("", "", Pages.pgLogin.cntLogin.edtEmail.text, "", "");
                    }
                    Dialogs.dlgHomePgLoading.close();
                }
            } else {
                // showing error
                Pages.pgLogin.contValidation.lblError.text = "Password must be exactly 4 characters";
                Pages.pgLogin.contValidation.animate({
                    property : 'Y',
                    endValue : 0,
                    motionEase : SMF.UI.MotionEase.bounce,
                    duration : 300,
                    onFinish : function () {
                        Pages.pgLogin.recBackground.touchEnabled = true;
                    }
                });
            }
        } else {
            // showing error
            Pages.pgLogin.contValidation.lblError.text = "Please enter valid email";
            Pages.pgLogin.contValidation.animate({
                property : 'Y',
                endValue : 0,
                motionEase : SMF.UI.MotionEase.bounce,
                duration : 300,
                onFinish : function () {
                    Pages.pgLogin.recBackground.touchEnabled = true;
                }
            });
        }
    } else {
        // showing error
        Pages.pgLogin.contValidation.lblError.text = "Please enter email";
        Pages.pgLogin.contValidation.animate({
            property : 'Y',
            endValue : 0,
            motionEase : SMF.UI.MotionEase.bounce,
            duration : 300,
            onFinish : function () {
                Pages.pgLogin.recBackground.touchEnabled = true;
            }
        });
    }
}
function profileBack() {
    Social.Facebook.closeSession();
    Pages.pgLogin.show(SMF.UI.MotionEase.accelerating, SMF.UI.TransitionEffect.leftToRight, SMF.UI.TransitionEffectType.push, false, false);
}
// setting which open dialog
function showdlgFormDashboard(e) {
    Dialogs.dlgFormDashboard.show();
}
function pgLogin_Self_OnShow(e) {
    Pages.pgLogin.cntLogin.edtEmail.text = "";
    Pages.pgLogin.cntLogin.edtPassword.text = "";
    Pages.pgLogin.contValidation.top = "-16%";
    // setting iOS NavigationBar
    var title = "Login";
    if (Device.deviceOS == "Android") {}
    else {
        header.init(this, formHeader, formStatusbarColor, title);
        header.setLeftItem(homeBack);
        header.setRightItem(showdlgFormDashboard);
    }
}
function pgLogin_imgClose_OnTouch(e) {
    Pages.pgLogin.contValidation.animate({
        property : 'Y',
        endValue : "-16%",
        motionEase : SMF.UI.MotionEase.bounce,
        duration : 300,
        onFinish : function () {
            Pages.pgLogin.contValidation.lblError.text = "";
            Pages.pgLogin.recBackground.touchEnabled = false;
        }
    });
}
function pgLogin_recBackground_OnTouch(e) {
    Pages.pgLogin.contValidation.animate({
        property : 'Y',
        endValue : "-16%",
        motionEase : SMF.UI.MotionEase.bounce,
        duration : 300,
        onFinish : function () {
            Pages.pgLogin.contValidation.lblError.text = "";
            Pages.pgLogin.recBackground.touchEnabled = false;
        }
    });
}
// to notice that you filled password and email address
function readyToLogin() {
    if (Pages.pgLogin.cntLogin.edtEmail.text != "") {
        if (Pages.pgLogin.cntLogin.edtPassword.text.length == 4) {
            Pages.pgLogin.cntRegister.btnLogin.fontColor = "#FFFFFF";
            Pages.pgLogin.cntRegister.btnLogin.fillColor = "#2DCC70";
        } else {
            Pages.pgLogin.cntRegister.btnLogin.fillColor = "#E5E6E6";
            Pages.pgLogin.cntRegister.btnLogin.fontColor = "#919292";
        }
    } else {
        Pages.pgLogin.cntRegister.btnLogin.fillColor = "#E5E6E6";
        Pages.pgLogin.cntRegister.btnLogin.fontColor = "#919292";
    }
}
function pgLogin_edtEmail_OnChange(e) {
    readyToLogin();
}
function pgLogin_edtPassword_OnChange(e) {
    readyToLogin();
}
function pgLogin_btnRegister_OnPressed(e) {
    var pathScroll = Pages.pgRegister.scrollMainRegister;
    pathScroll.scrollY = 0; // before going to pgRegister page , making scroll of scrollview to top
    // objects values is setting default value
    pathScroll.contUserInfo1.cntProfile.imgProfile.image = "empty_photo.png";
    pathScroll.contUserInfo2.edtEmail1.text = "";
    pathScroll.contUserInfo2.edtPassword.text = "";
    pathScroll.contUserInfo2.edtPhoneNumber.text = "";
    pathScroll.contUserInfo2.lblBirthDate.text = "Birth Date";
    pathScroll.contUserInfo3.lblAddress.text = address;
    pathScroll.contUserInfo3.mapAddress.centerLatitude = myCurrentLat;
    pathScroll.contUserInfo3.mapAddress.centerLongitude = myCurrentLon;
    // setting Android ActionBar
    if (Device.deviceOS == "Android") {
        header.init(Pages.pgRegister, formHeader, formStatusbarColor, "Register");
        header.setLeftItem(profileBack);
        header.setRightItem(Dialogs.dlgFormRegister);
    }
    Pages.pgRegister.show(SMF.UI.MotionEase.accelerating, SMF.UI.TransitionEffect.rightToLeft, SMF.UI.TransitionEffectType.push, false, false);
    SES.Analytics.eventLog("Register", '{\"function\":\"pgLogin_btnRegister_OnPressed\"}');
}
function pgLogin_btnFace_OnPressed(e) {
    Pages.pgProfile.scrollMainProfile.scrollY = 0; //  before going to pgProfile page , making scroll of scrollview to top
    emailorFbLogin = 1;
    // open Session on Facebook
    Social.Facebook.openSession({
        onSuccess : function (e) {
            var token = e.data;
            Social.Facebook.userDetails({
                onSuccess : function (e) {
                    Dialogs.dlgHomePgLoading.show();
                    fbName = e.name;
                    fbBirthDay = e.birthday;
                    fId = e.id;
                    fbuserName = e.username;
                    var req = {
                        "Id" : fId,
                        "Token" : token
                    };
                    req = JSON.stringify(req);
                    fbLoginWebClient.requestBody = req;
                    fbLoginWebClient.onSyndicationSuccess = fbLoginWebClientOnsyndicationSuccess;
                    fbLoginWebClient.run();
                },
                onError : function () {
                    //alert(e.message);
                }
            });
        },
        onError : function (e) {
            // alert(e.message);
        }
    });
}
function fbLoginWebClientOnsyndicationSuccess(e) {
    fbResponseObject = JSON.parse(fbLoginWebClient.responseText);
    if (fbResponseObject.isSuccess == false) {
        alert("An error is occured");
    } else {
        var path = Pages.pgProfile.scrollMainProfile.contUserInfo2;
        var path2 = Pages.pgProfile.scrollMainProfile.contUserInfo4;
        path.edtEmail1.visible = false;
        path.edtPassword.visible = false;
        path.lblEmail.visible = false;
        path.lblPassword.visible = false;
        path.lblFbName.visible = true;
        path.imgFbLogo.visible = true;
        path.lblFbName.text = fbName;
        if (fbResponseObject.BirthDate == "") {
            path.lblBirthDate.text = fbBirthDay;
        } else {
            path.lblBirthDate.text = fbResponseObject.BirthDate;
        }
        if (fbResponseObject.ImageUrl == "") {
            Pages.pgProfile.scrollMainProfile.contUserInfo1.cntProfile.imgProfile.image = "http://graph.facebook.com/" + fId + "/picture?width=200&height=200";
        } else {
            Pages.pgProfile.scrollMainProfile.contUserInfo1.cntProfile.imgProfile.image = fbResponseObject.ImageUrl;
        }
        path.edtPhoneNumber.text = fbResponseObject.Phone;
        path2.lblInterest.text = fbResponseObject.Interests;
        interestCheck(fbResponseObject.Interests);
        path2.lblLikePoint.text = fbResponseObject.LikePoint;
        Pages.pgProfile.scrollMainProfile.contUserInfo3.lblAddress.text = fbResponseObject.Address;
        path2.sliderLike.value = Number(fbResponseObject.LikePoint);
        Pages.pgProfile.scrollMainProfile.contUserInfo4.SwitchButton1.checked = fbResponseObject.IsAllowMessage === "true";
        if (Device.deviceOS == "Android") {
            header.init(Pages.pgProfile, formHeader, formStatusbarColor, "User Profile");
            header.setLeftItem(profileBack);
            header.setRightItem(Dialogs.dlgFormUserInfo);
        }
        SMF.Map.lookupLocation(
            Pages.pgProfile.scrollMainProfile.contUserInfo3.lblAddress.text,
            function (e) {
            for (var i = 0; i < e.results.length; i++) {
                latfromFB = e.results[i].lat;
                lngfromFB = e.results[i].lng;
                Pages.pgProfile.scrollMainProfile.contUserInfo3.mapAddress.centerLatitude = e.results[i].lat;
                Pages.pgProfile.scrollMainProfile.contUserInfo3.mapAddress.centerLongitude = e.results[i].lng;
            }
        },
            function () {});
        Pages.pgProfile.show(SMF.UI.MotionEase.accelerating, SMF.UI.TransitionEffect.rightToLeft, SMF.UI.TransitionEffectType.push, false, false);
        SES.Analytics.eventLog("FacebookLogin", '{\"function\":\"pgLogin_btnFace_OnPressed\"}');
        SES.Analytics.customerLog("", "", fbName, "", "");
    }
    Dialogs.dlgHomePgLoading.close();
}
function pgLogin_Self_OnKeyPress(e) {
    if (e.keyCode == 4)
        Pages.pgDashboard.show(SMF.UI.MotionEase.accelerating, SMF.UI.TransitionEffect.leftToRight, SMF.UI.TransitionEffectType.push, false, false);
}
// after press returnKey of this object , open keyboard of edtPassword
function pgLogin_edtEmail_OnReturnKey(e) {
    Pages.pgLogin.cntLogin.edtPassword.focus();
}
// editting UI of rBoxInterest in pgInterestList page
function interestCheck(data) {
    var res = data.split(",");
    Data.DS_Interest.seek(0);
    for (var k = 0; k < Data.DS_Interest.rowCount; k++) {
        Data.DS_Interest.image = "";
        Data.DS_Interest.fontColor = "#999999";
        Data.DS_Interest.moveNext();
    }
    for (var i = 0; i < res.length; i++) {
        Data.DS_Interest.seek(0);
        for (var j = 0; j < Data.DS_Interest.rowCount; j++) {
            if (res[i] == Data.DS_Interest.interestName || Data.DS_Interest.image == "list_check.png") {
                Data.DS_Interest.image = "list_check.png";
                Data.DS_Interest.fontColor = "#057AFB";
            } else {
                Data.DS_Interest.image = "";
                Data.DS_Interest.fontColor = "#999999";
            }
            Data.DS_Interest.moveNext();
        }
    }
}