function pgCanvas5_Self_OnKeyPress(e) {
    if (e.keyCode === 4) {
        Pages.back();
    }
}
function pgCanvas5_Self_OnShow() {
    // setting iOS NavigationBar
    var title = "Bar Graph";
    header.init(this, canvasHeader, canvasStatusBarColor, title);
    header.setLeftItem(pagesBack);
    header.setRightItem(showdlgCanvasLineInfo);
    Pages.pgCanvas5.btnStart.text = "go";
    pgCanvas5_btnStart_OnPressed();
}
function pgCanvas5_btnStart_OnPressed(e) {
    Pages.pgCanvas5.btnStart.text = "";
    Pages.pgCanvas5.btnStart.fillColor = "#333333";
    Pages.pgCanvas5.btnStart.fontColor = "white";
    // countdown animator data
    var barProperties = {
        data : [{
                color : "#EDB910",
                value : 100
            }, {
                color : "#DF352F",
                value : 40
            }, {
                color : "#2B84D3",
                value : 60
            }
        ],
        vertical : true,
        barWidth : Device.screenWidth / 6,
        barGap : 10,
        coordinateColor : "#373737"
    };
    // start animating with function and finish callback
    startAnimatingCanvas2(Pages.pgCanvas5.cnvsBarGraph, barProperties, function (e) {
        Pages.pgCanvas5.btnStart.text = "start again";
        Pages.pgCanvas5.btnStart.fillColor = "#E84C3D";
        Pages.pgCanvas5.btnStart.fontColor = "000000";
    });
}
function startAnimatingCanvas2(canvas, chartData, onFinished) {
    var maxValue = 0;
    var valueCoef = 0;
    for (var i = 0; i < chartData.data.length; ++i) {
        if (chartData.data[i].value > maxValue) {
            maxValue = chartData.data[i].value;
            valueCoef = ((chartData.vertical ? canvas.height : canvas.width) * 0.8) / maxValue;
        }
    }
    for (var i = 0; i < chartData.data.length; ++i) {
        chartData.data[i].tunedValue = valueCoef * chartData.data[i].value;
    }
    canvas.expandingChartData = chartData;
    canvas.loopPeriod = 50;
    canvas.loopEnabled = true;
    canvas.onCountDownFinished = onFinished;
    canvas.animateStep = 0;
    canvas.maxAnimatePoint = maxValue * valueCoef;
}
function pgCanvas5_cnvsBarGraph_OnShow(e) {}
function pgCanvas5_cnvsBarGraph_OnDraw(e) {
    if (this.expandingChartData === undefined) {
        return;
    }
    // Drawing BackGround
    var strokeColorIn = "#333333";
    var fillColorIn = "#333333";
    var typeofit = 0;
    var sizeofIt = 5;
    drawBackGroundOfCanvas(this, typeofit, strokeColorIn, fillColorIn, sizeofIt);
    var margin = (this.width - ((this.expandingChartData.data.length * this.expandingChartData.barWidth) +
            ((this.expandingChartData.data.length + 1) * this.expandingChartData.barGap))) / 2;
    // draw rects
    if (this.expandingChartData.vertical) {
        for (var i = 0; i < this.expandingChartData.data.length; ++i) {
            var value = this.expandingChartData.data[i].tunedValue;
            this.drawRect({
                x1 : margin + (i * this.expandingChartData.barWidth) + ((i + 1) * this.expandingChartData.barGap),
                y1 : this.height - 1,
                x2 : margin + ((i + 1) * (this.expandingChartData.barWidth + this.expandingChartData.barGap)),
                y2 : this.height - (((this.animateStep > value) ? value : this.animateStep)),
                paint : {
                    type : 0,
                    fillColor : this.expandingChartData.data[i].color,
                }
            });
        }
    } else {
        for (var i = 0; i < this.expandingChartData.data.length; ++i) {
            var value = this.expandingChartData.data[i].tunedValue;
            this.drawRect({
                x1 : 0,
                y1 : (i * this.expandingChartData.barWidth) + ((i + 1) * this.expandingChartData.barGap),
                x2 : (this.animateStep > value) ? value : this.animateStep,
                y2 : ((i + 1) * (this.expandingChartData.barGap + this.expandingChartData.barWidth)),
                paint : {
                    type : 0,
                    fillColor : this.expandingChartData.data[i].color,
                }
            });
        }
    }
    // will stop
    if (this.animateStep >= this.maxAnimatePoint) {
        this.loopEnabled = false;
    }
    // stopped
    if (!this.loopEnabled) {
        this.animateStep = undefined;
        this.maxAnimatePoint = undefined;
        this.expandingChartData = undefined;
        this.onCountDownFinished();
        return;
    }
    this.animateStep += (Device.screenHeight / 200);
}