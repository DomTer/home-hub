const md5 = require('md5');
const kreditkarte = require('./kreditkarte');
const girokonto = require('./girokonto');
const {parseCsv} = require("./parse-csv");
const {Database} = require('./db')
const dayjs = require('dayjs')

const type = function (buchungstext) {
    if (buchungstext.match('LASTSCHRIFT')) {
        return 'Lastschrift'
    } else if (buchungstext.match('BARGELDAUSZAHLUNG')) {
        return 'Bargeldauszahlung'
    } else if (buchungstext.match('RATE/ANNUITAET')) {
        return 'Rateneinzug'
    } else if (buchungstext.match('ENTGELTABSCHLUSS')) {
        return 'Entgeldabschluss'
    } else if (buchungstext.match('DAUERAUFTRAG')) {
        return 'Dauerauftrag'
    } else if (buchungstext.match('KARTENZAHLUNG')) {
        return 'Kartenzahlung'
    } else if (buchungstext.match('UEBERW')) {
        return 'Überweisung'
    } else if (buchungstext.match('KREDITKARTENABRECHN')) {
        return 'Kreditkartenabrechnung'
    } else if (buchungstext.match('GEHALT')) {
        return 'Gehalt'
    } else {
        return 'Sonstige'
    }
}

const formatDate = function (string) {
    var euro_date = string;
    euro_date = euro_date.split('.');
    euro_date[2] = '20' + euro_date[2]
    var us_date = euro_date.reverse().join('-');
    return us_date
}

const csvRowToObjectGiro = function (row) {
    return {
        text: row.Verwendungszweck.replace(/\s\s+/g, ' ').trim(),
        info: row.Info.replace(/\s\s+/g, ' ').trim(),
        date: formatDate(row.Buchungstag),
        valuta: row.Valutadatum ? formatDate(row.Valutadatum) : formatDate(row.Buchungstag),
        type: type(row.Buchungstext),
        oppositeIban: row["Kontonummer/IBAN"],
        oppositeName: row["Beguenstigter/Zahlungspflichtiger"].replace(/\s\s+/g, ' ').trim(),
        value: Number(row.Betrag.replace(/([.])/g, '').replace(/([,])/g, '.')),
        currency: row.Waehrung,
        income: !row.Betrag.match(/([-])/g),
        raw: JSON.stringify(row),
        hash: md5(JSON.stringify(row)),
    }
}

const csvRowToObjectCreditcard = function (row) {
    return {
        text: row.Transaktionsbeschreibung.replace(/\s\s+/g, ' ').trim(),
        text2: row['Transaktionsbeschreibung Zusatz'].replace(/\s\s+/g, ' ').trim(),
        bookingRef: Number(row.Buchungsreferenz),
        date: formatDate(row.Belegdatum),
        valuta: row.Buchungsdatum ? formatDate(row.Buchungsdatum) : formatDate(row.Belegdatum),
        // originalValue: Number(row.Originalbetrag.replace(/([.])/g, '').replace(/([,])/g, '.')),
        // originalCurrency: row["Originalw\u00e4hrung"],
        exchangeRate: Number(row.Umrechnungskurs.replace(/([.])/g, '').replace(/([,])/g, '.')),
        value: Number(row.Buchungsbetrag.replace(/([.])/g, '').replace(/([,])/g, '.')),
        // currency: row["Buchungsw\u00e4hrung"],
        currency: 'EUR',
        income: !row.Buchungsbetrag.match(/([-])/g),
        raw: JSON.stringify(row),
        hash: md5(JSON.stringify(row)),
    }
}

const insertToTransactionsCreditcard = function (values) {
    let db = new Database();
    return db.query("INSERT IGNORE INTO transactions_creditcard (text, text2, bookingRef, date, valuta, exchangeRate, value, currency, income, raw, hash) VALUES ?",
        [values], function(err, result) {
        if (err) throw err;
        }).then(result => console.log("[DB] transactions_creditcard - Number of records inserted: " + result.affectedRows))
        .then(c => db.close());
}

const insertToTransactionsGiro = function (values) {
     let db = new Database();
     return db.query("INSERT IGNORE INTO transactions_giro (text, info, date, valuta, type, oppositeIban, oppositeName, value, currency, income, raw, hash) VALUES ?",
         [values], function (err, result) {
             if (err) throw err;
             return true;
          }).then(result => console.log("[DB] transactions_giro - Number of records inserted: " + result.affectedRows))
         .then(c => db.close());
}

const insertGiroCsvToDatabase = function () {
    return parseCsv('giro.CSV').then(rows => {
        return rows.map(row => csvRowToObjectGiro(row))
    }).then(res => {
        return insertToTransactionsGiro(
            res.map(r => {
                return Object.values(r)
            })
        )
    })
}

const insertCreditcardCsvToDatabase = function () {
    return parseCsv('creditcard.CSV').then(rows => {
        return rows.map(row => csvRowToObjectCreditcard(row))
    }).then(res => {
        return insertToTransactionsCreditcard(
            res.map(r => {
                return Object.values(r)
            })
        );
    }).catch(function (error) {
        console.log(error);
    });
}

const crawlGiroAndInsertToDatabase =  function () {
    girokonto.getData().then(function () {
        return parseCsv(false, './tmp/giro/')
    }).then(rows => {
        return rows.map(row => csvRowToObjectGiro(row))
    }).then(res => {
        return insertToTransactionsGiro(
            res.map(r => {
                return Object.values(r)
            })
        )
    }).catch(function (error) {
        console.log(error);
    })
}

const crawlCreditcardAndInsertToDatabase =  function () {
    kreditkarte.getData().then(function () {
        return parseCsv(false, './tmp/creditcard/')
    }).then(rows => {
        return rows.map(row => csvRowToObjectCreditcard(row))
    }).then(res => {
        return insertToTransactionsCreditcard(
            res.map(r => {
                return Object.values(r)
            })
        );
    }).catch(function (error) {
        console.log(error);
    });
}


insertGiroCsvToDatabase();
insertCreditcardCsvToDatabase();
crawlGiroAndInsertToDatabase();
crawlCreditcardAndInsertToDatabase();

