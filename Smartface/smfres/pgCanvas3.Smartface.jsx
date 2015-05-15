function pgCanvas3_Self_OnKeyPress(e) {
    if (e.keyCode === 4) {
        Pages.back();
    };
}
function pgCanvas3_Self_OnShow() {
    // setting iOS NavigationBar
    var title = "Line Graph 2";
    if (Device.deviceOS == "Android") {}
    else {
        header.init(this, canvasHeader, canvasStatusBarColor, title);
        header.setLeftItem(pagesBack);
        header.setRightItem(showdlgCanvasLineInfo);
    }
    couldIDrawGraphics = checkValidationForGraphic(maxValueForCoordinateX, maxValueForCoordinateY, inputValuesX, inputValuesY);
    if (couldIDrawGraphics) {
        this.cnvsLineGraph2.loopPeriod = 100;
        this.cnvsLineGraph2.loopEnabled = true;
        StepsizeInC2 = 0;
        actualRowNum = 0;
        initializeLineGraphs(this.cnvsLineGraph2);
        calculateIndexPoints(this.cnvsLineGraph2);
        initializeStepSizeVal(actualRowNum);
        typer = 0;
        counter = 0;
        RecordedArrays = [];
    } else {
        this.cnvsLineGraph2.loopPeriod = 100000;
        this.cnvsLineGraph2.loopEnabled = false;
    }
}
function pgCanvas3_cnvsLineGraph2_OnDraw(e) {
    // ---------------------------------------------------
    // Drawing Graph - 2
    // steps :
    // 1) calculating the speed of the device
    // 2) deciding on the loop value in time
    // 3) starting to draw
    // 4) recording the drawn graphics (with effect purposes)
    // 5) creating a stoping criteria
    // 6) last time drawing and stoping
    // ---------------------------------------------------
    if (couldIDrawGraphics) {
        counter = counter + 1;
        if (counter <= 5) {
            var diffTime = chechLoopSpeedOfDevice(newDate);
            MeanTime = (((counter - 1) * MeanTime + diffTime) / counter);
        } else if (counter > 5 && counter < 7) {
            if (MeanTime < 50) {
                this.loopPeriod = 50;
                JumpVal1 = 10;
            } else if (counter >= 50 && counter < 100) {
                this.loopPeriod = 70;
                JumpVal1 = 15;
            } else if (counter >= 100 && counter < 150) {
                this.loopPeriod = 120;
                JumpVal1 = 20;
            } else if (counter >= 150 && counter < 200) {
                this.loopPeriod = 170;
                JumpVal1 = 25;
            } else if (counter >= 200) {
                this.loopPeriod = 50;
                JumpVal1 = 30;
            }
        }
        if (Device.deviceOS != "iOS") {
            if (actualRowNum == sizeX) {
                this.loopPeriod = 5000;
                this.loopEnabled = false;
                counter = 0;
                initializeStepSizeVal(actualRowNum - 1);
                StepsizeInC2 = sizeOfCircle4Effect + 1 + JumpVal;
                drawLineGraphsMain2(this, StepsizeInC2, actualRowNum);
            } else {
                drawLineGraphsMain2(this, StepsizeInC2, actualRowNum);
                StepsizeInC2 = StepsizeInC2 + JumpVal;
                if (StepsizeInC2 >= sizeOfCircle4Effect + JumpVal) {
                    StepsizeInC2 = 0;
                    numOfPointsDrawn = numOfPointsDrawn + 1;
                }
                if (numOfPointsDrawn == sizeY) {
                    counter = 0;
                    numOfPointsDrawn = 0;
                    StepsizeInC2 = 0;
                    var InputArrTemp = getPointsArrayForCanvas(actualRowNum);
                    for (var i = 2; i < InputArrTemp.length - 2; i++)
                        RecordedArrays2[actualRowNum][i - 2] = InputArrTemp[i];
                    actualRowNum = actualRowNum + 1;
                    if (actualRowNum < sizeX) {
                        initializeStepSizeVal(actualRowNum);
                    }
                    indexHolder = 0;
                }
            }
        } else {
            drawLineGraphsMain2(this, StepsizeInC2, actualRowNum);
            StepsizeInC2 = StepsizeInC2 + JumpVal;
            if (StepsizeInC2 >= sizeOfCircle4Effect + JumpVal) {
                StepsizeInC2 = 0;
                numOfPointsDrawn = numOfPointsDrawn + 1;
            }
            if (numOfPointsDrawn == sizeY) {
                counter = 0;
                numOfPointsDrawn = 0;
                StepsizeInC2 = 0;
                var InputArrTemp = getPointsArrayForCanvas(actualRowNum);
                for (var i = 2; i < InputArrTemp.length - 2; i++)
                    RecordedArrays2[actualRowNum][i - 2] = InputArrTemp[i] - 1;
                actualRowNum = actualRowNum + 1;
                if (actualRowNum < sizeX) {
                    initializeStepSizeVal(actualRowNum);
                }
                indexHolder = 0;
            }
            if (actualRowNum == 1) {
                this.loopEnabled = false;
            }
        }
    }
};