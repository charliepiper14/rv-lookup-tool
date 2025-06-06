
const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
  const { id } = req.query;
  const url = `https://www.tax.service.gov.uk/business-rates-find/valuations/start/${id}`;
  const html = await axios.get(url).then(r => r.data);
  const $ = cheerio.load(html);
  const rv = $('dt:contains("Rateable value")').next().text().trim();
  const description = $('dt:contains("Property description")').next().text().trim();
  const address = $('h1').first().text().trim();
  res.status(200).json({ address, description, rateable_value: rv });
};
