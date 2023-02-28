const DeltaOpenseaScraper = require("./src")

// which nft project to scrape?
const slug = "cool-cats-nft";

// how many offers uu want 
const resultSize = 40; 

(async () => {
    const offers =  await DeltaOpenseaScraper.scrapper(slug, resultSize)

    console.log(offers)
})();

