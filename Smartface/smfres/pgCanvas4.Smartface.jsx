function pgCanvas4_Self_OnKeyPress(e) {
    if (e.keyCode === 4) {
        Pages.back();
    }
}
function showDlgCounterInfo() {
    Dialogs.dlgCanvasCounterInfo.show();
}
function pgCanvas4_Self_OnShow() {
    var title = "Counter";
    if (Device.deviceOS == "Android") {}
    else {
        header.init(this, canvasHeader, canvasStatusBarColor, title);
        header.setLeftItem(pagesBack);
        header.setRightItem(showDlgCounterInfo);
    }
    pgCanvas4_btnStart_OnPressed();
}
function pgCanvas4_btnStart_OnPressed(e) {
    Pages.pgCanvas4.btnStart.text = "counting...";
    Pages.pgCanvas4.btnStart.fillColor = "#333333";
    Pages.pgCanvas4.btnStart.fontColor = "white";
    Pages.pgCanvas4.btnStart.touchEnabled = false;
    // countdown animator data
    var data = {
        "activeColor" : "#555555",
        "passiveColor" : "#008592",
        "strokeWidth" : Device.screenWidth / 12,
        "startAngle" : 90, // CCW
        "period" : 9, // seconds
        "countDownFont" : "Helvetica",
        "countDownFontColor" : "#008592"
    };
    // prepare final image
    data.finalImage = new SMF.Image({
            imageUri : "lock.png",
        });
    // start animating with function and finish callback
    startAnimatingCanvas(Pages.pgCanvas4.cnvsCounter, data, function (e) {
        Pages.pgCanvas4.btnStart.text = "start again";
        Pages.pgCanvas4.btnStart.fillColor = "#E84C3D";
        Pages.pgCanvas4.btnStart.fontColor = "#000000";
        Pages.pgCanvas4.btnStart.touchEnabled = true;
    });
}
function startAnimatingCanvas(canvas, arcData, onFinished) {
    canvas.waitingArcData = arcData;
    arcData.textSeconds = arcData.period;
    canvas.loopPeriod = arcData.period * 1000 / 360;
    canvas.loopEnabled = true;
    canvas.onCountDownFinished = onFinished;
}
function pgCanvas4_cnvsCounter_OnShow(e) {}
function pgCanvas4_cnvsCounter_OnDraw(e) {
    if (this.waitingArcData === undefined) {
        return;
    }
    // Drawing BackGround
    var strokeColorIn = "#333333";
    var fillColorIn = "#333333";
    var typeofit = 0;
    var sizeofIt = 5;
    drawBackGroundOfCanvas(this, typeofit, strokeColorIn, fillColorIn, sizeofIt);
    // determine animating angle constant
    if (this.waitingArcData.nextAngle === undefined) {
        this.waitingArcData.nextAngle = this.waitingArcData.startAngle - 1;
    }
    // will stop
    if (this.waitingArcData.startAngle == this.waitingArcData.nextAngle + 360) {
        this.loopEnabled = false;
    }
    // draw arcs
    var width = this.waitingArcData.strokeWidth / 2;
    var reference = this.width;
    if (reference > this.height) {
        reference = this.height;
    }
    var diff = width;
    this.drawArc({
        x1 : diff,
        y1 : diff,
        x2 : reference - diff,
        y2 : reference - diff,
        startAngle : this.waitingArcData.startAngle,
        endAngle : this.waitingArcData.nextAngle,
        useCenterLines : false,
        paint : {
            type : 0,
            width : this.waitingArcData.strokeWidth,
            strokeColor : this.waitingArcData.activeColor
        }
    });
    this.drawArc({
        x1 : diff,
        y1 : diff,
        x2 : reference - diff,
        y2 : reference - diff,
        startAngle : this.waitingArcData.nextAngle,
        endAngle : this.waitingArcData.startAngle,
        useCenterLines : false,
        paint : {
            type : 0,
            width : this.waitingArcData.strokeWidth,
            strokeColor : this.waitingArcData.passiveColor
        }
    });
    // calculate text seconds
    var unitArc = 360 / this.waitingArcData.period;
    var currentDiff = this.waitingArcData.startAngle - this.waitingArcData.nextAngle;
    if (currentDiff % unitArc == 0) {
        this.waitingArcData.textSeconds--
    }
    // stopped
    if (this.waitingArcData.textSeconds == 0) {
        this.drawImage({
            image : this.waitingArcData.finalImage.imageUri,
            destRect : [(reference - this.waitingArcData.finalImage.width) / 2 - diff / 2 + 5, (reference - this.waitingArcData.finalImage.height) / 2 - diff,
                this.waitingArcData.finalImage.width + (reference - this.waitingArcData.finalImage.width) / 2 + 5,
                this.waitingArcData.finalImage.height + (reference - this.waitingArcData.finalImage.height) / 2]
            /* destRect : [(reference) - diff, (reference - this.waitingArcData.finalImage.height) / 2 - diff,
            this.waitingArcData.finalImage.width + (reference - this.waitingArcData.finalImage.width) / 2,
            this.waitingArcData.finalImage.height + (reference - this.waitingArcData.finalImage.height) / 2]*/
        });
        this.waitingArcData = undefined;
        this.onCountDownFinished();
        return;
    }
    // draw text seconds
    var yTextPos = reference / 2 + 20;
    if (Device.deviceOS == "iOS")
        yTextPos = yTextPos - 40;
    var text = this.waitingArcData.textSeconds + "";
    var textLength = text.length / 2;
    var xOfText = Device.screenHeight * 0.004; // default value for design of text seconds
    var yOfText = 0;
    if (Device.deviceOS == "Android")
        yOfText = Device.screenHeight * 0.013;
    this.drawText({
        text : this.waitingArcData.textSeconds + "",
        x : reference / 2 - diff + xOfText,
        y : yTextPos + yOfText,
        paint : {
            textSize : "40dp",
            font : this.waitingArcData.countDownFont,
            strokeColor : this.waitingArcData.countDownFontColor
        }
    });
    this.waitingArcData.nextAngle--;
}