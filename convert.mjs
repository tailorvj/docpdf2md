import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import dir from 'node-dir';
import pdf2md from '@opendocsg/pdf2md';

const sourceDirectory = './documents/source';
const outputDirectory = './documents/output';

const logDirectory = './logs';
const timestamp = new Date().toISOString().replace(/:/g, '-'); // Replacing ":" to make it filesystem-friendly
const logFileName = `run-log-${timestamp}.txt`;
const logFilePath = path.join(logDirectory, logFileName);

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

function writeToLog(message) {
  const logMessage = `${new Date().toISOString()} - ${message}\n`;
  fs.appendFileSync(logFilePath, logMessage);
}

// Convert a PDF file directly to Markdown using pdf2md
async function convertPDFtoMD(pdfFilePath, outputFolderPath) {
  try {
    const pdfBuffer = fs.readFileSync(pdfFilePath);
    const mdText = await pdf2md(pdfBuffer);

    const outputFileName = `${path.basename(pdfFilePath, '.pdf')}.md`;
    const outputFile = path.join(outputFolderPath, outputFileName);

    await fs.promises.writeFile(outputFile, mdText);
    return outputFile;
  } catch (err) {
    throw new Error(`Failed to convert ${pdfFilePath} to Markdown. Reason: ${err.message}`);
  }
}

// Convert a file to Markdown using Pandoc
function convertToMarkdown(inputFile, outputFile) {
  return new Promise((resolve, reject) => {
    const command = `pandoc "${inputFile}" -o "${outputFile}"`;
    exec(command, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

// Process each file in the source directory
dir.files(sourceDirectory, async (err, files) => {
  if (err) throw err;

  const processFiles = files.map(async (file) => {
    const fileExtension = file.split('.').pop();

    if (fileExtension === 'pdf') {
      try {
        const outputFile = await convertPDFtoMD(file, outputDirectory);
        writeToLog(`Converted ${file} to ${outputFile}`);
      } catch (error) {
        writeToLog(error.message);
      }
    } else if (['doc', 'docx'].includes(fileExtension)) {
      const outputFile = `${outputDirectory}/${path.basename(file)}.md`;
      try {
        await convertToMarkdown(file, outputFile);
        writeToLog(`Converted ${file} to ${outputFile}`);
      } catch (error) {
        writeToLog(`Failed to convert ${file}. Reason: ${error.message}`);
      }
    }
  });
  await Promise.all(processFiles);
});
