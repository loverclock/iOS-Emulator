var addressNew; // to hold address which adding with mapView longTouch event
function pgMapView_mapAddress_OnLongTouch(e) {
    // to find address
    SMF.Map.lookupAddress(e.latitude, e.longitude,
        function (e) {
        addressNew = e.results[0].addressValue;
    },
        function (e) {
        alert("onError");
    });
    if (address == null) {
        address = "address not identify";
    }
    // adding pin to mapview
    Pages.pgMapView.mapAddress.addPin({
        id : "1",
        title : "Dropped Pin",
        subtitle : addressNew,
        latitude : e.latitude,
        longitude : e.longitude,
        selectedImage : "triangle_pointer.png",
        unSelectedImage : "triangle_pointer.png",
        draggable : true,
        animate : true
    });
    Pages.pgMapView.contAddress.lblMapAddress.text = addressNew;
    if (fromRegisterorProfile == 2) {
        Pages.pgRegister.scrollMainRegister.contUserInfo3.lblAddress.text = addressNew;
    } else if (fromRegisterorProfile == 1) {
        Pages.pgProfile.scrollMainProfile.contUserInfo3.lblAddress.text = addressNew;
    }
}
function showDlgFormMap() {
    Dialogs.dlgFormMap.show();
}
function pgMapView_Self_OnShow(e) {
    Pages.pgMapView.mapAddress.removePin("1");
    if (address == null) {
        address = "address not identify";
    }
    if (fromRegisterorProfile == 2) {
        Pages.pgMapView.mapAddress.addPin({
            id : "0",
            title : "Current Location",
            subtitle : address,
            latitude : Number(myCurrentLat),
            longitude : Number(myCurrentLon),
            selectedImage : "endway.png",
            unSelectedImage : "endway.png",
            draggable : false,
            animate : false
        });
        Pages.pgMapView.contAddress.lblMapAddress.text = address;
    } else if (fromRegisterorProfile == 1) {
        if (emailorFbLogin == 1) {
            Pages.pgMapView.mapAddress.addPin({
                id : "0",
                title : "Your Address",
                subtitle : fbResponseObject.Address,
                latitude : Number(latfromService),
                longitude : Number(lngfromService),
                selectedImage : "endway.png",
                unSelectedImage : "endway.png",
                draggable : false,
                animate : false
            });
            Pages.pgMapView.contAddress.lblMapAddress.text = fbResponseObject.Address;
        } else if (emailorFbLogin == 0) {
            Pages.pgMapView.mapAddress.addPin({
                id : "0",
                title : "Your Address",
                subtitle : responseObjectProfile.Address,
                latitude : Number(latfromService),
                longitude : Number(lngfromService),
                selectedImage : "endway.png",
                unSelectedImage : "endway.png",
                draggable : false,
                animate : false
            });
            Pages.pgMapView.contAddress.lblMapAddress.text = responseObjectProfile.Address;
        }
    }
    var title = "Map";
    if (Device.deviceOS == "Android") {}
    else {
        header.init(this, formHeader, formStatusbarColor, title);
        header.setLeftItem(pagesBack);
        header.setRightItem(showDlgFormMap);
    }
}
// to define user address with mapview pinSelected event
function pgMapView_mapAddress_OnPINSelected(e) {
    if (fromRegisterorProfile == 2) {
        if (e.id == 1) {
            Pages.pgMapView.contAddress.lblMapAddress.text = addressNew;
            Pages.pgRegister.scrollMainRegister.contUserInfo3.lblAddress.text = addressNew;
        } else {
            Pages.pgMapView.contAddress.lblMapAddress.text = address;
            Pages.pgRegister.scrollMainRegister.contUserInfo3.lblAddress.text = address;
        }
    } else
        if (fromRegisterorProfile == 1) {
            if (e.id == 1) {
                Pages.pgMapView.contAddress.lblMapAddress.text = addressNew;
                Pages.pgProfile.scrollMainProfile.contUserInfo3.lblAddress.text = addressNew;
            } else {
                Pages.pgMapView.contAddress.lblMapAddress.text = address;
                Pages.pgProfile.scrollMainProfile.contUserInfo3.lblAddress.text = responseObjectProfile.Address;
            }
        }
}
function pgMapView_Self_OnKeyPress(e) {
    if (e.keyCode == 4)
        Pages.back();
}