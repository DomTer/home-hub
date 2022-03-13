require("dotenv").config();
const puppeteer = require('puppeteer');
const moment    = require('moment');


const downloadPath = './tmp/creditcard/';
const delay = seconds => {
    return new Promise (
        resolve => setTimeout (resolve, seconds * 1000)
    )
};

const getData = function () {
    console.log('[Crawler] Start Crawling Creditcard...');
    return (async () => {
        const browser = await puppeteer.launch({
            ignoreDefaultArgs: ['--disable-extensions'],
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
            ]
        });
        const   page = await browser.newPage();
        await   page.goto('https://www.sparkasse-neuss.de/');
        const   userInput = await page.$('.header-login input[maxlength="16"]');
        await   userInput.type(process.env.SPK_USER);
        const   passInput = await page.$('.header-login input[type="password"]');
        await   passInput.type(process.env.SPK_PASS);
        await   passInput.press('Enter');
        await   page.waitForSelector('table[aria-label="Finanzstatus"]', { visible: true, timeout: 3000 });

        await   page.goto('https://www.sparkasse-neuss.de/de/home/onlinebanking/umsaetze/umsaetze.html');
        await   page.waitForSelector('.bselect-list div', { visible: true, timeout: 3000 });
        const   accountSelect = await page.$('.bselect-list div');
        await   accountSelect.click({button: "left"});

        // Konto Auswahl
        const   accounts = await page.$$('ul.select-modified li');
        await   accounts[4].click({button: "left"});

        // Buchungzeitraum
        const   fromDate = moment().subtract(1, 'month').format('DD.MM.YYYY');
        const   today    = moment().format('DD.MM.YYYY');
        await page.evaluate((fromDate, today) => {
            let dateInputs = document.querySelectorAll('input[placeholder="TT.MM.JJJJ"]');
            dateInputs[0].value = fromDate;
            dateInputs[1].value = today;
        }, fromDate, today);
        const   submitAccounts = await page.$('input[title="Weiter"]');
        await   submitAccounts.click({button: "left"});

        // Kontostand
        await   page.waitForSelector('span.balance-decimal', { visible: true, timeout: 3000 });


        // CSV Dowload
        await page._client.send('Page.setDownloadBehavior', {behavior: 'allow', downloadPath});

        const   exportButton = await page.$('a.ficon.icon-b_download');
        await   exportButton.click({button: "left"});

        await   page.waitForSelector('input[value="CSV-Format"]', { visible: true, timeout: 3000 });
        const   csvButton = await page.$('input[value="CSV-Format"]');
        await   csvButton.click({button: "left"});

        await delay(3)


        await browser.close();
    })().catch(e => console.log('Crawling Creditcard Failed!', e)).then(function () {
        console.log('[Crawler] Creditcard successfully crawled!');
    })
}

module.exports = {
    getData,
};
