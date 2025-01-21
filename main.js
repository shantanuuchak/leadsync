import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
const argv = yargs(hideBin(process.argv)).argv;
const file = argv["input"];

console.log(file);
