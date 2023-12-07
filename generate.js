// start
const fs = require("fs");
const path = require("path");
const templates = require("./Templates/templates");


const createCodeSwaggerFile = (fileName, folderName, code) => {
  
let FileName = fileName;
if (FileName.endsWith('s')) {
  FileName = FileName.slice(0, -1); // Remove the last character
}

// Construct the filePath with the corrected file name
const filePath = path.join(folderName, FileName + '.swagger.yaml');
  try {
    fs.writeFileSync(filePath, code, { flag: 'w' });
    console.log(`File updated: ${fileName}`);
  } catch (err) {
    console.error(`Error updating file ${fileName}: ${err}`);
  }

};

const swaggerDoc = (docName, folderName) => {
  if (folderName && docName) {
    createCodeSwaggerFile(docName, folderName, templates.swaggerDocTemplate(docName));
  }else{
    console.error("Something wrong.");
    process.exit(1);
  }
};

// package handler
function generateFiles(docName, folderName) {

  swaggerDoc(docName, folderName);

  console.log("Happy Hacking! 🔥 by MIC - Osperb");
}

module.exports = { generateFiles };
