function pgCanvas2_Self_OnKeyPress(e) {
    if (e.keyCode === 4) {
        Pages.back();
    }
}
function pgCanvas2_cnvsLineGraph1_OnDraw(e) {
    // ---------------------------------------------------
    // Drawing Graph - 1
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
        if (counter < 5) {
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
        if (actualRowNum == sizeX) {
            this.loopEnabled = false;
            this.loopPeriod = 5000;
            initializeStepSizeVal(actualRowNum - 1);
            drawLineGraphsMain1(this, lineGraphicsStepSize, actualRowNum);
        } else {
            drawLineGraphsMain1(this, lineGraphicsStepSize, typer);
            lineGraphicsStepSize = lineGraphicsStepSize - JumpVal1;
            //    alert("canvas: " + lineGraphicsStepSize);
            //    alert("canvas2");
            if (typer == actualRowNum && lineGraphicsStepSize < 2) {
                recordedStepSize1 = 0;
                setNewValues(actualRowNum);
                var InputArrTemp = getPointsArrayForCanvas(actualRowNum);
                for (var i = 0; i < InputArrTemp.length; i++)
                    RecordedArrays[actualRowNum][i] = InputArrTemp[i];
                actualRowNum = actualRowNum + 1;
                if (actualRowNum < sizeX) {
                    initializeStepSizeVal(actualRowNum);
                }
                typer = actualRowNum;
            }
        }
    }
}
function pgCanvas2_Self_OnShow(e) {
    // setting iOS NavigationBar
    var title = "Line Graph 1";
    if (Device.deviceOS == "Android") {}
    else {
        header.init(this, canvasHeader, canvasStatusBarColor, title);
        header.setLeftItem(pagesBack);
        header.setRightItem(showdlgCanvasLineInfo);
    }
    couldIDrawGraphics = checkValidationForGraphic(maxValueForCoordinateX, maxValueForCoordinateY, inputValuesX, inputValuesY);
    if (couldIDrawGraphics) {
        this.cnvsLineGraph1.loopPeriod = 10;
        this.cnvsLineGraph1.loopEnabled = true;
        StepsizeInC2 = 0;
        actualRowNum = 0;
        initializeStepSizeVal(actualRowNum);
        typer = 0;
        counter = 0;
        initializeLineGraphs(this.cnvsLineGraph1);
        calculateIndexPoints(this.cnvsLineGraph1);
        newDate = new Date().getTime();
    } else {
        this.cnvsLineGraph1.loopPeriod = 100000;
        this.cnvsLineGraph1.loopEnabled = false;
    }
}