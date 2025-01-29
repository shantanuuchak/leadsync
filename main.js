#!/usr/bin/env node
import { createRequire } from "module";

import {
  intro,
  outro,
  isCancel,
  cancel,
  text,
  log,
  spinner,
} from "@clack/prompts";

const require = createRequire(import.meta.url);
const packageJSON = require("./package.json");

// Read CLI Arguments
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
const argv = yargs(hideBin(process.argv))
  .option("input", {
    alias: "i",
    type: "string",
    description: "Input CSV file",
  })
  .option("output", {
    alias: "o",
    type: "string",
    description: "Output CSV file for clean data",
  })
  .option("report", {
    alias: "r",
    type: "string",
    description: "Output CSV file for error reports",
  })
  .help("h")
  .alias("h", "help")
  .version(packageJSON.version)
  .alias("v", "version")
  .parse();

import { readCSV, writeCSV } from "./lib/io.js";
import service from "./lib/core.js";

// Starting the main application
async function main() {
  intro(`Lead Sync App`);

  const s = spinner();

  let input, output, report;

  // If CLI arguments are provided, use them
  if (argv.input && argv.output && argv.report) {
    input = argv.input;
    output = argv.output;
    report = argv.report;
  } else {
    // Otherwise, use interactive prompts
    input = await text({
      message: "What is your input file?",
      defaultValue: "leads.csv",
      validate: (value) => {
        if (!value.toLowerCase().endsWith("csv")) {
          return "Only csv files are supported.";
        }
      },
    });

    output = await text({
      message: "What is your output file?",
      defaultValue: "final.csv",
      validate: (value) => {
        if (!value.toLowerCase().endsWith("csv")) {
          return "Only csv files are supported.";
        }
      },
    });

    report = await text({
      message: "What is your report file?",
      defaultValue: "report.csv",
      validate: (value) => {
        if (!value.toLowerCase().endsWith("csv")) {
          return "Only csv files are supported.";
        }
      },
    });

    // Check for cancel
    if (isCancel(input) || isCancel(output) || isCancel(report)) {
      cancel("Operation cancelled.");
      process.exit(1);
    }
  }

  s.start("Starting file validation...");

  const csvData = readCSV(input);
  const [clean, errors] = service(csvData.body);

  // Create the clean file
  writeCSV(output, clean);

  // Generate report file
  writeCSV(report, errors);

  s.stop();

  log.success(
    `File validation completed. Check ${output} and ${report} for results.`
  );

  outro(`You're all set!`);
}

await main();
