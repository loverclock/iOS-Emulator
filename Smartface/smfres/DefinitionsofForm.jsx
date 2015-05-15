var loginWebClient; // webClient object for fetching server response
var imageFile; // image for upload server
var imgCropSelect; // a flag for when returning pgCrop, which will go to page
var address; // to hold user current address
var firstTouchX, firstTouchY; // to hold user touch position to device screen
var imageFirstX1, imageFirstY1, imageFirstX2, imageFirstY2; // to hold user first touch position to image object in pgCrop
var imageLastX1, imageLastY1, imageLastX2, imageLastY2; // to hold user last touch position to image object in pgCrop
var imageXDiff, imageYDiff; // to hold distance between first touch and last touch in pgCrop page
var lat; // to keep latitude value of current location
var lng; // to keep longtitude value of current location
var responseObjectProfile; // server response
var fromRegisterorProfile; // a flag for which going from page
var fbResponseObject; // server response
var latfromService; // to keep latitude value from server response
var lngfromService; // to keep longtitude value from server response
var lngfromFB; // to keep latitude value from server response
var latfromFB; // to keep longtitude value from server response
var firstWidth = Pages.pgCrop.Rectangle1.width; // to hold this object default width value
var firstHeight = Pages.pgCrop.Rectangle1.height; // to hold this object default height value
var fId; // to keep user Facebook Id
var emailorFbLogin; // a flag for which you use login type