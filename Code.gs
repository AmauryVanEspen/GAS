// Global variables

// not used, replaced by sheetId
// var url = "https://docs.google.com/spreadsheets/d/1Ge_njRIV_YTVJnfgRQuVkOnvGtMiUQftHRcPSGuiD7A/edit#gid=0";

var sheetId = "1Ge_njRIV_YTVJnfgRQuVkOnvGtMiUQftHRcPSGuiD7A";

// #Help : rendre la valeur de la feuille "parametrable" au démarrage de l'appel de l'application
// var sheetIdSuivi = "1_UQKQD6UHOYP_ZCyMQ_VL8c8qO7DbYCz";

// Initial function to generate a dynamic content with partials
function doGet(e) {
  
  // Get spreadsheet
  var ss = SpreadsheetApp.openById(sheetId);
  
  
  // Get sheets by name as object
  var sheetnameOptions = "Options"
  var wsOptions = ss.getSheetByName(sheetnameOptions);
  
  // Get activities list
  // Get sheets by name as object
  var sheetnameActivites = "Activites"
  var wsActivites = ss.getSheetByName(sheetnameActivites);
  
  // Get Arrays of arrays from Spreedsheet with all the values from the columns (Dictionnary Key-Value).
  var options = wsOptions.getDataRange().getValues();
  
  var activiteslist = wsActivites.getDataRange().getValues();
  
  //Logger.log(options);
  // Log to understand the optionsHeaders and Values according to range get in options.
  //for (var i = 0; options.length; i++) {Logger.log(i, options[i])};
  
  // Get Header line only : Index 0 => first line of the sheetnameOptions
  var optionsHeaders = options[0]; // First line of Sheet "Options" with Header
  // Get items line only : starting @ Index 1 => lines of the sheetnameOptions
  var optionsValues = options.slice(1, options.length);
  
  // Get Header line only : Index 0 => first line of the sheetnameOptions
  var activitesHeaders = activiteslist[0]; // First line of Sheet "Options" with Header
  // Get items line only : starting @ Index 1 => lines of the sheetnameOptions
  var activitesValues = activiteslist.slice(1, activiteslist.length);
  
  // HTML page rendering template from file
  var html = HtmlService.createTemplateFromFile("page");
  
  // Log
  //Logger.log(e.param);
  //Logger.log(optionsValues.map(function(options){ return { "option": options[0], "id": options[1] } }));
  
  // Variables
  // Get the items content by columns.
  // return single dimension array from spreadsheet
  html.peloton = optionsValues.map(function(items){ 
    return { "option": items[0], "id": items[1] } 
  }); 
  
  html.groupe = optionsValues.map(function(items){ 
    return { "option": items[2], "id": items[3] } 
  }); 
  
  html.role = optionsValues.map(function(items){ 
    return { "option": items[9], "id": items[10] } 
  });
  
  html.activites = activitesValues.map(function(items){ 
    return { "activites": items[1], "id": items[0] } 
  });
  
  html.status = optionsValues.map(function(items){ 
    return { "status": items[4], "id": items[5] } 
  }); 
  
  html.confirmationstatus = optionsValues.map(function(items){ 
    return { "status": items[6], "id": items[7] } 
  }); 
  
  
  // create a Html Page from a project file
  // Let browser know website is optimized for mobile
  return html.evaluate().addMetaTag("viewport", "width=device-width, initial-scale=1.0").setTitle('GAS Form - spreadsheet');
  
}

// #Help implementation d'une seconde feuille
//function getSuiviIndividuel(){
//  var suivi = SpreadsheetApp.openById(sheetIdSuivi);
//  
//  // Get sheets by name as object for basic data
//  var sheetnameSuiviPersonnel = "Liste du personnel"
//  var wsSuiviPersonnel = suivi.getSheetByName(sheetnameSuiviPersonnel);
//  
//  var suiviIndividuel = wsOptions.getDataRange().getValues();
//  // Get Header line only : Index 0 => first line of the sheetnameOptions
//  var suiviIndividuelHeaders = suiviIndividuel[4]; // First line of Sheet "Options" with Header
//  // Get items line only : starting @ Index 1 => lines of the sheetnameOptions
//  var suiviIndividuelValues = suiviIndividuel.slice(5, suiviIndividuel.length);
//  
//  var pagesuivi = HtmlService.createTemplateFromFile("suivi");
//
//  pagesuivi.droitsouverts = suiviIndividuelValues.map(function(items){ 
//    return { "droitsouverts": items[479], "nid": items[3] } 
//  });
//
//  pagesuivi.droitsrestants = suiviIndividuelValues.map(function(items){ 
//    return { "droitsrestants": items[480], "nid": items[3] } 
//  });
//
//  pagesuivi.totalsjours = suiviIndividuelValues.map(function(items){ 
//    return { "totaljours": items[580], "nid": items[3] } 
//  });
//
//  pagesuivi.ppa60 = suiviIndividuelValues.map(function(items){ 
//    return { "ppa60": items[581], "nid": items[3] } 
//  });
//
//  pagesuivi.missionsops = suiviIndividuelValues.map(function(items){ 
//    return { "missionsops": items[582], "nid": items[3] } 
//  });
//  
//  return pagesuivi.evaluate().setTitle('Suivi Individuel - spreadsheet');
//};

function getActivitiesConfirmationStatus(activites, nid){
  var ss = SpreadsheetApp.openById(sheetId);
  
  // Get sheets by name as object
  var sheetnameActivitesReport = "ActivitesReport"
  var wsActivitesReport = ss.getSheetByName(sheetnameActivitesReport);
  
  var activitesreport = wsActivitesReport.getDataRange().getValues();
  
    // Get Header line only : Index 0 => first line of the sheetnameOptions
  var activitesReportHeaders = activitesreport[0]; // First line of Sheet "Options" with Header
  // Get items line only : starting @ Index 1 => lines of the sheetnameOptions
  var activitesReportValues = activitesreport.slice(1, activitesreport.length);
  
  // get position : -1 if not found
  var position = activitesReportValues.IndexOf(activites, nid);
 
  var statusconfirme = activitesReportValues.map(function(items){ 
    return {  "activite_id": items[0], "nid": items[1], "statusconfirme": items[3] } 
  });
  
  if(position > -1){
    return statusconfirme[position];
  }else{
    return 'Non communiqué';
  };
  
}

// create the Partial inclusion function
function include(filename){
  return HtmlService.createHtmlOutputFromFile(filename).getContent()
}

function userClicked(userInfo, activites){
  // Get spreadsheet
  var ss = SpreadsheetApp.openById(sheetId);
  
  // Get sheets by name as object
  var sheetnameData = "Data"
  var wsData = ss.getSheetByName(sheetnameData);
  
  var sheetnameRole = "Role"
  var wsRole = ss.getSheetByName(sheetnameRole); 
  
  var sheetnameActivites = "Activites"
  var wsActivites = ss.getSheetByName(sheetnameActivites);
  
  var sheetnameActivitesReport = "ActivitesReport"
  var wsActivitesReport = ss.getSheetByName(sheetnameActivitesReport);
  
  // give an array with values from page form or from a function
  wsData.appendRow([userInfo.firstName, userInfo.lastName, userInfo.nid, userInfo.birthday, userInfo.peloton, userInfo.groupe, new Date()]);
  wsRole.appendRow([userInfo.firstName, userInfo.lastName, userInfo.role, new Date()]);
  wsActivitesReport.appendRow([activites.id, userInfo.nid, activites.status, activites.confirmationstatus, userInfo.email, new Date()]);
  
  return userInfo;
  Logger.log(name + " clicked the button");
}