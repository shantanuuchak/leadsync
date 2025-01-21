import axios from "axios";
import * as cheerio from "cheerio";

export const parse = async (url) => {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    const title = $("title").text();
    return title;
  } catch (error) {
    return "Website Not Reachable";
  }
};
