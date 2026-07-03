// Controleert het wachtwoord en zet een httpOnly-cookie voor een jaar.
// Het wachtwoord zelf staat in de Vercel-omgevingsvariabele WEDDING_PASSWORD.

const crypto = require('node:crypto');

module.exports = (req, res) => {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    return res.end('Method Not Allowed');
  }

  const wachtwoord = process.env.WEDDING_PASSWORD;
  if (!wachtwoord) {
    res.statusCode = 500;
    return res.end('WEDDING_PASSWORD is niet ingesteld op Vercel.');
  }

  const ingevuld = (req.body && req.body.wachtwoord ? String(req.body.wachtwoord) : '').trim();

  if (ingevuld.toLowerCase() !== wachtwoord.toLowerCase()) {
    res.statusCode = 303;
    res.setHeader('Location', '/login.html?fout=1');
    return res.end();
  }

  const token = crypto.createHash('sha256').update(wachtwoord).digest('hex');
  res.statusCode = 303;
  res.setHeader('Set-Cookie', `trouw_auth=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=31536000`);
  res.setHeader('Location', '/');
  res.end();
};
