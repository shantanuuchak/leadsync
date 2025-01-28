import fs from "fs";
import Papa from "papaparse";

// Read from a csv file
export function readCSV(file) {
  const fileContent = fs.readFileSync(file, "utf-8");
  const parse = Papa.parse(fileContent, {
    header: true,
  });

  return { body: parse.data, headers: parse.meta.fields };
}

// Write to a csv file
export function writeCSV(file, data) {
  const stringify = Papa.unparse(data);
  fs.writeFileSync(file, stringify);
}
