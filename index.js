#!/usr/bin/env node

const generateFiles = require("./generate").generateFiles;
const fs = require("fs");
const path = require("path");

 const titlesFromCommand = process.argv[2];
 const fileName = titlesFromCommand?.split(",");
 const folderName = 'swagger-docs'

 if (!titlesFromCommand) {
  console.error(
    "\x1b[31m%s\x1b[0m",
    "Please provide document name for file generation."
  );

  process.exit(1);
}

if (fileName.length > 1) {
  console.error(
    "\x1b[31m%s\x1b[0m",
    "Please provide only one document name at a time for file generation."
  );
  process.exit(1);
}

const filePath = path.join(folderName, fileName[0] + '.swagger.yaml');

// Check if the file already exists
if (fs.existsSync(filePath)) {
  console.error(`The ${fileName[0]} swagger document name is already in use. Please choose another one.`);
  process.exit(1);
}

// Remove 's' from the end of the fileName if it exists
let correctedFileName = fileName[0];
if (correctedFileName.endsWith('s')) {
  correctedFileName = correctedFileName.slice(0, -1); // Remove the last character
}

// Construct the filePath with the corrected file name
const correctedFilePath = path.join(folderName, correctedFileName + '.swagger.yaml');

// Check if the folder doesn't exist, then create it
if (!fs.existsSync(folderName)) {
  fs.mkdirSync(folderName);
}

// Write the file with the corrected file name
fs.writeFileSync(correctedFilePath, "Content for the file.");


if (process.argv.length > 2) {
  generateFiles(fileName[0], folderName);
} else {
  console.error("Please provide a model name as a command line argument.");
  process.exit(1);
}
