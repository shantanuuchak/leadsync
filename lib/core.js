import * as v from "./validate.js";

// validateAndClean(data) -> [clean, errors]
export default function (records) {
  const clean = [];
  const errors = [];
  const companiesSet = new Set();

  for (let record of records) {
    const recordError = [];

    // Validate company name and check for duplicate
    if (
      !v.isCompanyName(record["Company Name"]) &&
      !record["Company Name"].trim()
    ) {
      recordError.push("Incorrect company name");
    } else if (companiesSet.has(record["Company Name"])) {
      recordError.push("Duplicate company name");
    }
    {
      companiesSet.add(record["Company Name"]);
    }

    // Validate Website URL
    if (!v.isURL(record["Website URL"])) {
      recordError.push("Incorrect website URL");
    }

    // Validate LinkedIn Profile URL
    if (!v.isLinkedInURL(record["LinkedIn Profile URL"])) {
      recordError.push("Incorrect LinkedIn URL");
    }

    // Validate Employee Size
    if (!v.isEmployeeSize(record["Employee Size"])) {
      recordError.push("Incorrect Employee Size");
    }

    if (recordError.length) {
      errors.push({ ...record, errors: recordError.join(" / ") });
    } else {
      clean.push(record);
    }
  }

  return [clean, errors];
}
