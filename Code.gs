// Initial function to generate a dynamic content with partials
function doGet(e) {
  
  Logger.log(e.param);
  // create a Html Page from a project file
  return HtmlService.createTemplateFromFile("page").evaluate();
  
}

// create the Partial inclusion function
function include(filename){
  return HtmlService.createHtmlOutputFromFile(filename).getContent()
}

function userClicked(userInfo){
  
  var url = "https://docs.google.com/spreadsheets/d/1Ge_njRIV_YTVJnfgRQuVkOnvGtMiUQftHRcPSGuiD7A/edit#gid=0"
  var ss = SpreadsheetApp.openByUrl(url);
  var sheetname = "Data"
  var ws = ss.getSheetByName(sheetname);
  
  // give an array with values from page form or from a function
  ws.appendRow([userInfo.firstName, userInfo.lastName, userInfo.app,new Date()]);
  
  Logger.log(name + " clicked the button");
}