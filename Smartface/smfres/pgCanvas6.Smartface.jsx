function pgCanvas6_Self_OnKeyPress(e) {
    if (e.keyCode === 4) {
        Pages.back();
    }
}
var canvasBarThree;
var shiftLeft = Device.screenWidth * 0.038; // it is default value for shift bar texts to left
function pgCanvas6_Self_OnShow() {
    // setting iOS NavigationBar
    var title = "Bar Graph";
    if (Device.deviceOS == "Android") {}
    else {
        header.init(this, canvasHeader, canvasStatusBarColor, title);
        header.setLeftItem(pagesBack);
        header.setRightItem(showdlgCanvasLineInfo);
    }
    Pages.pgCanvas6.btnStart.visible = false;
    // countdown animator data
    var barProperties = {
        data : [
            ["America", {
                    color : "#004449",
                    value : 200
                }, {
                    color : "#00656d",
                    value : 100
                }
            ],
            ["Europe", {
                    color : "#004449",
                    value : 150
                }, {
                    color : "#00656d",
                    value : 150
                }, {
                    color : "#008592",
                    value : 50
                }
            ],
            ["Asia", {
                    color : "#00656d",
                    value : 300
                }
            ],
        ],
        vertical : false,
        barWidth : Device.screenWidth / 9,
        barGap : Device.screenWidth / 15,
        coordinateColor : "#666666" // "#373737"
    };
    if (controlAddingCanvas == null) {
        canvasBarThree = new SMF.UI.Canvas({
                height : "50.12%",
                width : "80%",
                left : "10%",
                top : "20.42%"
            });
        controlAddingCanvas = "added Canvas";
    }
    canvasBarThree.onDraw = function (e) {
        if (this.expandingChartData === undefined) {
            return;
        }
        // Drawing BackGround
        var strokeColorIn = "#333333";
        var fillColorIn = "#333333";
        var typeofit = 0;
        if (Device.deviceOS == "Android") {
            sizeofIt = 5;
        } else {
            sizeofIt = 1;
        }
        //  var sizeofIt = 5;
        drawBackGroundOfCanvas(this, typeofit, strokeColorIn, fillColorIn, sizeofIt);
        // draw rects
        for (var i = 0; i < this.expandingChartData.data.length; ++i) {
            if (i != 0 && this.expandingChartData.data[i - 1].finished === undefined)
                continue;
            if (this.expandingChartData.data[i][0] != "America" && this.expandingChartData.data[i][0] != "Asia") {
                var currentValue = 0;
                for (var j = 1; j < this.expandingChartData.data[i].length; ++j) {
                    var firstValue = currentValue,
                    secondValue;
                    secondValue = this.expandingChartData.data[i][j].tunedValue + currentValue;
                    currentValue += this.expandingChartData.data[i][j].tunedValue;
                    var targetX = (this.animateStep >= secondValue) ? secondValue : firstValue;
                    if (this.expandingChartData.data[i][j].finished)
                        targetX = secondValue;
                    if (j == 1 || this.expandingChartData.data[i][j - 1].finished == true) {
                        this.drawRect({
                            x1 : 1 + firstValue,
                            y1 : (i * this.expandingChartData.barWidth) + ((i + 1) * this.expandingChartData.barGap),
                            x2 : 1 + targetX,
                            y2 : ((i + 1) * (this.expandingChartData.barGap + this.expandingChartData.barWidth)),
                            paint : {
                                type : 0,
                                fillColor : this.expandingChartData.data[i][j].color,
                            }
                        });
                        if (this.animateStep >= secondValue || this.expandingChartData.data[i][j].finished) {
                            this.expandingChartData.data[i][j].finished = true;
                            this.drawText({
                                text : parseInt(this.expandingChartData.data[i][j].value) + "",
                                x : secondValue - shiftLeft,
                                y : 1 + (i * this.expandingChartData.barWidth) + ((i + 1) * this.expandingChartData.barGap) - 15,
                                paint : {
                                    type : 0,
                                    textSize : "12dp",
                                    font : "Arial",
                                    strokeColor : "#adadad"
                                }
                            });
                        }
                    }
                }
            } else {
                var currentValue = 0;
                for (var j = 1; j < this.expandingChartData.data[i].length; ++j) {
                    var firstValue = currentValue,
                    secondValue;
                    secondValue = this.expandingChartData.data[i][j].tunedValue + currentValue;
                    currentValue += this.expandingChartData.data[i][j].tunedValue;
                    var targetX = (this.animateStep > secondValue) ? secondValue : this.animateStep;
                    if (this.expandingChartData.data[i][j].finished)
                        targetX = secondValue;
                    if (j == 1 || this.expandingChartData.data[i][j - 1].finished == true) {
                        this.drawRect({
                            x1 : 1 + firstValue,
                            y1 : (i * this.expandingChartData.barWidth) + ((i + 1) * this.expandingChartData.barGap),
                            x2 : 1 + targetX,
                            y2 : ((i + 1) * (this.expandingChartData.barGap + this.expandingChartData.barWidth)),
                            paint : {
                                type : 0,
                                fillColor : this.expandingChartData.data[i][j].color,
                            }
                        });
                        if (this.animateStep > secondValue || this.expandingChartData.data[i][j].finished) {
                            this.expandingChartData.data[i][j].finished = true;
                            this.drawText({
                                text : parseInt(this.expandingChartData.data[i][j].value) + "",
                                x : secondValue - shiftLeft,
                                y : 1 + (i * this.expandingChartData.barWidth) + ((i + 1) * this.expandingChartData.barGap) - 15,
                                paint : {
                                    type : 0,
                                    textSize : "12dp",
                                    font : "Arial",
                                    strokeColor : "#adadad"
                                }
                            });
                        }
                    }
                }
            }
            if (this.animateStep >= this.expandingChartData.data[i].maxValue && this.expandingChartData.data[i].finished == undefined) {
                this.expandingChartData.data[i].finished = true;
                this.animateStep = 0;
            }
            if (this.expandingChartData.data[i].finished) {
                this.drawText({
                    text : this.expandingChartData.data[i][0],
                    x : 10,
                    y : 1 + (i * this.expandingChartData.barWidth) + ((i + 1) * this.expandingChartData.barGap) - 15,
                    paint : {
                        type : 0,
                        textSize : "12dp",
                        font : "HelveticaNeue-Italic",
                        strokeColor : "#adadad"
                    }
                });
            }
        }
        // draw coordinate
        this.drawLine({
            x1 : 2,
            y1 : 0,
            x2 : 2,
            y2 : (this.expandingChartData.data.length * this.expandingChartData.barWidth) +
            ((this.expandingChartData.data.length + 1) * this.expandingChartData.barGap),
            paint : {
                type : 0,
                strokeColor : "#484848",
                width : 2
            }
        });
        this.drawLine({
            x1 : 2,
            y1 : (this.expandingChartData.data.length * this.expandingChartData.barWidth) +
            ((this.expandingChartData.data.length + 1) * this.expandingChartData.barGap) - 2,
            x2 : this.maxAnimatePoint,
            y2 : (this.expandingChartData.data.length * this.expandingChartData.barWidth) +
            ((this.expandingChartData.data.length + 1) * this.expandingChartData.barGap) - 2,
            paint : {
                type : 0,
                strokeColor : "#484848",
                width : 2
            }
        });
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
        this.animateStep += 6;
    }
    Pages.pgCanvas6.add(canvasBarThree);
    // start animating with function and finish callback
    startAnimatingCanvas3(canvasBarThree, barProperties, 1, function (e) {});
}
function startAnimatingCanvas3(canvas, chartData, seconds, onFinished) {
    var maxValue = 0;
    var valueCoef = 0;
    for (var i = 0; i < chartData.data.length; ++i) {
        var sum = 0;
        for (var j = 1; j < chartData.data[i].length; ++j) {
            sum += chartData.data[i][j].value;
        }
        chartData.data[i].maxValue = sum;
        if (sum > maxValue) {
            maxValue = sum;
            valueCoef = canvas.width / maxValue;
        }
    }
    for (var i = 0; i < chartData.data.length; ++i) {
        for (var j = 1; j < chartData.data[i].length; ++j) {
            chartData.data[i][j].tunedValue = valueCoef * chartData.data[i][j].value;
        }
        chartData.data[i].maxValue = chartData.data[i].maxValue * valueCoef;
    }
    canvas.expandingChartData = chartData;
    canvas.loopPeriod = (4 * seconds * 1000) / (maxValue * valueCoef);
    canvas.loopEnabled = true;
    canvas.onCountDownFinished = onFinished;
    canvas.animateStep = 0;
    canvas.maxAnimatePoint = maxValue * valueCoef;
}
function pgCanvas6_Canvas1_OnShow(e) {}
function pgCanvas6_Canvas1_OnDraw(e) {}