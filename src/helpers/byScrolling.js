
const dict = {};

function fetchOffers(dict) {
    
  const cardsNodeList = document.querySelectorAll("div.Asset--loaded");
  const cardsArray = Array.prototype.slice.call(cardsNodeList);
  cardsArray.forEach(card => {
    const floorPrice = _extractFloorPrice(card);
    const name = _extractName(card);
    const tokenId = _extractTokenId(card);
    const offerUrl = _extractOfferUrl(card);
    const displayImageUrl = _extractDisplayImageUrl(card);
    if (floorPrice && name &&  !displayImageUrl.includes("data:image/gif")) {
      const uniqIdentifier = `${name}_${tokenId || "unknownTokenId"}`;
      if( uniqIdentifier in dict){
        return dict
      }
      dict[uniqIdentifier] = {
        name: name,
        tokenId: tokenId,
        floorPrice: floorPrice,
        displayImageUrl: displayImageUrl,
        offerUrl: offerUrl,
      }
      return dict
    }
  });
}
function _extractName(card) {
  try {
    return card.innerText.split("\n")[0];
  } catch (err) {

  }
}
function _extractTokenId(card) {
  try {
    const href = card.querySelector(".Asset--anchor").getAttribute("href") || ""
    const tokenId = href.split("/").slice(-1).pop()
    return tokenId === "" ? undefined : Number(tokenId)
  } catch(Error) {
    return undefined
  }
}

function _extractOfferUrl(card) {
  try {
    const href = card.querySelector(".Asset--anchor").getAttribute("href")
    return href ? `https://opensea.io${href}` : undefined
  } catch(Error) {
    return undefined
  }
}
function _extractDisplayImageUrl(card) {
  try {
    return card.querySelector("div.AssetMedia--img").querySelector("img").currentSrc;
  } catch(err) {
    return undefined;
  }
}
function _extractFloorPrice(card) {
  try {
    floorPriceStr = card.innerText.split("\n")[1]
    if (floorPriceStr === "#") {
      floorPriceStr = card.innerText.split("\n")[3].replace(",",".")
    }
    const floorPrice = Number(floorPriceStr)
    return {
      amount: floorPrice,
    }
  } catch(err) {
    return undefined;
  }
}
