import fs from "fs";
import Papa from "papaparse";
import { parse } from "./lib/parse.js";

import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
const argv = yargs(hideBin(process.argv)).argv;

// Get the input file from the command line
const inputFile = argv["input"];
const outputFile = argv["output"];

const csvFile = fs.readFileSync(inputFile, "utf8"); // Read the CSV file

// Parse the CSV file
const csvData = Papa.parse(csvFile, {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
});

csvData.data.forEach(async (row) => {
  const { title, error } = await parse(row["Website URL"]);

  if (error) {
    console.log("failed", row["Company Name"]);
    return;
  }

  console.log(title.toLowerCase().includes(row["Company Name"].toLowerCase()));
});
