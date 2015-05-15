function openCameraAndResize() {
    var format = SMF.ImageFormat.PNG;
    var compRate = 0.5;
    var imWidth;
    var imHeight;
    SMF.Multimedia.startCamera(0, 0, 1,
        function () {},
        function (e) {
        var im = new SMF.Image({
                imageUri : e.photoUri,
                onSuccess : function (e) {
                    imWidth = im.width;
                    imHeight = im.height;
                    var pageImageWitdh = Device.screenWidth;
                    var resizedHeight = (imHeight / imWidth) * pageImageWitdh;
                    var resizedHeightRounded = Math.floor(resizedHeight);
                    Pages.pgCrop.Image1.height = resizedHeightRounded;
                    im.resize({
                        width : pageImageWitdh,
                        height : resizedHeightRounded,
                        format : format,
                        compressionRate : compRate,
                        onSuccess : function (e) {
                            Data.DS_Image.clear();
                            Data.DS_Image.add();
                            Data.DS_Image.data = e.image;
                            Data.DS_Image.commit();
                            Data.DS_Image.refresh();
                            Data.notify("Data.DS_Image");
                            Pages.pgCrop.Image1.image = e.image;
                            Pages.pgCrop.show();
                        },
                        onError : function (e) {
                            alert("Error: " + e.message);
                        }
                    });
                },
                onError : function (e) {
                    alert("Error: " + e.message);
                }
            });
    },
        function () {},
        function () {});
}
function resize(imageFile) {
    var format = SMF.ImageFormat.PNG;
    var compRate = 0.5;
    var imWidth;
    var imHeight;
    var im = new SMF.Image({
            imageUri : imageFile,
            onSuccess : function (e) {
                imWidth = im.width;
                imHeight = im.height;
                var pageImageWitdh = Device.screenWidth;
                var resizedHeight = (imHeight / imWidth) * pageImageWitdh;
                var resizedHeightRounded = Math.floor(resizedHeight);
                Pages.pgCrop.Image1.height = resizedHeightRounded;
                im.resize({
                    width : pageImageWitdh,
                    height : resizedHeightRounded,
                    format : format,
                    compressionRate : compRate,
                    onSuccess : function (e) {
                        Data.DS_Image.clear();
                        Data.DS_Image.add();
                        Data.DS_Image.data = e.image;
                        Data.DS_Image.commit();
                        Data.DS_Image.refresh();
                        Data.notify("Data.DS_Image");
                        Pages.pgCrop.Image1.image = e.image;
                        Pages.pgCrop.show();
                    },
                    onError : function (e) {
                        alert("Error: " + e.message);
                    }
                });
            },
            onError : function (e) {
                alert("Error: " + e.message);
            }
        });
}
function cropImage(cx1, cx2, cy1, cy2) {
    var myImageUri = Data.DS_Image.data;
    var format = SMF.ImageFormat;
    var compRate = 0.5;
    var im = new SMF.Image({
            imageUri : myImageUri,
            onSuccess : function (e) {
                im.crop({
                    x1 : cx1,
                    y1 : cx2,
                    x2 : cy1,
                    y2 : cy2,
                    format : format,
                    compressionRate : compRate,
                    onSuccess : function (e) {
                        var img2 = e.image;
                        if (imgCropSelect == 0) {
                            Pages.pgRegister.ScrollView1.Container1.cntProfile.imgProfile.image = e.image;                           
                            Pages.pgRegister.show();
                        } else {
                            Pages.pgProfile.ScrollView1.Container1.cntProfile.imgProfile.image = e.image;
                            Pages.pgProfile.show();
                        }
                        if (Device.deviceOS == "Android")
                            imageFile = new SMF.IO.File(img2);
                        else
                            imageFile = new SMF.IO.File(SMF.IO.applicationDataDirectory, img2);
                    },
                    onError : function (e) {
                        alert("Error: " + e.message);
                    }
                });
            },
            onError : function (e) {
                alert("Error: " + e.message);
            }
        });
}