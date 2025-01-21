import fs from "fs";
import Papa from "papaparse";
import dotenv from "dotenv";
dotenv.config();
import Cloudflare from "cloudflare";
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

// csvData.data.forEach(async (row) => {
//   const { title, error } = await parse(row["Website URL"]);

//   if (error) {
//     console.log("failed", row["Company Name"]);
//     return;
//   }

//   console.log(title.toLowerCase().includes(row["Company Name"].toLowerCase()));
// });

async function run(model, input) {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.ACCOUNT_ID}/ai/run/${model}`,
    {
      headers: { Authorization: "Bearer {API_TOKEN}" },
      method: "POST",
      body: JSON.stringify(input),
    }
  );
  const result = await response.json();
  return result;
}

run("@cf/meta/llama-3-8b-instruct", {
  messages: [
    {
      role: "system",
      content: "You are a friendly assistan that helps write stories",
    },
    {
      role: "user",
      content:
        "Write a short story about a llama that goes on a journey to find an orange cloud ",
    },
  ],
}).then((response) => {
  console.log(JSON.stringify(response));
});
