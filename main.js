import { intro, outro, isCancel, cancel, text, log } from "@clack/prompts";

// Read CLI Arguments
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
const argv = yargs(hideBin(process.argv)).argv;

import { readCSV, writeCSV } from "./lib/io.js";
import service from "./lib/core.js";

// This is responsible to start our program
async function main() {
  // const csvData = readCSV(argv.input);
  // const [clean, errors] = service(csvData.body);
  // // Create the clean file
  // writeCSV(argv.output, clean);
  // // Generate report file
  // writeCSV(argv.report, errors);

  // Read using interactive prompts
  intro(`Lead Sync App`);

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

  if (isCancel(input) || isCancel(output) || isCancel(report)) {
    cancel("Operation cancelled.");
    process.exit(1);
  }

  outro(`You're all set!`);
}

await main();
