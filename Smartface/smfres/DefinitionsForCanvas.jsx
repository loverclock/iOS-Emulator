// -----------------------------------------------------------------------------------------
// Input Values 
// You can edit the values in this part
// -----------------------------------------------------------------------------------------

//     ________________________  
//    |          d             |
//    |   y|                   |
//    |    |                   |
//    |  a |______________x    |
//    |____0___b____________c__|
//
// Initialization for Line Graph1 and some mutual intializations
var difFromX4StartingAXESFromSTART = 15; // percentage  (distance between zero point of the canvas and the Y-axes) a
var difFromY4StartingAXESFromSTART = 12; // percentage  (distance between zero point of the canvas and the X axes) b
var difFromX4StartingAXESFromEND = 1;    // percentage  (distance between end point of the canvas and the end point of the Y-axes) c  
var difFromY4StartingAXESFromEND = 2;    // percentage  (distance between end point of the canvas and the end point of the X-axes) d

var maxValueForCoordinateX = 1120; // define the max value for the X-axes (for RESIZING the graphics for any canvas)
var minValueForCoordinateX = 1;    // define the min value for the X-axes (for RESIZING the graphics for any canvas)
var maxValueForCoordinateY = 500;  // define the max value for the Y-axes (for RESIZING the graphics for any canvas)
var minValueForCoordinateY = 0;    // define the min value for the Y-axes (for RESIZING the graphics for any canvas)

// ------------------------------------------------------------------------------
// NxM matris for the values of x coordinates of a canvas
// N : Number of the line graphics
// M : Number of the points to create a line graphic  
// ------------------------------------------------------------------------------
var inputValuesX = [[1, 120, 240, 360, 480, 600, 720, 840, 960,1100],
    [1, 120, 240, 360, 480, 600, 720, 840, 960,1100],
    [1, 120, 240, 360, 480, 600, 720, 840, 960,1100]];

// ------------------------------------------------------------------------------
// NxM matris for the values of y coordinates of a canvas
// N : Number of the line graphics
// M : Number of the points to create a line graphic  
// ------------------------------------------------------------------------------    
var inputValuesY = [[ 240, 200, 220, 210, 300, 330, 310, 320, 400,300],
                    [ 160, 140, 150, 160, 250, 270, 260, 200, 320,230],
                    [ 70, 40, 60, 130, 140, 100, 110, 150, 210,110]];

var LineColorValuesOfGraphs = ["#008592","#00656d","#004449"];  // Line color choice for each of the line graphs on LineGraph-1
var FillColorValuesOfGraphs = ["#008592","#00656d","#004449"];  // Fill color choice for each of the line graphs on LineGraph-1

var LineColorValuesOfGraphs2 = ["#008592","#00656d","#2B84D3"]; // Line color choice for each of the line graphs on LineGraph-2

var indexValuesY = ["20", "40", "60", "80", "100"]; // Legend values on the Y-Axes
var indexValuesX = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July"]; // Legend values on the X-Axes

var FontSizeX = "4pt"; // Font size on the X axes.
var FontSizeY = "4pt"; // Font size on the Y axes.

var effectOn = true;
// -----------------------------------------------------------------------------------------
// Initialization for Line Graph2
var StepsizeInC2 = 0;
var indexHolder = 0;
var numOfPointsDrawn = 0;
var JumpVal = 20;
var circleColors = ["#008592","#00656d","#2B84D3"]; // Fill color choice for each of circles of the the line graph 2
var sizeOfTheLines = [5,10,7]; 
var sizeOfCircle4Effect = 20;
// -----------------------------------------------------------------------------------------

// Do not modify the part below
// Necessary Global Values
var widthOfScreen = 1;
var heightOfScreen = 1;
var widthOfCanvas = 1;
var heightOfCanvas = 1;
var startingX = 1;
var startingY = 1;
var stopPointY = 1;
var stopPointX = 1;
var widthOfXY = 1;
var heightOfXY = 1;

var LineGraphIndexer = 0;
var recordedStepSize1 = 1;
var recordedStepSize = 1;

var drawRectStepSize = 120;
var drawRectAdder = 1;

var typer = 0;

var sizeX = 0;
var sizeY = 0;

var RecordedArrays = [];
var RecordedArrays2 = [];
var actualRowNum = 0;

var Values4Xes = []; // [100, 210, 280, 420, 630, 840, 910, 940];  // ideally they must be between max and min values of X
var Values4Yes = []; // [300, 350, 310, 430, 360, 420, 370, 395];  // ideally they must be between max and min values of Y

var lineGraphicsStepSize = 120;

var ActualXvals = [];
var ActualYvals = [];

var valMaxOfXes;
var valMaxOfYes;
var newDate = 50;
var MeanTime = 1;
var counter =0;
var couldIDrawGraphics = true;
var serialRecords = [];


var JumpVal1= 15;  // Do not edit 
var realIndexPointsX = [];
var realIndexPointYForAllXsIOS = 1;
var realIndexPointYForAllXs = 1;
var realIndexPointsY = [];
var realIndexPointXForAllYs = 1;
var realIndexPointXForAllYsIOS = 1;
// -----------------------------------------------------------------------------------------