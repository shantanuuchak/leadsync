import fs from "fs";
import Papa from "papaparse";
import axios from "axios";

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
  const data = await axios.get(row["Website URL"]);
  console.log(data);
});
