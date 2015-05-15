var birthDate; // a flag , holding date value from datepicker
var isAnimating = false; // a flag for control cntNotifications position
var isAnimate1 = false; // a flag for control cntNotifications position // kontrol et tekrar
var updateProfileImageWebClient = new SMF.Net.WebClient(); // webClient object for fetching server response
var imageFileProfile;
var isAllow = Pages.pgProfile.scrollMainProfile.contUserInfo4.SwitchButton1.checked;
// setting back button function
function profileBack() {
    Social.Facebook.closeSession();
    Pages.pgLogin.show(SMF.UI.MotionEase.accelerating, SMF.UI.TransitionEffect.leftToRight, SMF.UI.TransitionEffectType.push, false, false);
}
// setting which open dialog
function dlgFormUserInfo() {
    Dialogs.dlgFormUserInfo.show();
}
function pgProfile_Self_OnShow(e) {
    if (Device.deviceOS == "iOS") {
        if (Device.screenHeight == "480") {
            Pages.pgProfile.contNotificationNumber.lblNotificationNumber.top = "32.66%";
        }
    }
    Pages.pgProfile.contNotificationNumber.imgNotificationNumber.touchEnabled = true;
    this.cntNotifications.rboxNotifications.allowDeletingItems = false;
    Pages.pgProfile.cntNotifications.top = "-43.25%";
    // set SwipeItem for rboxNotifications.iOS only supports this feature.
    if (Device.deviceOS == "Android") {}
    else {
        try {
            var itemDelete = new SMF.UI.RepeatboxSwipeItem({
                    width : 90,
                    height : "100%",
                    left : Pages.pgProfile.cntNotifications.rboxNotifications.width - 90,
                    top : 0,
                    text : "Delete",
                    fontColor : "#dddddd",
                    pressedFontColor : "#ffffff",
                    fillColor : "#ff0000",
                    onSelected : function (e) {
                        Data.DS_Notification.seek(e.rowIndex);
                        Data.DS_Notification.deleteRow();
                        Data.notify(Data.DS_Notification);
                        Pages.pgProfile.contNotificationNumber.lblNotificationNumber.text = Data.DS_Notification.rowCount.toString();
                        if (Number(Data.DS_Notification.rowCount) < 3) {
                            Pages.pgProfile.cntNotifications.lineDivideRow7.top -= Pages.pgProfile.cntNotifications.rboxNotifications.itemTemplate.height;
                            Pages.pgProfile.cntNotifications.recNotificationRectangle.height = Pages.pgProfile.cntNotifications.lineDivideRow7.top;
                        }
                        if (Number(Data.DS_Notification.rowCount) == 0) {
                            Pages.pgProfile.contNotificationNumber.imgNotificationNumber.touchEnabled = false;
                            Pages.pgProfile.contNotificationNumber.visible = false;
                        } else {
                            Pages.pgProfile.contNotificationNumber.imgNotificationNumber.touchEnabled = true;
                        }
                    }
                });
            var items = [itemDelete];
            this.cntNotifications.rboxNotifications.setSwipeItems(items);
        } catch (ex) {
            alert(ex.message);
        }
    }
    if (fromLogin == 3) {
        Pages.pgProfile.scrollMainProfile.contUserInfo4.lblInterest.text = "";
        Data.DS_Interest.seek(0);
        for (var i = 0; i < Data.DS_Interest.rowCount; i++) {
            if (!Data.DS_Interest.image == "")
                Pages.pgProfile.scrollMainProfile.contUserInfo4.lblInterest.text += Data.DS_Interest.interestName + ",";
            Data.DS_Interest.moveNext();
            continue;
        }
    } else if (fromLogin == 2)
        this.scrollMainProfile.contUserInfo3.lblAddress.text = address;
    var title = "User Profile";
    if (Device.deviceOS == "Android") {}
    else {
        if (Device.deviceOS == "iOS") {
            header.init(this, formHeader, formStatusbarColor, title);
            header.setLeftItem(profileBack);
            header.setRightItem(dlgFormUserInfo);
            this.scrollMainProfile.contUserInfo4.SwitchButton1.tintColor = "#BEC3C7";
            this.scrollMainProfile.contUserInfo4.SwitchButton1.thumbTintColor = "white";
            this.scrollMainProfile.contUserInfo4.SwitchButton1.onTintColor = "#6FD865";
        }
    }
    if (this.scrollMainProfile.contUserInfo4.SwitchButton1.checked == true) {
        Pages.pgProfile.contNotificationNumber.imgNotificationNumber.visible = true;
        Pages.pgProfile.scrollMainProfile.onScroll = onScrollFunc;
        Pages.pgProfile.contNotificationNumber.lblNotificationNumber.text = Number(Data.DS_Notification.rowCount);
        Pages.pgProfile.contNotificationNumber.lblNotificationNumber.visible = true;
        Pages.pgProfile.contNotificationNumber.visible = true;
    } else {
        Pages.pgProfile.contNotificationNumber.imgNotificationNumber.visible = false;
        Pages.pgProfile.contNotificationNumber.lblNotificationNumber.visible = false;
        Pages.pgProfile.contNotificationNumber.visible = false;
        Pages.pgProfile.scrollMainProfile.onScroll = function (e) {};
    }
    // to set emotion image to object according to interest value
    var valueofEmotion = Number(this.scrollMainProfile.contUserInfo4.lblLikePoint.text);
    if (valueofEmotion >= 80) {
        Pages.pgProfile.scrollMainProfile.contUserInfo4.imgLike.image = "emotion_love.png";
    }
    if (valueofEmotion >= 60 && valueofEmotion < 80) {
        this.scrollMainProfile.contUserInfo4.imgLike.image = "emotion_cool.png";
    }
    if (valueofEmotion >= 40 && valueofEmotion < 60) {
        this.scrollMainProfile.contUserInfo4.imgLike.image = "emotion_happy.png";
    }
    if (valueofEmotion >= 20 && valueofEmotion < 40) {
        this.scrollMainProfile.contUserInfo4.imgLike.image = "emotion_eh.png";
    }
    if (valueofEmotion < 20) {
        this.scrollMainProfile.contUserInfo4.imgLike.image = "emotion_sad.png";
    }
}
function onScrollFunc(e) {
    if (Number(Data.DS_Notification.rowCount) == 0) {
        Pages.pgProfile.contNotificationNumber.visible = true;
    } else
        if (e.scrollY < -20) {
            if (!isAnimating) {
                isAnimating = true;
                Pages.pgProfile.cntNotifications.animate({
                    property : 'Y',
                    endValue : "0",
                    motionEase : SMF.UI.MotionEase.bounce,
                    duration : '400',
                    OnFinish :
                    function () {
                        isAnimating = false;
                    }
                });
                Pages.pgProfile.contNotificationNumber.visible = false;
            }
        }
    if (e.scrollY > 10) {
        if (!isAnimating) {
            Pages.pgProfile.contNotificationNumber.visible = true;
            isAnimating = true;
            Pages.pgProfile.cntNotifications.animate({
                property : 'Y',
                endValue : "-43.25%",
                motionEase : SMF.UI.MotionEase.bounce,
                duration : '400',
                OnFinish :
                function () {
                    isAnimating = false;
                    isAnimate1 = false;
                }
            });
        }
    }
}
// to show how to get the image
function pgProfile_imgProfile_OnTouchEnded(e) {
    imgCropSelect = 1;
    var item1 = {
        title : "Select from Gallery",
        icon : "icon.png", // Andrid 3.0- only
        onSelected : function (e) {
            Device.Media.pickFromGallery({
                type : [SMF.MediaType.image],
                onSuccess : function (e) {
                    var im = new SMF.Image({
                            imageUri : e.file,
                            onSuccess : function (e) {
                                im.resize({
                                    width : 200,
                                    height : 200,
                                    format : SMF.ImageFormat.PNG,
                                    compressionRate : 0.7,
                                    onSuccess : function (e) {
                                        Pages.pgProfile.scrollMainProfile.contUserInfo1.cntProfile.imgProfile.image = e.image;
                                        if (Device.deviceOS == "Android")
                                            imageFileProfile = new SMF.IO.File(e.image);
                                        else
                                            imageFileProfile = new SMF.IO.File(SMF.IO.applicationDataDirectory, e.image);
                                    },
                                    onError : function (e) {
                                        alert(e.message);
                                    }
                                });
                            },
                            onError : function (e) {
                                alert( + e.message);
                            }
                        });
                },
                onCancel : function (e) {},
                onError : function (e) {}
            });
        }
    };
    var item2 = {
        title : "Capture a Photo",
        onSelected : function (e) {
            SMF.Multimedia.startCamera(0, 0, 1,
                function () {},
                function (e) {
                var im = new SMF.Image({
                        imageUri : e.photoUri,
                    });
                im.resize({
                    width : 200,
                    height : 200,
                    format : SMF.ImageFormat.PNG,
                    compressionRate : 0.7,
                    onSuccess : function (e) {
                        Pages.pgProfile.scrollMainProfile.contUserInfo1.cntProfile.imgProfile.image = e.image;
                        if (Device.deviceOS == "Android")
                            imageFileProfile = new SMF.IO.File(e.image);
                        else
                            imageFileProfile = new SMF.IO.File(SMF.IO.applicationDataDirectory, e.image);
                    },
                    onError : function (e) {
                        alert(e.message);
                    }
                });
            },
                function () {},
                function () {});
        }
    };
    var item3 = {
        title : "Cancel",
        itemType : SMF.UI.MenuItemType.cancel, //  iOS Only
        onSelected : function (e) {}
    };
    var myItems = [item1, item2, item3]; // assume that items are predefined
    var menu1 = new SMF.UI.Menu({
            menuStyle : SMF.UI.MenuStyle.optionalMenu,
            icon : "menu_icon.png", // Android Context Menu Only
            items : myItems
        });
    menu1.show();
}
function pgProfile_btnSubmit_OnPressed(e) {
    if (emailorFbLogin == 0) {
        if (Pages.pgProfile.scrollMainProfile.contUserInfo2.edtEmail1.text != "") {
            if (Pages.pgProfile.scrollMainProfile.contUserInfo2.edtPassword.text.length == 4) {
                Dialogs.dlgHomePgLoading.show();
                // to create JSON Object
                var req = {
                    "Password" : Pages.pgProfile.scrollMainProfile.contUserInfo2.edtPassword.text,
                    "Email" : Pages.pgProfile.scrollMainProfile.contUserInfo2.edtEmail1.text,
                    "Phone" : Pages.pgProfile.scrollMainProfile.contUserInfo2.edtPhoneNumber.text,
                    "BirthDate" : Pages.pgProfile.scrollMainProfile.contUserInfo2.lblBirthDate.text,
                    "IsAllowMessage" : isAllow,
                    "Address" : Pages.pgProfile.scrollMainProfile.contUserInfo3.lblAddress.text,
                    "LikePoint" : Number(Pages.pgProfile.scrollMainProfile.contUserInfo4.sliderLike.value),
                    "Interests" : Pages.pgProfile.scrollMainProfile.contUserInfo4.lblInterest.text,
                };
                req = JSON.stringify(req);
                updateWebClient.requestBody = req;
                updateProfileImageWebClient.url = "http://services.smartface.io/SmartfaceInAction/UploadProfileLogo?email=" + Pages.pgProfile.scrollMainProfile.contUserInfo2.edtEmail1.text;
                updateWebClient.onSyndicationSuccess = updateOnsyndicationSuccess;
                updateWebClient.run(true);
                SES.Analytics.customerLog("", "", Pages.pgProfile.scrollMainProfile.contUserInfo2.edtPhoneNumber.text, Pages.pgProfile.scrollMainProfile.contUserInfo2.edtEmail1.text, Pages.pgProfile.scrollMainProfile.contUserInfo2.edtEmail1.text);
            } else {
                alert("Password must be at least 4 characters");
            }
        } else {
            alert("Please enter email");
        }
    } else if (emailorFbLogin == 1) {
        Dialogs.dlgHomePgLoading.show();
        // to create JSON Object
        var req = {
            "Phone" : Pages.pgProfile.scrollMainProfile.contUserInfo2.edtPhoneNumber.text,
            "BirthDate" : Pages.pgProfile.scrollMainProfile.contUserInfo2.lblBirthDate.text,
            "IsAllowMessage" : isAllow,
            "Address" : Pages.pgProfile.scrollMainProfile.contUserInfo3.lblAddress.text,
            "LikePoint" : Number(Pages.pgProfile.scrollMainProfile.contUserInfo4.sliderLike.value),
            "Interests" : Pages.pgProfile.scrollMainProfile.contUserInfo4.lblInterest.text,
            "FacebookId" : fId
        };
        req = JSON.stringify(req);
        updateProfileImageWebClient.url = "http://services.smartface.io/SmartfaceInAction/UploadProfileLogo?email=" + fId;
        updateWebClient.requestBody = req;
        updateWebClient.onSyndicationSuccess = updateOnsyndicationSuccess;
        updateWebClient.run(true);
        SES.Analytics.customerLog("", "", Pages.pgProfile.scrollMainProfile.contUserInfo2.edtPhoneNumber.text, Pages.pgProfile.scrollMainProfile.contUserInfo2.edtEmail1.text, Pages.pgProfile.scrollMainProfile.contUserInfo2.edtEmail1.text);
    }
}
function updateOnsyndicationSuccess(e) {
    var responseObjct = JSON.parse(updateWebClient.responseText);
    if (responseObjct.isSuccess == "false") {
        alert("An error is occured");
        Dialogs.dlgHomePgLoading.close();
    } else {
        alert("Update is succesfully.");
        updateProfileImageWebClient.httpMethod = "PUT";
        updateProfileImageWebClient.request = imageFileProfile;
        updateProfileImageWebClient.requestHeaders = ["Content-Type: image/png"];
        updateProfileImageWebClient.ignoreSSLErros = true;
        updateProfileImageWebClient.run(true);
        updateProfileImageWebClient.onSyndicationSuccess = function (e) {
            var response = JSON.parse(updateProfileImageWebClient.responseText);
            Dialogs.dlgHomePgLoading.close();
        }
    }
}
// to set emotion image to object according to slider value
function pgProfile_sliderLike_OnChange(e) {
    if (this.value >= 80) {
        this.parent.imgLike.image = "emotion_love.png";
    }
    if (this.value >= 60 && this.value < 80) {
        this.parent.imgLike.image = "emotion_cool.png";
    }
    if (this.value >= 40 && this.value < 60) {
        this.parent.imgLike.image = "emotion_happy.png";
    }
    if (this.value >= 20 && this.value < 40) {
        this.parent.imgLike.image = "emotion_eh.png";
    }
    if (this.value < 20) {
        this.parent.imgLike.image = "emotion_sad.png";
    }
    Pages.pgProfile.scrollMainProfile.contUserInfo4.lblLikePoint.text = this.value;
}
// setting contNotificationNumber position according to switchbutton value
function pgProfile_SwitchButton1_OnChange(e) {
    isAllow = this.checked;
    if (this.checked) {
        isAnimating = false;
        isAnimate1 = false;
        Pages.pgProfile.cntNotifications.top = "-43.25%";
        Pages.pgProfile.contNotificationNumber.imgNotificationNumber.visible = true;
        Pages.pgProfile.contNotificationNumber.lblNotificationNumber.visible = true;
        Pages.pgProfile.scrollMainProfile.onScroll = onScrollFunc;
        Pages.pgProfile.contNotificationNumber.lblNotificationNumber.text = Data.DS_Notification.rowCount;
    } else {
        isAnimating = true;
        isAnimate1 = true;
        Pages.pgProfile.contNotificationNumber.imgNotificationNumber.visible = false;
        Pages.pgProfile.contNotificationNumber.lblNotificationNumber.visible = false;
        Pages.pgProfile.cntNotifications.top = "-43.25%";
        Pages.pgProfile.scrollMainProfile.onScroll = function (e) {};
    }
}
function pgProfile_btnInteres_OnPressed(e) {
    header.init(Pages.pgInterestList, formHeader, formStatusbarColor, "Interest List");
    header.setLeftItem(pagesBack);
    header.setRightItem(Dialogs.dlgInterestList);
    Pages.pgInterestList.show(SMF.UI.MotionEase.accelerating, SMF.UI.TransitionEffect.rightToLeft, SMF.UI.TransitionEffectType.push, false, false);
}
// selecting date from datepicker
function pgProfile_lblBirthDate_OnTouchEnded(e) {
    SMF.UI.showDatePicker({
        currentDate : new Date("November 14, 1994 11:13:00"),
        mask : "YYYY-MM-DD",
        minDate : new Date("December 31, 1920 11:13:00"),
        maxDate : new Date("December 31, 2000 11:13:00"),
        showWorkingDate : true,
        onSelect : function (e) {
            var sDate = new Date(e.date);
            Pages.pgProfile.scrollMainProfile.contUserInfo2.lblBirthDate.text = formattedDate(sDate);
            birthDate = sDate;
        },
        onCancel : function (e) {}
    });
}
function formattedDate(date) {
    var d = new Date(date || Date.now()),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    return [year, month, day].join('-');
}
function pgProfile_imgNotificationNumber_OnTouchEnded(e) {
    if (!isAnimate1) {
        Pages.pgProfile.contNotificationNumber.visible = false;
        Pages.pgProfile.cntNotifications.animate({
            property : 'Y',
            endValue : "0",
            motionEase : SMF.UI.MotionEase.bounce,
            duration : '400',
            OnFinish :
            function () {
                isAnimate1 = true;
            }
        });
    }
}
function pgProfile_mapAddress_OnLongTouch(e) {
    Pages.pgMapView.show(SMF.UI.MotionEase.accelerating, SMF.UI.TransitionEffect.rightToLeft, SMF.UI.TransitionEffectType.push, false, false);
    fromLogin = 2;
}
function pgProfile_imgMap_OnPressed(e) {
    fromRegisterorProfile = 1;
    header.init(Pages.pgMapView, formHeader, formStatusbarColor, "Map");
    header.setLeftItem(pagesBack);
    header.setRightItem(Dialogs.dlgFormMap);
    Pages.pgMapView.show(SMF.UI.MotionEase.accelerating, SMF.UI.TransitionEffect.rightToLeft, SMF.UI.TransitionEffectType.push, false, false);
}
// deleting item with repeatbox onlongtouch event.It is using on Android
function pgProfile_rboxNotifications_OnLongTouch(e) {
    if (Device.deviceOS == "Android") {
        var alertObj = alert({
                title : 'Message',
                message : 'Are you sure to delete?',
                firstButtonText : "Ok",
                secondButtonText : "Cancel",
                onFirstButtonPressed : function () {
                    if (Device.deviceOS == "Android") {
                        Data.DS_Notification.seek(e.rowIndex);
                        Data.DS_Notification.deleteRow();
                        Data.notify(Data.DS_Notification);
                        Pages.pgProfile.contNotificationNumber.lblNotificationNumber.text = Data.DS_Notification.rowCount.toString();
                        if (Number(Data.DS_Notification.rowCount) < 3) {
                            Pages.pgProfile.cntNotifications.lineDivideRow7.top -= Pages.pgProfile.cntNotifications.rboxNotifications.itemTemplate.height;
                            Pages.pgProfile.cntNotifications.recNotificationRectangle.height = Pages.pgProfile.cntNotifications.lineDivideRow7.top;
                        }
                        if (Number(Data.DS_Notification.rowCount) == 0) {
                            Pages.pgProfile.contNotificationNumber.imgNotificationNumber.touchEnabled = false;
                            Pages.pgProfile.contNotificationNumber.visible = true;
                        } else {
                            Pages.pgProfile.contNotificationNumber.imgNotificationNumber.touchEnabled = true;
                        }
                    }
                },
                onSecondButtonPressed : function () {}
            });
    }
}
// selecting date from datepicker
function pgProfile_lblBirthData_OnTouchEnded(e) {
    SMF.UI.showDatePicker({
        currentDate : new Date("November 14, 1994 11:13:00"),
        mask : "YYYY-MM-DD",
        minDate : new Date("December 31, 1920 11:13:00"),
        maxDate : new Date("December 31, 2000 11:13:00"),
        showWorkingDate : true,
        onSelect : function (e) {
            var sDate = new Date(e.date);
            Pages.pgProfile.scrollMainProfile.contUserInfo2.lblBirthDate.text = formattedDate(sDate);
            birthDate = sDate;
        },
        onCancel : function (e) {}
    });
}
function pgProfile_Self_OnKeyPress(e) {
    Social.Facebook.closeSession();
    if (e.keyCode == 4)
        Pages.pgLogin.show(SMF.UI.MotionEase.accelerating, SMF.UI.TransitionEffect.leftToRight, SMF.UI.TransitionEffectType.push, false, false);
}
function pgProfile_edtEmail1_OnReturnKey(e) {
    Pages.pgProfile.scrollMainProfile.contUserInfo2.edtPassword.focus();
}