const puppeteer = require('puppeteer');
var page = null;

(async function () {
    const browser = await puppeteer.launch({
        headless: false
    });

    // Open webpage
    page = await browser.newPage();
    await page.goto('https://bookings.ledleisure.co.uk/mrmlogin.aspx');
    
    // Enter username
    await page.click('#ctl00_MainContent_InputLogin');
    await page.type('#ctl00_MainContent_InputLogin', "N0077798")

    // Enter password
    await page.click('#ctl00_MainContent_InputPassword');
    await page.type('#ctl00_MainContent_InputPassword', "1125")

    // Click login
    await page.click('#ctl00_MainContent_btnLogin');
    await page.waitFor(2000);

    // Click '7 days time'
    await page.click('#ctl00_MainContent__advanceSearchUserControl__lnkBtnSevenDaysTime', {timeout: 50000});

    await page.waitFor(2000);

    // Query parameters
    const exerciseClass = "Body Balance";
    const time = "10:30";
    var targetElements;

    targetElements = await page.evaluate(exerciseClass => {
        // Get all elements
        const elements = [...document.querySelectorAll('a')];

        // Filter to find elements with matching inner text
        var e = elements.filter(e => e.innerText.includes(exerciseClass));
        return e;

        // Make sure the element exists, and only then click it
        //targetElements && targetElements[0].click();
    }, exerciseClass)

    for (let element of targetElements) {
        console.log(element);
        // element.click();
        // await page.waitFor(2000);
        // page.goBack();
    }

})().catch( e => { console.error(e) })