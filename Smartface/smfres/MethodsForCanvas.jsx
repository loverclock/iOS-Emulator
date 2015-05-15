// -----------------------------------------------------------------------------------------//
// ---------------- Validation of the input data values for X-Y axes. ----------------------//
// -----------------------------------------------------------------------------------------//
function checkValidationForGraphic(maxValueForCoordinateX, maxValueForCoordinateY, Dx, Dy) {

    var sizeXX = Dx.length; // 3
    var sizeXY = Dx[0].length; // 9
    var sizeYX = Dy.length; // 3
    var sizeYY = Dy[0].length; // 9

    // max-min limit test for x axes
    for (var i = 0; i < sizeXX; i++) {
        for (var j = 0; j < sizeXY; j++) {
            if (Dx[i][j] > maxValueForCoordinateX || Dx[i][j] < minValueForCoordinateX) {
                alert("Input data values for graph is not valid. Compare data with max and min values.");
                return false;
            }
        }
    }
    // max-min limit test for y axes
    for (var i = 0; i < sizeYX; i++) {
        for (var j = 0; j < sizeYY; j++) {
            if (Dy[i][j] > maxValueForCoordinateY || Dy[i][j] < minValueForCoordinateY) {
                alert("Input data values for graph is not valid. Compare data with max and min values.");
                return false;
            }
        }
    }
    // ascending order test on x-axes
    for (i = 0; i < sizeXX; i++) {
        for (var j = 1; j < sizeXY; j++) {
            if (Dx[i][j - 1] >= Dx[i][j]) {
                alert("Input data values for graph is not valid. Values for x-coordinate is not in correct order");
                return false;
            }
        }
    }

    return true;
}

// -----------------------------------------------------------------------------------------//
// ---------------- Having real x, y points on canvas according to the input values --------//
// -----------------------------------------------------------------------------------------//
function getXYPointsOnCanVas(Values4XesIn, Values4YesIn, ActualXvals, ActualYvals) {
    for (var i = 0; i < Values4XesIn.length; i++) {
        ActualXvals[i] = startingX + Math.round(widthOfXY * (Values4XesIn[i] / (maxValueForCoordinateX - minValueForCoordinateX)));
    }

    for (var i = 0; i < Values4YesIn.length; i++) {
        ActualYvals[i] = stopPointY + Math.round(heightOfXY - heightOfXY * (Values4YesIn[i] / (maxValueForCoordinateY - minValueForCoordinateY)));
    }
}

// -----------------------------------------------------------------------------------------//
// ---------------- Setting new values for the row of the input datas on x-y axes ----------//
// -----------------------------------------------------------------------------------------//
function setNewValues(rowNum) {

    var testArr = inputValuesX[rowNum].length;
    for (var i = 0; i < inputValuesX[rowNum].length; i++) {
        Values4Xes[i] = inputValuesX[rowNum][i];
    }
    for (var i = 0; i < inputValuesY[rowNum].length; i++) {
        Values4Yes[i] = inputValuesY[rowNum][i];
    }
}
// -----------------------------------------------------------------------------------------//
// ---------------- // Initialization of the coordinates of the canvas and other  ----------//
// ---------------- // required initialization points  -------------------------------------//
// -----------------------------------------------------------------------------------------//

