
const axios = require('axios');
const cheerio = require('cheerio');
module.exports = async (req, res) => {
  const { postcode } = req.query;
  const searchUrl = `https://www.tax.service.gov.uk/business-rates-find/search?postcode=${encodeURIComponent(postcode)}`;
  const html = await axios.get(searchUrl).then(r => r.data);
  const $ = cheerio.load(html);
  const addresses = [];
  $('a.govuk-link').each((_, el) => {
    const href = $(el).attr('href');
    const text = $(el).text().trim();
    const match = href.match(/valuations\/start\/(\d+)/);
    if (match) {
      addresses.push({ id: match[1], address: text });
    }
  });
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(addresses);
};
