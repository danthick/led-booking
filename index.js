const puppeteer = require('puppeteer');

(async function () {
    const browser = await puppeteer.launch({
        headless: false
    });

    const page = await browser.newPage();
    await page.goto('https://bookings.ledleisure.co.uk/mrmlogin.aspx');
    console.log('Page loaded');
    await page.click('#ctl00_MainContent_InputLogin');
    await page.type('#ctl00_MainContent_InputLogin', "N0077798", {delay: 1})
    await page.click('#ctl00_MainContent_InputPassword');
    await page.type('#ctl00_MainContent_InputPassword', "1125")
    await page.click('#ctl00_MainContent_btnLogin');
  })().catch( e => { console.error(e) })