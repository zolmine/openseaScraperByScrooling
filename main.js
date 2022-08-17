const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const scrapper = async () => {
    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage()
    await page.goto('https://opensea.io/collection/cool-cats-nft?search[sortAscending]=false&search[sortBy]=LISTING_DATE&search[toggles][0]=BUY_NOW')
    await page.waitForSelector('.cf-browser-verification', {hidden: true});
    await page.addScriptTag({path: require.resolve("./helpers/byScrolling.js")});
    let [offers, totalOffers] = await Promise.all([
        _scrollAndFetchOffers(page, 20),
        _extractTotalOffers(page),
      ]);
    
      console.log(offers, totalOffers);
}

scrapper()


async function _scrollAndFetchOffers(page, resultSize) {
    return await page.evaluate((resultSize) => new Promise((resolve) => {
      // keep in mind inside the browser context we have the global variable "dict" initialized
      // defined inside src/helpers/offersByScrollingHelperFunctions.js
      let currentScrollTop = -1;
      const interval = setInterval(() => {
        console.log("another scrol... dict.length = " + Object.keys(dict).length);
        window.scrollBy(0, 50);
        // fetchOffers is a function that is exposed through page.addScript() and
        // is defined inside src/helpers/offersByScrollingHelperFunctions.js
        var data = fetchOffers(dict);
        console.log(data);
  
        const endOfPageReached = document.documentElement.scrollTop === currentScrollTop;
        const enoughItemsFetched = Object.keys(dict).length >= resultSize;
  
        if(!endOfPageReached && !enoughItemsFetched) {
          currentScrollTop = document.documentElement.scrollTop;
          return;
        }
        clearInterval(interval);
        resolve(Object.values(dict));
      }, 120);
    }), resultSize);
  }

  async function _extractTotalOffers(page) {
    try {
      // set timeout to 1 sec, no need to extensively wait since page should be loaded already
      const element = await page.waitForSelector('.AssetSearchView--results-count', {timeout: 1000});
      const resultsText = await element.evaluate(el => el.textContent); // grab the textContent from the element, by evaluating this function in the browser context
      const dotsRemoved = resultsText.replace(/\./g,'');
      return Number(dotsRemoved.split(" ")[0]);
    } catch (err) {
      return undefined;
    }
  }