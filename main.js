#!/usr/bin/env node
import { intro, spinner, log, outro } from "@clack/prompts";
import { readCSV, writeCSV } from "./lib/io.js";
import prompt from "./lib/prompt.js";
import core from "./lib/core.js";

// Starting the main application
async function main() {
  intro(`LeadSync App validate your LinkedIn leads CSV file.`);

  const s = spinner();

  const { input, output, report } = await prompt();

  s.start("Starting file validation...");

  const csvData = readCSV(input);
  const [clean, errors] = core(csvData.body);

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
