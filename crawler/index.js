const crawler = require('./crawler');
const payments = require('./payments');

crawler.insertGiroCsvToDatabase();
crawler.insertCreditcardCsvToDatabase();
crawler.crawlGiroAndInsertToDatabase();
crawler.crawlCreditcardAndInsertToDatabase();
payments.insertPayments();

