/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./eshops/dedicatedbrand');
const montlimartbrand = require('./eshops/montlimartbrand');
const circlesportswearbrand = require('./eshops/circlesportswearbrand');
const fs = require('fs');

const dedicated_url = "https://www.dedicatedbrand.com/en/men/all-men";
const montlimart_url = "https://www.montlimart.com/99-vetements";
const circlesportswear_url = "https://shop.circlesportswear.com/collections/collection-femme";
const eshops = [dedicated_url,montlimart_url,circlesportswear_url];
const Brands = ["dedicated","montlimart","circlesportswear"];

// This function scrapes the data given the brand
async function ScrapeDataFromASpecificBrand(brand) {
  try {
    console.log(`🕵️‍♀️  browsing ${brand} eshop`);
    let products;
    if(brand=="dedicated"){
      products = await dedicatedbrand.scrape(eshops[0]);
    }

    else if (brand == "montlimart"){
      products = await montlimartbrand.scrape(eshops[1]);
    }

    else if (brand == "circlesportswear"){
      products = await circlesportswearbrand.scrape(eshops[2]);
    }
    console.log("done\n");
    return products;
  } catch (e) {
    console.error(e);
    return false;
  }
}

// This function ables to Save the data into a JSON file
async function SaveInJsonFile(data){
    fs.unlink('products.json', (err) => {                   // fs.unlink ables to remove the products.json file before writing new data
        if (err && err.code !== 'ENOENT') throw err; // ENOENT ables to ignore the error if the file doesn't exist
        fs.writeFile('products.json', data, (err) => {
            if (err) throw err;                                         // error statement is executed in case of an error when writing the file
            console.log('Products have been saved on a JSON file!');
        });
    });
}


// This function ables to scrape products from all brands and then store them in a JSON file
async function ScrapingProductsFromAllBrands() {
  let products = [];
  for (const brand of Brands) {
    const Products_scraped = await ScrapeDataFromASpecificBrand(brand);
    products = products.concat(Products_scraped);
  }

  console.log(products);
  const data = JSON.stringify(products, null, 1); // converts this into a JSON string
  SaveInJsonFile(data);
}

ScrapingProductsFromAllBrands();