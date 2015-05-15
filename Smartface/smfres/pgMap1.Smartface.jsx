/* Global Variables to use for Adding Pin Function */
var counter = 0;
var totalPin = 0;
var intervalIdforAll;
var intervalIdforType;
var counterPin = 0;
var counterforAll = 0;
var pinType;
var imgPath;
function pgMap1_Self_OnKeyPress(e) {
    if (e.keyCode === 4) {
        Pages.pgDashboard.show(SMF.UI.MotionEase.accelerating, SMF.UI.TransitionEffect.leftToRight, SMF.UI.TransitionEffectType.push, false, false);
    }
}
function showDlgMap(e) {
    Dialogs.dlgMap.show();
}
function pgMap1_Self_OnShow() {
    /* Navigation Bar Customizing */
    var title = "Map"
        if (Device.deviceOS == "Android") {}
        else {
            header.init(this, mapHeader, mapStatusbarColor, title);
            header.setLeftItem(homeBack);
            header.setRightItem(showDlgMap);
        }
        this.contFilter.btnFilter.height = this.contFilter.btnFilter.width / 2;
    this.contFilter.btnFilter.top = (this.contFilter.height - this.contFilter.btnFilter.height) / 2;
    this.contFilter.btnMapType.height = this.contFilter.btnMapType.width;
    this.contFilter.btnMapType.top = (this.contFilter.height - this.contFilter.btnMapType.height) / 2;
    this.map.removePin(Data.WebClient1_OutDSetpins.rowCount.toString());
    /* Running Web Client and Adding Pin Conditions */
    if (webclientSuccessed == false)
        SMF.Net.WebClient1.run();
    if (webclientSuccessed && rowAddedToPinDataset) {
        Data.WebClient1_OutDSetpins.seek(0);
        for (var i = 0; i < Data.WebClient1_OutDSetpins.rowCount; i++) {
            Pages.pgMap1.map.removePin(i.toString());
            Data.WebClient1_OutDSetpins.moveNext();
        }
        Data.WebClient1_OutDSetpins.seek(0);
        totalPin = 0;
        counterforAll = 0;
        Pages.pgMap1.contFilter.lblNumberOfResults.text = (Data.WebClient1_OutDSetpins.rowCount).toString();
        if (Pages.pgMap1.contFilterType.rectForBtnAll.visible == true) {
            addingAll();
        } else {
            counterPin = 0;
            addingAsFilter(pinType, imgPath);
        }
    }
}
/* BtnFilter OnPressed Function*/
function pgMap1_btnFilter_OnPressed(e) {
    /* If pressed before(opened) , we close it*/
    if (filterPressed) {
        filterPressed = false;
        Pages.pgMap1.contFilter.btnFilter.defaultImage = "resources://filter.png";
        var endYValue = Pages.pgMap1.contFilterType.top + Pages.pgMap1.contFilterType.height + 5;
        var endYValueStr = endYValue.toString();
        Pages.pgMap1.contFilterType.animate({
            property : 'Y',
            endValue : endYValueStr,
            motionEase : 0,
            duration : 100,
            onFinish : function () {
                Pages.pgMap1.contFilterType.visible = false;
            }
        });
    } else {
        /* If its closed , We open it */
        filterPressed = true;
        Pages.pgMap1.contFilter.btnFilter.defaultImage = "resources://filter2.png";
        Pages.pgMap1.contFilterType.top = Pages.pgMap1.contFilter.top;
        Pages.pgMap1.contFilterType.left = Pages.pgMap1.contFilter.left;
        Pages.pgMap1.contFilterType.visible = true;
        var endYValue = Pages.pgMap1.contFilterType.top - Pages.pgMap1.contFilterType.height - 5;
        var endYValueStr = endYValue.toString();
        Pages.pgMap1.contFilterType.animate({
            property : 'Y',
            endValue : endYValueStr,
            motionEase : 0,
            duration : 100,
            onFinish : function () {}
        });
    }
}
function pgMap1_contFilter_OnTouch(e) {
    touched = true;
    firstTouched = true;
}
function pgMap1_contFilter_OnTouchEnded(e) {
    touched = false;
}
/* Function to show all filter types Pins */
function pgMap1_imgBtnAll_OnPressed(e) {
    if (selectedFilterValue != 0) {
        switch (selectedFilterValue) {
        case 1:
            Pages.pgMap1.contFilterType.rectForBtnUcgen.visible = false;
            break;
        case 2:
            Pages.pgMap1.contFilterType.rectForBtnKare.visible = false;
            break;
        case 3:
            Pages.pgMap1.contFilterType.rectForBtnDaire.visible = false;
            break;
        default:
            break;
        }
        selectedFilterValue = 0;
        Pages.pgMap1.contFilterType.rectForBtnAll.visible = true;
        Data.WebClient1_OutDSetpins.seek(0);
        for (var i = 0; i < Data.WebClient1_OutDSetpins.rowCount; i++) {
            Pages.pgMap1.map.removePin(i.toString());
            Data.WebClient1_OutDSetpins.moveNext();
        }
        Data.WebClient1_OutDSetpins.seek(0);
        counterforAll = 0;
        addingAll();
        Pages.pgMap1.contFilter.lblNumberOfResults.text = (Data.WebClient1_OutDSetpins.rowCount).toString();
    }
    SES.Analytics.eventLog("Show all pin", '{\"function\":\"pgMap1_imgBtnAll_OnPressed\"}');
}
/* If Triangle type Selected */
function pgMap1_imgBtnUcgen_OnPressed(e) {
    if (selectedFilterValue != 1) {
        switch (selectedFilterValue) {
        case 0:
            Pages.pgMap1.contFilterType.rectForBtnAll.visible = false;
            break;
        case 2:
            Pages.pgMap1.contFilterType.rectForBtnKare.visible = false;
            break;
        case 3:
            Pages.pgMap1.contFilterType.rectForBtnDaire.visible = false;
            break;
        default:
            break;
        }
        selectedFilterValue = 1;
        Pages.pgMap1.contFilterType.rectForBtnUcgen.visible = true;
        Data.WebClient1_OutDSetpins.seek(0);
        for (var i = 0; i < Data.WebClient1_OutDSetpins.rowCount; i++) {
            Pages.pgMap1.map.removePin(i.toString());
            Data.WebClient1_OutDSetpins.moveNext();
        }
        Data.WebClient1_OutDSetpins.seek(0);
        counterforAll = 0;
        imgPath = "resources://triangle_pointer.png";
        counterPin = 0;
        pinType = 0;
        addingAsFilter(pinType, imgPath);
    }
    SES.Analytics.eventLog("Select triangle filter", '{\"function\":\"pgMap1_imgBtnUcgen_OnPressed\"}');
}
/* If Square Selected */
function pgMap1_imgBtnKare_OnPressed(e) {
    if (selectedFilterValue != 2) {
        switch (selectedFilterValue) {
        case 0:
            Pages.pgMap1.contFilterType.rectForBtnAll.visible = false;
            break;
        case 1:
            Pages.pgMap1.contFilterType.rectForBtnUcgen.visible = false;
            break;
        case 3:
            Pages.pgMap1.contFilterType.rectForBtnDaire.visible = false;
            break;
        default:
            break;
        }
        selectedFilterValue = 2;
        Pages.pgMap1.contFilterType.rectForBtnKare.visible = true;
        Data.WebClient1_OutDSetpins.seek(0);
        for (var i = 0; i < Data.WebClient1_OutDSetpins.rowCount; i++) {
            Pages.pgMap1.map.removePin(i.toString());
            Data.WebClient1_OutDSetpins.moveNext();
        }
        Data.WebClient1_OutDSetpins.seek(0);
        counterPin = 0;
        imgPath = "resources://square_pointer.png";
        counterforAll = 0;
        pinType = 1;
        addingAsFilter(pinType, imgPath);
    }
    SES.Analytics.eventLog("Select square filter", '{\"function\":\"pgMap1_imgBtnKare_OnPressed\"}');
}
/* If Circle selected */
function pgMap1_imgBtnDaire_OnPressed(e) {
    if (selectedFilterValue != 3) {
        switch (selectedFilterValue) {
        case 0:
            Pages.pgMap1.contFilterType.rectForBtnAll.visible = false;
            break;
        case 1:
            Pages.pgMap1.contFilterType.rectForBtnUcgen.visible = false;
            break;
        case 2:
            Pages.pgMap1.contFilterType.rectForBtnKare.visible = false;
            break;
        default:
            break;
        }
        selectedFilterValue = 3;
        Pages.pgMap1.contFilterType.rectForBtnDaire.visible = true;
        Data.WebClient1_OutDSetpins.seek(0);
        for (var i = 0; i < Data.WebClient1_OutDSetpins.rowCount; i++) {
            Pages.pgMap1.map.removePin(i.toString());
            Data.WebClient1_OutDSetpins.moveNext();
        }
        Data.WebClient1_OutDSetpins.seek(0);
        counterforAll = 0;
        counterPin = 0;
        imgPath = "resources://circle_pointer.png";
        pinType = 2;
        addingAsFilter(pinType, imgPath);
    }
    SES.Analytics.eventLog("Select circle filter", '{\"function\":\"pgMap1_imgBtnDaire_OnPressed\"}')
}
/* Map Type Changing Btn Pressed Function*/
function pgMap1_btnMapType_OnPressed(e) {
    if (typeOfMap == 0) {
        typeOfMap = 1;
        Pages.pgMap1.map.mapType = 1;
        Pages.pgMap1.contFilter.btnMapType.defaultImage = "resources://road.png";
    } else if (typeOfMap == 1) {
        typeOfMap = 0;
        Pages.pgMap1.map.mapType = 0;
        Pages.pgMap1.contFilter.btnMapType.defaultImage = "resources://world.png";
    }
    Data.WebClient1_OutDSetpins.seek(0);
    for (var i = 0; i < Data.WebClient1_OutDSetpins.rowCount; i++) {
        Pages.pgMap1.map.removePin(i.toString());
        Data.WebClient1_OutDSetpins.moveNext();
    }
    Data.WebClient1_OutDSetpins.seek(0);
    counterforAll = 0;
    if (Pages.pgMap1.contFilterType.rectForBtnAll.visible == true) {
        addingAll();
        Pages.pgMap1.contFilter.lblNumberOfResults.text = (Data.WebClient1_OutDSetpins.rowCount).toString();
    } else {
        counterPin = 0;
        addingAsFilter(pinType, imgPath);
    }
}
/* OnPinSelected Function*/
function pgMap1_map_OnPINSelected(e) {
    selectedPinId = e.id;
    if (Device.deviceOS == "Android") {
        header.init(Pages.pgMap2, mapHeader, mapStatusbarColor, "Map Details");
        header.setLeftItem(pagesBack);
    }
    Pages.pgMap2.show(SMF.UI.MotionEase.accelerating, SMF.UI.TransitionEffect.rightToLeft, SMF.UI.TransitionEffectType.push, false, false);
    SES.Analytics.eventLog("Show Map Detail", '{\"function\":\"pgMap1_Map_OnPINSelected\"}');
}
/* MapView onLongTouch Function to add new Pin manually */
function pgMap1_map_OnLongTouch(e) {
    var idForPin = Data.WebClient1_OutDSetpins.rowCount;
    lastLat = e.latitude;
    lastLon = e.longitude;
    SMF.Map.lookupAddress(e.latitude, e.longitude,
        function (e) {
        lastAddress = e.results[0].addressValue;
    },
        function (e) {});
    var imgPath;
    pinTypeToAdd = selectedFilterValue - 1;
    if (selectedFilterValue - 1 == 0)
        imgPath = "resources://triangle_pointer.png";
    else if (selectedFilterValue - 1 == 1)
        imgPath = "resources://square_pointer.png";
    else if (selectedFilterValue - 1 == 2)
        imgPath = "resources://circle_pointer.png";
    else if (selectedFilterValue == 0)
        imgPath = "resources://triangle_pointer.png";
    Pages.pgMap1.map.addPin({
        id : idForPin.toString(),
        title : "Dropped Pin",
        subtitle : lastAddress,
        latitude : e.latitude,
        longitude : e.longitude,
        selectedImage : imgPath,
        unSelectedImage : imgPath,
        draggable : true,
        animate : true
    });
    pinAdded = true;
}
// Function to show all filter types Pins by a Timer
function addingAll() {
    if (counterforAll < Data.WebClient1_OutDSetpins.rowCount) {
        var imgPath2;
        intervalIdforAll = setTimeout(function () {
                if (Data.WebClient1_OutDSetpins.type == 0)
                    imgPath2 = "resources://triangle_pointer.png";
                else if (Data.WebClient1_OutDSetpins.type == 1)
                    imgPath2 = "resources://square_pointer.png";
                else
                    imgPath2 = "resources://circle_pointer.png";
                Pages.pgMap1.map.addPin({
                    id : counterforAll.toString(),
                    title : Data.WebClient1_OutDSetpins.title,
                    subtitle : Data.WebClient1_OutDSetpins.subtitle,
                    latitude : parseFloat(Data.WebClient1_OutDSetpins.latitude),
                    longitude : parseFloat(Data.WebClient1_OutDSetpins.longitude),
                    selectedImage : imgPath2,
                    unSelectedImage : imgPath2,
                    draggable : false,
                    animate : true
                });
                Data.WebClient1_OutDSetpins.moveNext();
                counterforAll++;
                addingAll();
            },
                20);
    } else {
        clearTimeout(intervalIdforAll);
    }
}
// Function to show selected filter types Pins by a Timer
function addingAsFilter(pinType, imgPath) {
    if (counterforAll < Data.WebClient1_OutDSetpins.rowCount) {
        intervalIdforType = setTimeout(function () {
                if (Data.WebClient1_OutDSetpins.type == pinType) {
                    Pages.pgMap1.map.addPin({
                        id : counterforAll.toString(),
                        title : Data.WebClient1_OutDSetpins.title,
                        subtitle : Data.WebClient1_OutDSetpins.subtitle,
                        latitude : parseFloat(Data.WebClient1_OutDSetpins.latitude),
                        longitude : parseFloat(Data.WebClient1_OutDSetpins.longitude),
                        selectedImage : imgPath,
                        unSelectedImage : imgPath,
                        draggable : false,
                        animate : true
                    });
                    Data.WebClient1_OutDSetpins.moveNext();
                    counterPin++;
                } else {
                    Data.WebClient1_OutDSetpins.moveNext();
                }
                counterforAll++;
                addingAsFilter(pinType, imgPath);
            }, 40);
    } else {
        clearTimeout(intervalIdforType);
    }
    if (counterforAll < Data.WebClient1_OutDSetpins.rowCount) {}
    else {
        Pages.pgMap1.contFilter.lblNumberOfResults.text = counterPin.toString();
    }
}