#!/usr/bin/env node

import {
  intro,
  outro,
  isCancel,
  cancel,
  text,
  log,
  spinner,
} from "@clack/prompts";

// Read CLI Arguments
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
const argv = yargs(hideBin(process.argv)).argv;

import { readCSV, writeCSV } from "./lib/io.js";
import service from "./lib/core.js";

// Starting the main application
async function main() {
  // Read using interactive prompts
  intro(`Lead Sync App`);

  const s = spinner();

  const input = await text({
    message: "What is your input file?",
    defaultValue: "leads.csv",
    validate: (value) => {
      if (!value.toLowerCase().endsWith("csv")) {
        return "Only csv files are supported.";
      }
    },
  });

  const output = await text({
    message: "What is your output file?",
    defaultValue: "final.csv",
    validate: (value) => {
      if (!value.toLowerCase().endsWith("csv")) {
        return "Only csv files are supported.";
      }
    },
  });

  const report = await text({
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
