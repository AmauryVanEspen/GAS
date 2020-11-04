function doGet(e) {
  
  Logger.log(e.param);
  // create a Html Page from a project file
  return HtmlService.createHtmlOutputFromFile("page")
  
}

function userClicked(name){
  
  var url = "https://docs.google.com/spreadsheets/d/1Ge_njRIV_YTVJnfgRQuVkOnvGtMiUQftHRcPSGuiD7A/edit#gid=0"
  var ss = SpreadsheetApp.openByUrl(url);
  var sheetname = "Data"
  var ws = ss.getSheetByName(sheetname);
  
  // give an array with values from page form or from a function
  ws.appendRow([name, new Date()]);
  
  Logger.log(name + " clicked the button");
}