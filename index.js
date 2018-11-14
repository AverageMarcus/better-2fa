require('dotenv').config();
const express = require('express');
const app = express();
const rateLimit = require("express-rate-limit");
const { encode } = require('@averagemarcus/sms-binary');
const port = process.env.PORT || 9000;

const codes = {};

const Nexmo = require('nexmo');
const n = require('nexmo/lib/index');
const nexmo = new Nexmo({
  apiKey: process.env.NEXMO_API_KEY,
  apiSecret: process.env.NEXMO_API_SECRET
});
n.initialize(process.env.NEXMO_API_KEY, process.env.NEXMO_API_SECRET, nexmo.options);

app.enable("trust proxy");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10
});

app.use(express.static('public'));

app.use(limiter);
app.get('/generate/:number', (req, res) => {
  const code = Math.random().toString().replace(/[^0-9]+/g, '').substr(1, 4);

  codes[req.params.number] = code;

  n.sendMessage({
    from: 'Better 2FA',
    to: parseInt(req.params.number, 10),
    type: 'binary',
    'protocol-id': '65',
    body: encode(`Your 2FA code is: ${code}`),
    udh: '050003CC0101'
  }, (err, resp) => {
    console.log('SMS sent', err, resp);
  });

  return res.json({ code });
});

app.get('/verify/:number/:code', (req, res) => {
  if (codes[req.params.number] === req.params.code) {
    n.sendMessage({
      from: 'Better 2FA',
      to: parseInt(req.params.number, 10),
      type: 'binary',
      'protocol-id': '65',
      body: encode('Code has been used'),
      udh: '050003CC0101'
    }, (err, resp) => {
      console.log('SMS sent', err, resp);
    });

    return res.status(200).json();
  } else {
    return res.status(400).json();
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
