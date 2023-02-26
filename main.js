const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const scrapper = async () => {
    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage()
    await page.goto('https://opensea.io/collection/proof-moonbirds')
    await page.waitForSelector('.fresnel-container', {hidden: false});
    // await page.addScriptTag({path: require.resolve("./helpers/byScrolling.js")});
    await page.evaluate(() => { document.querySelectorAll("div.Asset--loaded") });
    // document.querySelector('.AssetSearchView--results').children[1].children[0].children[0].click()
      
    offers = await _scrollAndFetchOffers(page, 20)
    // console.log(offers);
    const interval = setInterval( async () => {
      
      
      // clearInterval(interval);
      await page.evaluate(() => { window.scrollBy(0, -window.innerHeight); });
      // await page.evaluate(() => { document.querySelector('.AssetSearchView--results').children[1].children[0].children[0].click(); });
    },1000)
        // await browser.close()
        
    }
  
    
    scrapper()
    
    // async function _reScrap(page,val) {
    //   return await 
    // }
    
    async function _scrollAndFetchOffers(page, resultSize) {
      return await page.evaluate((resultSize) => new Promise((resolve) => {
        // keep in mind inside the browser context we have the global variable "dict" initialized
        // defined inside src/helpers/offersByScrollingHelperFunctions.js
        let currentScrollTop = -1;
        const interval = setInterval(() => {
          // document.querySelector('.AssetSearchView--results').children[1].children[0].children[0].click()
          window.scrollBy(0, 50);
          // fetchOffers is a function that is exposed through page.addScript() and
          // is defined inside src/helpers/offersByScrollingHelperFunctions.js
          fetchOffers(dict);
          
          const endOfPageReached = document.documentElement.scrollTop === currentScrollTop;
          const enoughItemsFetched = Object.keys(dict).length >= resultSize;
          
          if(!endOfPageReached && !enoughItemsFetched) {
            currentScrollTop = document.documentElement.scrollTop;
          // document.querySelector('.AssetSearchView--results').children[1].children[0].children[0].click()
          // window.scrollBy(0, -window.innerHeight);
          return;

        }
        clearInterval(interval);
        resolve(dict);
      }, 120);
    }), resultSize);
  }

  // async function _extractTotalOffers(page) {
  //   try {
  //     // set timeout to 1 sec, no need to extensively wait since page should be loaded already
  //     const element = await page.waitForSelector('.AssetSearchView--results-count', {timeout: 1000});
  //     const resultsText = await element.evaluate(el => el.textContent); // grab the textContent from the element, by evaluating this function in the browser context
  //     const dotsRemoved = resultsText.replace(/\./g,'');
  //     return Number(dotsRemoved.split(" ")[0]);
  //   } catch (err) {
  //     return undefined;
  //   }
  // }