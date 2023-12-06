// #!/usr/bin/env node

const generateFiles = require("./generate").generateFiles;
const fs = require("fs");
const path = require("path");

console.log("data :", process.argv);

 const titlesFromCommand = process.argv[2];
 const fileName = titlesFromCommand?.split(",");
 console.log(fileName);
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

if (fs.existsSync(filePath)) {
  console.error(`The ${fileName[0]} swagger document name is already in use. Please choose another one.`);
  process.exit(1);
}
if (!fs.existsSync(folderName)) {
  fs.mkdirSync(folderName);
}
fs.writeFileSync(filePath, "Content for the file.");


if (process.argv.length > 2) {
  generateFiles(fileName[0], folderName);
} else {
  console.error("Please provide a model name as a command line argument.");
  process.exit(1);
}
