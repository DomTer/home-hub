const AWS = require("aws-sdk");
const express = require("express");
const serverless = require("serverless-http");

const app = express();

const TRANSACTIONS_GIRO = process.env.TRANSACTIONS_GIRO;
const TRANSACTIONS_CREDITCARD = process.env.TRANSACTIONS_CREDITCARD;
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

app.use(express.json());

app.get("/giro/transaction/:hash", async function (req, res) {
  const params = {
    TableName: TRANSACTIONS_GIRO,
    Key: {
      _hash: req.params.hash,
    },
  };

  try {
    const { Item } = await dynamoDbClient.get(params).promise();
    if (Item) {
      const {
        text: text,
        info: info,
        date: date,
        valuta: valuta,
        type: type,
        oppositeIban: oppositeIban,
        oppositeName: oppositeName,
        value: value,
        currency: currency,
        income: income,
        _raw: _raw,
        _hash: _hash,
      } = Item;
      res.json({
        text: text,
        info: info,
        date: date,
        valuta: valuta,
        type: type,
        oppositeIban: oppositeIban,
        oppositeName: oppositeName,
        value: value,
        currency: currency,
        income: income,
        _raw: _raw,
        _hash: _hash,
      });
    } else {
      res
        .status(404)
        .json({ error: 'Could not find transaction with provided "_hash"' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not retreive transaction" });
  }
});

app.post("/giro/transaction", async function (req, res) {
  const {
    text: text,
    info: info,
    date: date,
    valuta: valuta,
    type: type,
    oppositeIban: oppositeIban,
    oppositeName: oppositeName,
    value: value,
    currency: currency,
    income: income,
    _raw: _raw,
    _hash: _hash,
  } = req.body;

  const params = {
    TableName: TRANSACTIONS_GIRO,
    Item: {
      text: text,
      info: info,
      date: date,
      valuta: valuta,
      type: type,
      oppositeIban: oppositeIban,
      oppositeName: oppositeName,
      value: value,
      currency: currency,
      income: income,
      _raw: _raw,
      _hash: _hash,
    },
  };

  try {
    await dynamoDbClient.put(params).promise();
    res.json({
      text: text,
      info: info,
      date: date,
      valuta: valuta,
      type: type,
      oppositeIban: oppositeIban,
      oppositeName: oppositeName,
      value: value,
      currency: currency,
      income: income,
      _raw: _raw,
      _hash: _hash,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

//////// CREDITCARD /////////

app.get("/creditcard/transaction/:hash", async function (req, res) {
  const params = {
    TableName: TRANSACTIONS_CREDITCARD,
    Key: {
      _hash: req.params.hash,
    },
  };

  try {
    const { Item } = await dynamoDbClient.get(params).promise();
    if (Item) {
      const {
        text: text,
        text2: text2,
        bookingRef: bookingRef,
        date: date,
        valuta: valuta,
        exchangeRate: exchangeRate,
        value: value,
        currency: currency,
        income: income,
        _raw: _raw,
        _hash: _hash,
      } = Item;
      res.json({
        text: text,
        text2: text2,
        bookingRef: bookingRef,
        date: date,
        valuta: valuta,
        exchangeRate: exchangeRate,
        value: value,
        currency: currency,
        income: income,
        _raw: _raw,
        _hash: _hash,
      });
    } else {
      res
          .status(404)
          .json({ error: 'Could not find transaction with provided "_hash"' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not retreive transaction" });
  }
});

app.post("/creditcard/transaction", async function (req, res) {
  const {
    text: text,
    text2: text2,
    bookingRef: bookingRef,
    date: date,
    valuta: valuta,
    exchangeRate: exchangeRate,
    value: value,
    currency: currency,
    income: income,
    _raw: _raw,
    _hash: _hash,
  } = req.body;

  const params = {
    TableName: TRANSACTIONS_CREDITCARD,
    Item: {
      text: text,
      text2: text2,
      bookingRef: bookingRef,
      date: date,
      valuta: valuta,
      exchangeRate: exchangeRate,
      value: value,
      currency: currency,
      income: income,
      _raw: _raw,
      _hash: _hash,
    },
  };

  try {
    await dynamoDbClient.put(params).promise();
    res.json({
      text: text,
      text2: text2,
      bookingRef: bookingRef,
      date: date,
      valuta: valuta,
      exchangeRate: exchangeRate,
      value: value,
      currency: currency,
      income: income,
      _raw: _raw,
      _hash: _hash,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});


module.exports.handler = serverless(app);
