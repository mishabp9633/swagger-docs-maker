// start
const fs = require("fs");
const path = require("path");
const templates = require("./Templates/templates");


const createCodeSwaggerFile = (fileName, folderName, code) => {
  const filePath = path.join(folderName, fileName+'.swagger.yaml');
 console.log({filePath});
 console.log({fileName});
 console.log({folderName});
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
