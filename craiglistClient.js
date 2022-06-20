const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

async function getListingOfCars() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  const listings = await scrapeListings(page);
  console.log("----->", listings);

  return listings;
}

async function scrapeListings(page) {
  await page.goto("https://sfbay.craigslist.org/search/cta?purveyor=owner");

  const html = await page.content();
  const $ = cheerio.load(html);

  const listings = $(".result-info")
    .map((index, element) => {
      const titleElement = $(element).find(".result-title");
      const title = $(titleElement).text();
      const url = $(titleElement).attr("href");
      const timeElement = $(element).find(".result-date");
      const datePosted = $(timeElement).attr("datetime");
      const hoodElement = $(element).find(".result-hood");
      const hood = $(hoodElement)
        .text()
        .trim()
        .replace("(", "")
        .replace(")", "");

      const priceElement = $(element).find(".result-price");
      const price = $(priceElement).text();

      return { title, url, datePosted, hood, price };
    })
    .get();
  return listings;
}

async function scrapeCarDescriptions(listings, page) {
  for (var i = 0; i < 5; i++) {
    await page.goto(listings[i].url);
    const html = await page.content();
    await sleep(1000);
  }
}

async function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

module.exports = { getListingOfCars };
