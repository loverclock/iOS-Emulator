// this webclient is using at login
loginWebClient = new SMF.Net.WebClient(); // webClient object for fetching server response
loginWebClient.url = "http://services.smartface.io/SmartfaceInAction/Login"; // assign url to webclient object
loginWebClient.httpMethod = "POST"; // assign method type
loginWebClient.requestHeaders = ["Content-Type: application/json"]; // adding requestHeader
loginWebClient.ignoreSSLErros = true; //for not breaking the connection on SSL erros

// this webclient is using at register
registerWebClient = new SMF.Net.WebClient(); // webClient object for fetching server response
registerWebClient.url = "http://services.smartface.io/SmartfaceInAction/Register"; // assign url to webclient object
registerWebClient.httpMethod = "POST"; // assign method type
registerWebClient.requestHeaders = ["Content-Type: application/json"]; // adding requestHeader
registerWebClient.ignoreSSLErros = true; //for not breaking the connection on SSL erros

// this webclient is using at update profile
updateWebClient = new SMF.Net.WebClient(); // webClient object for fetching server response
updateWebClient.url = "http://services.smartface.io/SmartfaceInAction/UpdateProfile"; // assign url to webclient object
updateWebClient.httpMethod = "PUT"; // assign method type
updateWebClient.requestHeaders = ["Content-Type: application/json"]; // adding requestHeader
updateWebClient.ignoreSSLErros = true; //for not breaking the connection on SSL erros

// this webclient is using for facebook login
fbLoginWebClient = new SMF.Net.WebClient(); // webClient object for fetching server response
fbLoginWebClient.url = "http://services.smartface.io/SmartfaceInAction/FacebookLogin"; // assign url to webclient object
fbLoginWebClient.httpMethod = "POST"; // assign method type
fbLoginWebClient.requestHeaders = ["Content-Type: application/json"]; // adding requestHeader
fbLoginWebClient.ignoreSSLErros = true; //for not breaking the connection on SSL erros