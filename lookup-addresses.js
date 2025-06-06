
const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
  const { postcode } = req.query;
  const url = `https://www.tax.service.gov.uk/business-rates-find/search?postcode=${encodeURIComponent(postcode)}`;
  const html = await axios.get(url).then(r => r.data);
  const $ = cheerio.load(html);
  const results = [];
  $('a.govuk-link').each((i, el) => {
    const href = $(el).attr('href');
    const match = href.match(/\/valuations\/start\/(\d+)/);
    if (match) {
      results.push({ id: match[1], address: $(el).text().trim() });
    }
  });
  res.status(200).json(results);
};
