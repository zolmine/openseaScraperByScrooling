const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const scrapper = async (slug, howManyOffers) => {
    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage()
    await page.goto(`https://opensea.io/collection/${slug}`)
    await page.waitForSelector('.fresnel-container', {hidden: false});

    await page.addScriptTag({path: require.resolve("../helpers/byScrolling.js")})
    return await _scrollAndFetchOffers(page, howManyOffers)
    }

    async function _scrollAndFetchOffers(page, howManyOffers) {
      return await page.evaluate((howManyOffers) => new Promise((resolve) => {
  
        window.scrollBy(0, 200);
        let currentScrollTop = -1;
        const interval = setInterval(() => {
          window.scrollBy(0, 50);
          // fetchOffers is a function that is exposed through page.addScript() and
          // is defined inside src/helpers/byScrolling.js
          fetchOffers(dict);
          
          const endOfPageReached = document.documentElement.scrollTop === currentScrollTop;
          const enoughItemsFetched = Object.keys(dict).length >= howManyOffers;
          
          if(!endOfPageReached && !enoughItemsFetched) {
            currentScrollTop = document.documentElement.scrollTop;
          return;

        }
        clearInterval(interval);
        resolve(dict);
      }, 120);
    }), howManyOffers);
  }

  module.exports = {
    scrapper
  }