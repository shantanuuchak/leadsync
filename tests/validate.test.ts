import { describe, expect, test } from "vitest";

import * as v from "../lib/validate.js";

// MARK: isURL
describe("Checking isURL", () => {
    test("Check for proper URL", () => {
        expect(v.isURL("https://google.com")).toBe(true);
    });

    test("Check for valid URL pattern", () => {
        expect(v.isURL("www.google.im")).toBe(true);
    });

    test("Checks for incomplete pattern", () => {
        expect(v.isURL("google")).toBe(false);
    });

    test("Checks for www", () => {
        expect(v.isURL("ww.google.com")).toBe(true);
    });

    test("Check for both http and www part", () => {
        expect(v.isURL("http://www.google.com")).toBe(true);
    });
});

// MARK: isEmail
describe("Checking isEmail", () => {
    test("Check for proper email", () => {
        expect(v.isEmail("hey@website.com")).toBe(true);
    });

    test("Check for NA", () => {
        expect(v.isEmail("NA")).toBe(true);
    });

    test("Check for wrong email", () => {
        expect(v.isEmail("hey@company")).toBe(false);
    });
});

// MARK: isEmployeeSize
describe("Checking isEmployeeSize", () => {
    test("Check for a number", () => {
        expect(v.isEmployeeSize("40")).toBe(true);
    });

    test("Check for a range", () => {
        expect(v.isEmployeeSize("10-500")).toBe(true);
    });

    test("Check for k & +", () => {
        expect(v.isEmployeeSize("10k+")).toBe(true);
    });

    test("Check for invalid suffix", () => {
        expect(v.isEmployeeSize("10lakh")).toBe(false);
    });

    test("Check for invalid operator", () => {
        expect(v.isEmployeeSize("10k-")).toBe(false);
    });
});

// MARK: isCompanyName
describe("Checking isCompanyName", () => {
    test("Check for a valid name", () => {
        expect(v.isCompanyName("e24")).toBe(true);
    });

    test("Check for a pure number", () => {
        expect(v.isCompanyName("10")).toBe(false);
    });

    test("Check for incorrect employee size pattern", () => {
        expect(v.isCompanyName("10-500")).toBe(false);
    });

    test("Check for a URL", () => {
        expect(v.isCompanyName("https://facebook.com")).toBe(false);
    });

    test("Check for alphabetical name", () => {
        expect(v.isCompanyName("Phleebs")).toBe(true);
    });
});