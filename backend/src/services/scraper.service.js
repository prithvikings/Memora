//backend/src/services/scraper.service.js
import * as cheerio from "cheerio";

export class ScraperService {
  static async scrapeUrl(url) {
    try {
      // 1. Fetch the raw HTML
      const response = await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        },
      });

      if (!response.ok)
        throw new Error(`Failed to fetch URL: ${response.status}`);
      const html = await response.text();

      // 2. Load into Cheerio for parsing
      const $ = cheerio.load(html);

      // 3. Extract Metadata
      const title =
        $("title").text() ||
        $('meta[property="og:title"]').attr("content") ||
        "";
      const description =
        $('meta[name="description"]').attr("content") ||
        $('meta[property="og:description"]').attr("content") ||
        "";
      const image = $('meta[property="og:image"]').attr("content") || "";

      // Try to find the favicon
      let favicon =
        $('link[rel="icon"]').attr("href") ||
        $('link[rel="shortcut icon"]').attr("href") ||
        "";
      if (favicon && !favicon.startsWith("http")) {
        const urlObj = new URL(url);
        favicon = `${urlObj.protocol}//${urlObj.host}${favicon.startsWith("/") ? "" : "/"}${favicon}`;
      }

      // 4. Extract Main Content (Basic clean up)
      // Remove noisy elements that confuse the AI
      $("script, style, nav, footer, header, aside, noscript, iframe").remove();

      // Grab text from the body, compress whitespace
      const rawText = $("body").text() || "";
      const content = rawText.replace(/\s+/g, " ").trim();

      return {
        title: title.trim(),
        description: description.trim(),
        image,
        favicon,
        content,
      };
    } catch (error) {
      console.error(`Scraping failed for ${url}:`, error.message);
      throw error;
    }
  }
}
