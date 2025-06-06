
import axios from 'axios';
import * as cheerio from 'cheerio';

export default async function handler(req, res) {
  const { postcode } = req.query;

  if (!postcode) {
    return res.status(400).json({ error: "Missing postcode" });
  }

  const searchUrl = `https://www.tax.service.gov.uk/business-rates-find/search?postcode=${encodeURIComponent(postcode)}`;

  try {
    const html = await axios.get(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Rateable Value Tool)'
      }
    }).then(r => r.data);

    const $ = cheerio.load(html);
    const results = [];

    $('a.govuk-link').each((i, el) => {
      const href = $(el).attr('href');
      const idMatch = href.match(/\/valuations\/start\/(\d+)/);
      if (idMatch) {
        results.push({ id: idMatch[1], address: $(el).text().trim() });
      }
    });

    return res.status(200).json(results);
  } catch (err) {
    console.error("Error fetching address list", err);
    return res.status(500).json({ error: "Scraping failed" });
  }
}
