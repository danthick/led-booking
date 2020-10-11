const puppeteer = require('puppeteer');
const dotenv = require('dotenv').config();
var page = null;
var cardNo = ""

// Normalizing the text
function getText(linkText) {
    linkText = linkText.replace(/\r\n|\r/g, "\n");
    linkText = linkText.replace(/\ +/g, " ");
  
    // Replace &nbsp; with a space 
    var nbspPattern = new RegExp(String.fromCharCode(160), "g");
    return linkText.replace(nbspPattern, " ");
  }
  
  // find the link, by going over all links on the page
  async function findByLink(page, linkString) {
    const links = await page.$$('a')

    for (var i=0; i < links.length; i++) {
      let valueHandle = await links[i].getProperty('innerText');
      let linkText = await valueHandle.jsonValue();
      const text = getText(linkText);
      if (text.includes(linkString)) {
        console.log(linkString);
        console.log(text);
        console.log("Found");
        links[i].click()
        //return links[i];
      }
    }
    return null;
  }


(async function () {
    const browser = await puppeteer.launch({
        headless: false
    });

    // Open webpage
    page = await browser.newPage();
    await page.goto('https://bookings.ledleisure.co.uk/mrmlogin.aspx');
    
    // Enter username
    await page.click('#ctl00_MainContent_InputLogin');
    await page.type('#ctl00_MainContent_InputLogin', process.env.CARD_NO)

    // Enter password
    await page.click('#ctl00_MainContent_InputPassword');
    await page.type('#ctl00_MainContent_InputPassword', process.env.PASSCODE)

    // Click login
    await page.click('#ctl00_MainContent_btnLogin');
    await page.waitForTimeout(2000);

    // Click '7 days time'
    await page.click('#ctl00_MainContent__advanceSearchUserControl__lnkBtnSevenDaysTime', {timeout: 50000});

    await page.waitForTimeout(2000);

    // Query parameters
    const LedActivityID="lnkbutton-AdvancedSearchResultUserControl-ActivityID="
    const exerciseClass = "Studio Cycling";
    const time = "09:15";
    const activityID = "WESTCYCLE"


    //await findByLink(page, exerciseClass);
    //await page.waitForSelector('[data-qa-id*="lnkbutton-AdvancedSearchResultUserControl-ActivityID=WESTCYCLE5 ActivityType=Classes StatusClass=Full"]');
    const search = '[data-qa-id^="' + LedActivityID + activityID + '"'
    const spin = await page.$$(search)
    spin[0].click();

})().catch( e => { console.error(e) });