function initializeLineGraphs(objectIn) {
    widthOfCanvas = objectIn.width;
    heightOfCanvas = objectIn.height;

    startingX = Math.round(objectIn.width * (difFromX4StartingAXESFromSTART / 100));
    startingY = Math.round(objectIn.height - objectIn.height * (difFromY4StartingAXESFromSTART / 100));
    stopPointY = Math.round(objectIn.height * (difFromY4StartingAXESFromEND / 100));
    stopPointX = Math.round(objectIn.width - objectIn.width * (difFromY4StartingAXESFromEND / 100));
    widthOfXY = stopPointX - startingX + 1; // this "widthOfXY" value includes the values between "maxValueForCoordinateX" and "minValueForCoordinateX"
    heightOfXY = startingY - stopPointY + 1; // this "heightOfXY" value includes the values between "maxValueForCoordinateY" and "minValueForCoordinateY"

    sizeX = inputValuesX.length;
    sizeY = inputValuesX[0].length;

    var iMax = sizeX;
    var jMax = sizeY * 2 + 4;
    var jMax2 = sizeY * 2;
    RecordedArrays = new Array();

    for (i = 0; i < iMax; i++) {
        RecordedArrays[i] = new Array();
        for (j = 0; j < jMax; j++) {
            RecordedArrays[i][j] = 0;
        }
    }

    var jMax = sizeY * 2 + 4;
    RecordedArrays2 = new Array();

    for (i = 0; i < iMax; i++) {
        RecordedArrays2[i] = new Array();
        for (j = 0; j < jMax2; j++) {
            RecordedArrays2[i][j] = 0;
        }
    }

    initializeStepSizeVal(actualRowNum);

    if (Device.deviceOS == "iOS") {
        FontSizeX = "6pt";
        FontSizeY = "6pt";
    } else {
        FontSizeX = "6pt";
        FontSizeY = "6pt";
    }

}

// -----------------------------------------------------------------------------------------//
// ---------------- // Deciding of the start point on y axes for sliding effect ------------//
// -----------------------------------------------------------------------------------------//
function initializeStepSizeVal(rowNum) {

    setNewValues(rowNum);
    getXYPointsOnCanVas(Values4Xes, Values4Yes, ActualXvals, ActualYvals);
    valMaxOfXes = Math.max.apply(null, ActualXvals);
    valMaxOfYes = Math.max.apply(null, ActualYvals);
    lineGraphicsStepSize = startingY - valMaxOfYes;
    StepsizeInC2 = 0;
}

// -----------------------------------------------------------------------------------------//
// ---------------- // Coloring of the background of the canvas, with a  -------------------//
// ---------------- // rectangle object  ---------------------------------------------------//
// -----------------------------------------------------------------------------------------//
function drawBackGroundOfCanvas(objectIn, typeOfCanvas, lineColorIn, fillColorIn, widthOfLine) {

    objectIn.drawRect({
        x1 : 0,
        y1 : 0,
        x2 : objectIn.width,
        y2 : objectIn.height,
        paint : {
            type : typeOfCanvas,
            strokeColor : lineColorIn,
            fillColor : fillColorIn,
            width : widthOfLine
        }
    });
}

// -----------------------------------------------------------------------------------------//
// ---------------- // Drawing a line on the canvas, with a  -------------------------------//
// ---------------- // drawLine object  ----------------------------------------------------//
// -----------------------------------------------------------------------------------------//
function drawLineInCanvas(objectIn, x1In, y1In, x2In, y2In, typeOfCanvas, lineColorIn, widthOfLine) {

    objectIn.drawLine({
        x1 : x1In,
        y1 : y1In,
        x2 : x2In,
        y2 : y2In,
        paint : {
            type : typeOfCanvas, //plain
            strokeColor : lineColorIn,
            fillColor : null,
            width : widthOfLine,
        }
    });
}

// -----------------------------------------------------------------------------------------//
// ---------------- // Calculating the real index point places on the canvas ---------------//
// ---------------- // according to the size given and initialization ----------------------//
// -----------------------------------------------------------------------------------------//
function calculateIndexPoints(objectIn) {

    if (Device.deviceOS != "iOS")
        realIndexPointYForAllXs = Math.round((heightOfCanvas + startingY) / 2);
    else
        realIndexPointYForAllXs = startingY + 1;

    var lenValX = indexValuesX.length;
    var lenValY = indexValuesY.length;
    for (var i = 0; i < lenValX; i++) {
        realIndexPointsX[i] = (9 / 10) * startingX + Math.round(widthOfXY * ((i + 1) / (lenValX + 1)));
    }

    if (Device.deviceOS != "iOS")
        realIndexPointXForAllYs = Math.round((startingX) / 4);
    else
        realIndexPointXForAllYs = Math.round((startingX) / 3);
    for (var i = 0; i < lenValY; i++) {
        realIndexPointsY[i] = (10 / 10) * startingY - Math.round(heightOfXY * ((i + 1) / (lenValY + 1)));
    }
}

