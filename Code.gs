// Global variables

// not used, replaced by sheetId
// var url = "https://docs.google.com/spreadsheets/d/1Ge_njRIV_YTVJnfgRQuVkOnvGtMiUQftHRcPSGuiD7A/edit#gid=0";

var sheetId = "1Ge_njRIV_YTVJnfgRQuVkOnvGtMiUQftHRcPSGuiD7A";

// Initial function to generate a dynamic content with partials
function doGet(e) {
  
  // Get spreadsheet
  var ss = SpreadsheetApp.openById(sheetId);
  
  // Get sheets by name as object
  var sheetnameOptions = "Options"
  var wsOptions = ss.getSheetByName(sheetnameOptions);
  
  // Get Arrays of arrays from Spreedsheet with all the values from the columns (Dictionnary Key-Value).
  var options = wsOptions.getDataRange().getValues();
  
  Logger.log(options);
  // Log to understand the optionsHeaders and Values according to range get in options.
  for (var i = 0; options.length; i++) {Logger.log(i, options[i])};
  
  // Get Header line only : Index 0 => first line of the sheetnameOptions
  var optionsHeaders = options[0]; // First line of Sheet "Options" with Header
  // Get items line only : starting @ Index 1 => lines of the sheetnameOptions
  var optionsValues = options.slice(1, options.length);
  
  // #Old Code
  // Get Arrays of arrays from Spreedsheet with all the value from the columns.
  //var peloton = wsOptions.getRange(2, 1, wsOptions.getRange("A2").getDataRegion().getLastRow()-1, 1).getValues();
  //var pelotonid = wsOptions.getRange(2, 2, wsOptions.getRange("B2").getDataRegion().getLastRow()-1, 2).getValues();
  //var groupe = wsOptions.getRange(2, 3, wsOptions.getRange("C2").getDataRegion().getLastRow()-1, 3).getValues();
  //var groupeid = wsOptions.getRange(2, 4, wsOptions.getRange("D2").getDataRegion().getLastRow()-1, 4).getValues();
  // HTML page rendering template from file
  var html = HtmlService.createTemplateFromFile("page");
  
  // Log
  Logger.log(e.param);
  Logger.log(optionsValues.map(function(options){ return { "option": options[0], "id": options[1] } }));
  
  // Variables
  // Get the items content by columns.
  // return single dimension array from spreadsheet
  html.peloton = optionsValues.map(function(items){ return { "option": items[0], "id": items[1] } }); 
  //optionsValues.map(options => options[0]);
  //  html.pelotonid = optionsValues.map(options => options[1]);
  html.groupe = optionsValues.map(function(items){ return { "option": items[2], "id": items[3] } }); 
  //optionsValues.map(options => options[2]);
  //  html.groupeid = optionsValues.map(options => options[3]);
   
  // #Old Code
  //html.peloton = peloton.map(function(r){ return r[0]});
  //html.pelotonid = pelotonid.map(function(r){ return r[0]});;
  //html.groupe = groupe.map(function(r){ return r[0]});;
  //html.groupeid = groupeid.map(function(r){ return r[0]});;
  
  // create a Html Page from a project file
  // Let browser know website is optimized for mobile
  return html.evaluate().addMetaTag("viewport", "width=device-width, initial-scale=1.0").setTitle('GAS Form - spreadsheet');
  
}

// create the Partial inclusion function
function include(filename){
  return HtmlService.createHtmlOutputFromFile(filename).getContent()
}

function userClicked(userInfo){
  // Get spreadsheet
  var ss = SpreadsheetApp.openById(sheetId);
  
  // Get sheets by name as object
  var sheetnameData = "Data"
  var wsData = ss.getSheetByName(sheetnameData);
  
  var sheetnameRole = "Role"
  var wsRole = ss.getSheetByName(sheetnameRole);  
  
  // give an array with values from page form or from a function
  wsData.appendRow([userInfo.firstName, userInfo.lastName, userInfo.peloton, userInfo.groupe, new Date()]);
  wsRole.appendRow([userInfo.firstName, userInfo.lastName, userInfo.nid, userInfo.birthDay, new Date()]);
  
  return userInfo;
  Logger.log(name + " clicked the button");
}