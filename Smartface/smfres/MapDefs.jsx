var filterPressed = false; // a flag for checking using filter
var selectedFilterValue = 0; //0:all , 1:triangle , 2:square , 3:circle
var totalNumberOfPins = 0; // holding number of pin , 0 is first value
var typeOfMap = 0; // holding type of map //
SMF.storeVariable("webclientSuc","0",false,true);
var webclientSuccessed = SMF.restoreVariable("webclientSuc");;
var pinAdded = false; // a flag for checking adding a pin
var lastAddress; // holding adding address
var lastLat = 0; //  holding latitude value of location
var lastLon = 0; //  holding longtitude value of location
var selectedPinId = 0; // holding selected pin id
var rowAddedToPinDataset = false; // a flag for checking saving new location to database
var pinTypeToAdd = 0; // holding pin type which is saved to database
var newPage; // routing page