// -----------------------------------------------------------------------------------------//
// ---------------- // A specific polygone drawing for the type-1 line graphics ------------//
// ---------------- // For specifically draing 10 points lin graphs ------------------------//
// ---------------- // To simplify the algorithm -------------------------------------------//
// -----------------------------------------------------------------------------------------//
function drawAPolygonWithin10Points2(objectIn, Dx, Dy, lineColorIn, fillColorIn, stepSizeIn) {
    objectIn.drawPolygon({
        points : [Dx[0], startingY, // point 1
            Dx[0], Dy[0] + stepSizeIn, // point 2
            Dx[1], Dy[1] + stepSizeIn, // point 3
            Dx[2], Dy[2] + stepSizeIn, // point 4
            Dx[3], Dy[3] + stepSizeIn, // point 5
            Dx[4], Dy[4] + stepSizeIn, // point 6
            Dx[5], Dy[5] + stepSizeIn, // point 7
            Dx[6], Dy[6] + stepSizeIn, // point 8
            Dx[7], Dy[7] + stepSizeIn, // point 9
            Dx[7], startingY // point 10

        ], // 10 points defined
        paint : {
            type : 0,
            strokeColor : lineColorIn,
            fillColor : fillColorIn, // polygon is filled
            width : 4
        }
    });
}

// -----------------------------------------------------------------------------------------//
// ---------------- // A specific polygone drawing for the type-1 line graphics ------------//
// ---------------- // For specifically draing 10 points lin graphs ------------------------//
// ---------------- // To simplify the algorithm -------------------------------------------//
// -----------------------------------------------------------------------------------------//
function drawAPolygonWithinNPoints(objectIn, ArrayIn, lineColorIn, fillColorIn, stepSizeIn) {
    objectIn.drawPolygon({
        points : ArrayIn, // N points defined
        paint : {
            type : 0,
            strokeColor : lineColorIn,
            fillColor : fillColorIn, // polygon is filled
            width : 4
        }
    });
}

// -----------------------------------------------------------------------------------------//
// ---------------- // Drawing the text values on the given index values -------------------//
// ---------------- // over the X-axes values calculated by calculateIndexPoints() ---------//
// ---------------- // method --------------------------------------------------------------//
// -----------------------------------------------------------------------------------------//
function drawIndexesOnX(objectIn, typeIn, textSizeIn, fontIn, strokeColorIn) {
    for (var ii = 0; ii < indexValuesX.length; ii++) {
        objectIn.drawText({
            text : indexValuesX[ii],
            x : realIndexPointsX[ii],
            y : realIndexPointYForAllXs,
            paint : {
                type : typeIn,
                textSize : textSizeIn,
                font : fontIn,
                strokeColor : strokeColorIn
            }
        });
    }
}

// -----------------------------------------------------------------------------------------//
// ---------------- // Drawing the text values on the given index values -------------------//
// ---------------- // over the Y-axes values calculated by calculateIndexPoints() ---------//
// ---------------- // method --------------------------------------------------------------//
// -----------------------------------------------------------------------------------------//
function drawIndexesOnY(objectIn, typeIn, textSizeIn, fontIn, strokeColorIn) {
    for (var ii = 0; ii < indexValuesY.length; ii++) {
        objectIn.drawText({
            text : indexValuesY[ii],
            x : realIndexPointXForAllYs,
            y : realIndexPointsY[ii],
            paint : {
                type : typeIn,
                textSize : textSizeIn,
                font : fontIn,
                strokeColor : strokeColorIn
            }
        });
    }
}

// -----------------------------------------------------------------------------------------//
// ---------------- // Creating N-point arrays for the given input data  -------------------//
// ---------------- // over the method drawAPolygonWithinNPoints() as an input -------------//
// -----------------------------------------------------------------------------------------//
// an example inputs (X, Y)s are converted into the output, Z
// X = [a1,b1,c1]
// Y = [a2,b2,c2]
// Z = [z1,z2 a1,a2,b1,b2,c1,c2 ,z3,z4], z1 z2,z3,z4 initial points for drawing purposes only

