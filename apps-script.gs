// Google Apps Script backend. Create a Google Sheet, Extensions > Apps Script, paste this, Deploy > Web app (Execute as: Me, Access: Anyone).
const COLS=['ts','name','eid','dept','game','score','max','found','total','lang','sec','det'];
function sheet_(){const s=SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Results')||SpreadsheetApp.getActiveSpreadsheet().insertSheet('Results');if(s.getLastRow()==0)s.appendRow(COLS);return s}
function doPost(e){try{const r=JSON.parse(e.postData.contents);sheet_().appendRow(COLS.map(c=>r[c]===undefined?'':r[c]));return out_({ok:true})}catch(x){return out_({ok:false,error:String(x)})}}
function doGet(e){const v=sheet_().getDataRange().getValues();const h=v.shift();return out_(v.map(r=>{const o={};h.forEach((k,i)=>o[k]=r[i]);return o}))}
function out_(o){return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON)}
