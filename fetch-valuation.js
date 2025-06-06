
const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
  const { id } = req.query;
  const html = await axios.get(`https://www.tax.service.gov.uk/business-rates-find/valuations/start/${id}`).then(r => r.data);
  const $ = cheerio.load(html);
  const rateable_value = $('dt:contains("Rateable value")').next().text().trim();
  const description = $('dt:contains("Property description")').next().text().trim();
  const address = $('h1').text().trim();

  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({ address, description, rateable_value });
};