function getPointsArrayForCanvas(stepSizeIn) {
    var InputArr = [];

    InputArr[0] = ActualXvals[0];
    InputArr[1] = startingY;
    var stNums = 2;
    for (var ii = 0; ii < ActualXvals.length; ii++) {
        InputArr[stNums] = ActualXvals[ii];
        stNums = stNums + 2;
    }
    stNums = 3;
    for (var ii = 0; ii < ActualYvals.length; ii++) {
        InputArr[stNums] = ActualYvals[ii] + stepSizeIn;
        stNums = stNums + 2;
    }
    InputArr[2 * (ActualYvals.length + 1)] = ActualXvals[ActualXvals.length - 1];
    InputArr[2 * (ActualYvals.length + 1) + 1] = startingY;

    return InputArr;
}

// -----------------------------------------------------------------------------------------//
// ---------------- // Main dawing method for Canvas 1 -------------------------------------//
// -----------------------------------------------------------------------------------------//
function drawLineGraphsMain1(objectIn, stepSize, typer) {
    var strokeColorIn = "#C1392D";
    var fillColorIn = "#C1392D";
    var typeofit = 0;
    var sizeofIt = 1;
    var x1In = 0;
    var x2In = 0;
    var y1In = 0;
    var y2In = 0;

    if (typer == 0) {
        // Drawing BackGround
        strokeColorIn = "#333333";
        fillColorIn = "#333333";
        typeofit = 0;
        sizeofIt = 1;
        drawBackGroundOfCanvas(objectIn, typeofit, strokeColorIn, fillColorIn, sizeofIt);

        // Drawing Graph 1
        strokeColorIn = LineColorValuesOfGraphs[typer];
        fillColorIn = FillColorValuesOfGraphs[typer];
        if (!effectOn)
            stepSize = 0;

        var InputArr = getPointsArrayForCanvas(stepSize);
        drawAPolygonWithinNPoints(objectIn, InputArr, strokeColorIn, fillColorIn);

        // Drawing XY coordinates
        strokeColorIn = "#484848";
        typeofit = 0;
        if (Device.deviceOS == "Android") {
            sizeofIt = 5;
        } else {
            sizeofIt = 1;
        }
        x1In = startingX;
        y1In = startingY;
        x2In = startingX;
        y2In = stopPointY;
        drawLineInCanvas(objectIn, x1In, y1In, x2In, y2In, typeofit, strokeColorIn, sizeofIt);

        x1In = startingX;
        y1In = startingY;
        x2In = stopPointX;
        y2In = startingY;
        drawLineInCanvas(objectIn, x1In, y1In, x2In, y2In, typeofit, strokeColorIn, sizeofIt);

        strokeColorIn = "#484848";
        typeofit = 0;
        var textSizeofIt = FontSizeX;
        var fontIn = "Arial";
        drawIndexesOnX(objectIn, typeofit, textSizeofIt, fontIn, strokeColorIn);

        strokeColorIn = "#484848";
        typeofit = 0;
        textSizeofIt = FontSizeY;
        fontIn = "Arial";
        drawIndexesOnY(objectIn, typeofit, textSizeofIt, fontIn, strokeColorIn);
    } else if (typer > 0 && typer <= sizeX) {
        // Drawing BackGround
        strokeColorIn = "#333333";
        fillColorIn = "#333333";
        typeofit = 0;
        sizeofIt = 1;
        drawBackGroundOfCanvas(objectIn, typeofit, strokeColorIn, fillColorIn, sizeofIt);

        // Draw Graphs except 1st and last ones
        for (var ii = 0; ii < actualRowNum; ii++) {
            strokeColorIn = LineColorValuesOfGraphs[ii];
            fillColorIn = FillColorValuesOfGraphs[ii];
            drawAPolygonWithinNPoints(objectIn, RecordedArrays[ii], strokeColorIn, fillColorIn);
        }

        // Drawing Graph 2
        strokeColorIn = LineColorValuesOfGraphs[typer];
        fillColorIn = FillColorValuesOfGraphs[typer];

        if (actualRowNum < sizeX) {
            if (typer < sizeX) {
                if (!effectOn)
                    stepSize = 0;
                setNewValues(typer);
                var InputArr = getPointsArrayForCanvas(stepSize);
                drawAPolygonWithinNPoints(objectIn, InputArr, strokeColorIn, fillColorIn);
            }
        }
        // Drawing XY coordinates
        strokeColorIn = "#484848";
        typeofit = 0;
        if (Device.deviceOS == "Android") {
            sizeofIt = 5;
        } else {
            sizeofIt = 1;
        }
        x1In = startingX - 1;
        y1In = startingY;
        x2In = startingX - 1;
        y2In = stopPointY;
        drawLineInCanvas(objectIn, x1In, y1In, x2In, y2In, typeofit, strokeColorIn, sizeofIt);

        x1In = startingX - 1;
        y1In = startingY;
        x2In = stopPointX - 1;
        y2In = startingY;
        drawLineInCanvas(objectIn, x1In, y1In, x2In, y2In, typeofit, strokeColorIn, sizeofIt);

        strokeColorIn = "#484848";
        typeofit = 0;
        var textSizeofIt = FontSizeX;
        var fontIn = "Arial";
        drawIndexesOnX(objectIn, typeofit, textSizeofIt, fontIn, strokeColorIn);

        strokeColorIn = "#484848";
        typeofit = 0;
        textSizeofIt = FontSizeY;
        fontIn = "Arial";
        drawIndexesOnY(objectIn, typeofit, textSizeofIt, fontIn, strokeColorIn);

    }
}

