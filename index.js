const puppeteer = require('puppeteer');

(async function () {
    const browser = await puppeteer.launch({
        headless: false
    });

    // Open webpage
    const page = await browser.newPage();
    await page.goto('https://bookings.ledleisure.co.uk/mrmlogin.aspx');
    
    // Enter username
    await page.click('#ctl00_MainContent_InputLogin');
    await page.type('#ctl00_MainContent_InputLogin', "N0077798")

    // Enter password
    await page.click('#ctl00_MainContent_InputPassword');
    await page.type('#ctl00_MainContent_InputPassword', "1125")

    // Click login
    await page.click('#ctl00_MainContent_btnLogin');

    await page.click('#ctl00_MainContent__advanceSearchUserControl__lnkBtnSevenDaysTime');

  })().catch( e => { console.error(e) })