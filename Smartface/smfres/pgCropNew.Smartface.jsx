function pgCropNew_TextButton1_OnPressed(e) {
    cropImage(cropX1, cropY1, cropX2, cropY2);
}
function pgCropNew_Canvas1_OnDraw(e) {
    var paint = {
        type : 0, //plain
        strokeColor : "#ff0000",
        fillColor : null,
        width : 5,
    };
    this.drawLine({ // üst çizgi
        x1 : cnvsX1,
        y1 : cnvsY1,
        x2 : cnvsX2,
        y2 : cnvsY1,
        paint : paint
    });
    this.drawLine({ // sol çizgi
        x1 : cnvsX1,
        y1 : cnvsY1,
        x2 : cnvsX1,
        y2 : cnvsY2,
        paint : paint
    });
    this.drawLine({ // sağ çizgi
        x1 : cnvsX2,
        y1 : cnvsY1,
        x2 : cnvsX2,
        y2 : cnvsY2,
        paint : paint
    });
    this.drawLine({ // alt çizgi
        x1 : cnvsX1,
        y1 : cnvsY2,
        x2 : cnvsX2,
        y2 : cnvsY2,
        paint : paint
    });
    //sağ alt köşedeki kare
    Pages.pgCropNew.Rectangle1.left = cnvsX2;
    Pages.pgCropNew.Rectangle1.top = cnvsY2; // + diff;
    //sol üst köşedeki kare
    Pages.pgCropNew.Rectangle2.left = cnvsX1 - 30;
    Pages.pgCropNew.Rectangle2.top = cnvsY1 - 30; // + diff;
    //sağ üst köşedeki kare
    Pages.pgCropNew.Rectangle3.left = cnvsX2;
    Pages.pgCropNew.Rectangle3.top = cnvsY1 - 30; // + diff;
    //sol alt köşedeki kare
    Pages.pgCropNew.Rectangle4.left = cnvsX1 - 30;
    Pages.pgCropNew.Rectangle4.top = cnvsY2; // + diff;
    //üst kısım gölge alanı
    Pages.pgCropNew.RectangleA.height = cnvsY1; // + diff;
    //alt kısım gölge alanı
    Pages.pgCropNew.RectangleB.top = cnvsY2; // + diff;
    Pages.pgCropNew.RectangleB.height = Device.screenHeight - cnvsY2; //Pages.pgCropNew.Image1.height - cnvsY2;// + diff;
    //sol kısım gölge alanı
    Pages.pgCropNew.RectangleC.width = cnvsX1;
    Pages.pgCropNew.RectangleC.top = cnvsY1; // + diff;
    Pages.pgCropNew.RectangleC.height = Device.screenHeight - Pages.pgCropNew.RectangleB.height - cnvsY1; //Pages.pgCropNew.Image1.height - Pages.pgCropNew.RectangleB.height - cnvsY1;// + diff;
    //sağ kısım gölge alanı
    Pages.pgCropNew.RectangleD.left = cnvsX2;
    Pages.pgCropNew.RectangleD.top = cnvsY1; // + diff;
    Pages.pgCropNew.RectangleD.height = Device.screenHeight - Pages.pgCropNew.RectangleB.height - cnvsY1; //Pages.pgCropNew.Image1.height - Pages.pgCropNew.RectangleB.height - cnvsY1;// + diff;
}
function pgCropNew_Canvas1_OnTouchMove(e) {
    if ((e.y > (Pages.pgCropNew.Image1.top + diff / 2)) && (e.y < (Pages.pgCropNew.Image1.top + Pages.pgCropNew.Image1.height + diff / 2)) && (e.x > Pages.pgCropNew.Image1.left) && (e.x < (Pages.pgCropNew.Image1.left + Pages.pgCropNew.Image1.width))) {
        if (((e.x >= Pages.pgCropNew.Rectangle1.left - 30) && (e.x <= (Pages.pgCropNew.Rectangle1.left + 60))) && ((e.y >= Pages.pgCropNew.Rectangle1.top - 30) && (e.y <= (Pages.pgCropNew.Rectangle1.top + 60)))) {
            if ((cnvsX1 + 30) < (e.x) && (cnvsY1 + 30) < (e.y)) { // sınır kontrölü
                Pages.pgCropNew.Rectangle1.left = e.x;
                Pages.pgCropNew.Rectangle1.top = e.y - 30;
                cnvsX2 = e.x;
                cnvsY2 = e.y - 30;
                cropX2 = e.x - 30;
                cropY2 = e.y - 60;
            }
        } else if (((e.x >= Pages.pgCropNew.Rectangle2.left - 30) && (e.x <= (Pages.pgCropNew.Rectangle2.left + 60))) && ((e.y >= Pages.pgCropNew.Rectangle2.top - 30) && (e.y <= (Pages.pgCropNew.Rectangle2.top + 90)))) {
            if (cnvsX2 > e.x && (e.y) < cnvsY2) { // sınır kontrölü
                Pages.pgCropNew.Rectangle2.left = e.x - 30;
                Pages.pgCropNew.Rectangle2.top = e.y - 60;
                cnvsX1 = e.x;
                cnvsY1 = e.y - 30;
                cropX1 = e.x;
                cropY1 = e.y - 80;
            }
        } else if (((e.x >= Pages.pgCropNew.Rectangle3.left - 30) && (e.x <= (Pages.pgCropNew.Rectangle3.left + 60))) && ((e.y >= Pages.pgCropNew.Rectangle3.top - 30) && (e.y <= (Pages.pgCropNew.Rectangle3.top + 90)))) {
            if ((cnvsX1 + 30) < (e.x) && cnvsY2 > (e.y)) {
                Pages.pgCropNew.Rectangle3.left = e.x;
                Pages.pgCropNew.Rectangle3.top = e.y - 60;
                cnvsX2 = e.x;
                cnvsY1 = e.y - 30;
                cropX2 = e.x - 30;
                cropY1 = e.y - 80;
            }
        } else if (((e.x >= Pages.pgCropNew.Rectangle4.left - 30) && (e.x <= (Pages.pgCropNew.Rectangle4.left + 60))) && ((e.y >= Pages.pgCropNew.Rectangle4.top - 30) && (e.y <= (Pages.pgCropNew.Rectangle4.top + 60)))) {
            if (cnvsX2 > e.x && (cnvsY1 + 30) < e.y) {
                Pages.pgCropNew.Rectangle4.left = e.x - 30;
                Pages.pgCropNew.Rectangle4.top = e.y - 30;
                cnvsX1 = e.x;
                cnvsY2 = e.y - 30;
                cropX1 = e.x;
                cropY2 = e.y - 60;
            }
        }
    }
}
function pgCropNew_Self_OnShow(e) {
    var title = "Thumbnail";
    header.init(this, formHeader, formStatusbarColor, title);
    header.setLeftItem(loginBack);
    header.setRightItem(showdlgFormDashboard);
    if (Device.deviceOS == "Android") {}
    else {
        var barButton1 = new SMF.UI.iOS.BarButtonItem({
                title : "Crop",
                fontName : "Helvetica-Bold",
                fontSize : 16,
                onSelected : function (e) {
                    cropImage(cropX1, cropY1, cropX2, cropY2);
                }
            });
        Pages.pgCropNew.navigationItem.rightBarButtonItems = [barButton1];
        // header.setRightItem("retakenav.png", cropFunction);
    }
}
/*function cropFunction() {
cropImage(cropX1, cropY1, cropX2, cropY2);
}*/
function pgCropNew_Self_OnKeyPress(e){
}