// -----------------------------------------------------------------------------------------//
// ---------------- // Draw Lines on a given canvas object by using color, type ------------//
// ---------------- // size inputs  --------------------------------------------------------//
// -----------------------------------------------------------------------------------------//
function drawLinesOnGraph(objectIn, strokeColorIn, typeofit, sizeofIt) {

    for (var i = 0; i < ActualXvals.length - 1; i++) {

        objectIn.drawLine({
            x1 : ActualXvals[i],
            y1 : ActualYvals[i],
            x2 : ActualXvals[i + 1],
            y2 : ActualYvals[i + 1],
            paint : {
                type : typeofit, //plain
                strokeColor : strokeColorIn,
                fillColor : null,
                width : sizeofIt,
            }
        });
    }

}

// -----------------------------------------------------------------------------------------//
// ---------------- // Draw lines between already recorded x-y coordinates -----------------//
// ---------------- // with virtual effect purposes ----------------------------------------//
// -----------------------------------------------------------------------------------------//
function drawLinesOnGraphWithRecords(objectIn, Records, strokeColorIn, typeofit, sizeofIt) {
    for (var i = 0; i < ActualXvals.length - 1; i++) {

        objectIn.drawLine({
            x1 : Records[2 * i],
            y1 : Records[2 * i + 1],
            x2 : Records[2 * i + 2],
            y2 : Records[2 * i + 3],
            paint : {
                type : typeofit, //plain
                strokeColor : strokeColorIn,
                fillColor : null,
                width : sizeofIt,
            }
        });
    }

}

