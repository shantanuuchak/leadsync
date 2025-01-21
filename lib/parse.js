import axios from "axios";
import * as cheerio from "cheerio";

export const parse = async (url) => {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    const title = $("#ember33").text();
    return { info: title };
  } catch (error) {
    return { error: "Website Not Reachable" };
  }
};