// -----------------------------------------------------------------------------------------//
// ---------------- // Main drawing method for Canvas 2 -------------------------------------//
// -----------------------------------------------------------------------------------------//
function drawLineGraphsMain2(objectIn, stepSizeIn, rowNum) {
    var strokeColorIn = "#484848";
    var fillColorIn = "#484848";
    var typeofit = 0;
    var sizeofIt = 5;
    var x1In = 0;
    var x2In = 0;
    var y1In = 0;
    var y2In = 0;

    // Drawing BackGround
    strokeColorIn = "#333333";
    fillColorIn = "#333333";
    typeofit = 0;
    sizeofIt = 5;
    drawBackGroundOfCanvas(objectIn, typeofit, strokeColorIn, fillColorIn, sizeofIt);

    if (Device.deviceOS == "iOS")
        sizeOfTheLines = [1, 1, 1];
    sizeofIt = sizeOfTheLines[actualRowNum];
    drawLinesOnGraph(objectIn, LineColorValuesOfGraphs2[actualRowNum], typeofit, sizeofIt);

    // Drawing XY coordinates
    strokeColorIn = "#484848";
    typeofit = 0;
    if (Device.deviceOS == "Android") {
        sizeofIt = 5;
    } else {
        sizeofIt = 1;
    }
    x1In = startingX;
    y1In = startingY;
    x2In = startingX;
    y2In = stopPointY;
    drawLineInCanvas(objectIn, x1In, y1In, x2In, y2In, typeofit, strokeColorIn, sizeofIt);

    x1In = startingX;
    y1In = startingY;
    x2In = stopPointX;
    y2In = startingY;
    drawLineInCanvas(objectIn, x1In, y1In, x2In, y2In, typeofit, strokeColorIn, sizeofIt);

    sizeofIt = sizeOfTheLines[actualRowNum];
    if (effectOn) {
        for (var i = 0; i < actualRowNum; i++) {
            sizeofIt = sizeOfTheLines[i];
            strokeColorIn = LineColorValuesOfGraphs2[i];

            //            serialRecords = [];
            for (var u = 0; u < RecordedArrays2[i].length; u++) {
                serialRecords[u] = RecordedArrays2[i][u];
            }

            drawLinesOnGraphWithRecords(objectIn, serialRecords, strokeColorIn, typeofit, sizeofIt);
            for (var ii = 0; ii < sizeY; ii++) {
                objectIn.drawCircle({
                    x : serialRecords[2 * ii],
                    y : serialRecords[2 * ii + 1],
                    r : 6,
                    paint : {
                        type : 0,
                        fillColor : circleColors[i],
                        strokeColor : circleColors[i]
                    }
                });
            }
        }

        for (var ii = 0; ii < indexHolder + 1; ii++) {
            objectIn.drawCircle({
                x : ActualXvals[ii],
                y : ActualYvals[ii],
                r : 6,
                paint : {
                    type : 0,
                    fillColor : circleColors[actualRowNum],
                    strokeColor : "#75aba2"
                }
            });
        }

        if (stepSizeIn > sizeOfCircle4Effect - 1) {
            indexHolder = indexHolder + 1;
        }
    }
    //drawing axis values
    strokeColorIn = "#484848";
    typeofit = 0;
    var textSizeofIt = FontSizeX;
    var fontIn = "Arial";
    drawIndexesOnX(objectIn, typeofit, textSizeofIt, fontIn, strokeColorIn);

    strokeColorIn = "#484848";
    typeofit = 0;
    textSizeofIt = FontSizeY;
    fontIn = "Arial";
    drawIndexesOnY(objectIn, typeofit, textSizeofIt, fontIn, strokeColorIn);
}
// -----------------------------------------------------------------------------------------//
// -------- // Cleans the canvas (not usedin the project, for general purpose)--------------//
// -----------------------------------------------------------------------------------------//
function cleanCanvas(objectIn, strokeColorIn, fillColorIn, typeofit, sizeofIt) {
    // Drawing BackGround (Example Usage)
    // strokeColorIn = "#333333";  // color code
    // fillColorIn = "#333333";    // color code
    // typeofit = 0;               // plain type (radial etc. check for details on docs.smartfaces.io)
    // sizeofIt = 5;               // size of the stroke

    drawBackGroundOfCanvas(objectIn, typeofit, strokeColorIn, fillColorIn, sizeofIt);
}

// -----------------------------------------------------------------------------------------//
// ---- // Calculate time difference between 2 looping entrace for drawing on canvas -------//
// ---- // Aim is to decide on the looping period value for different CPU and GPU ----------//
// ---- // powered mobile phones and units.
// -----------------------------------------------------------------------------------------//
function chechLoopSpeedOfDevice(date1_ms) {
    var date2_ms = new Date().getTime();
    var difference_ms = date2_ms - date1_ms;
    newDate = date2_ms;
    return difference_ms;
}