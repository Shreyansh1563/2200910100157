import Url from "../models/Url.js";
import { nanoid } from "nanoid";

export const createShortUrl = async (req, res) => {
  try {
    const { url, validity = 30, shortcode } = req.body;

    if (!url) {
      return res.status(400).json({ error: "Please provide a valid URL" });
    }

    let code = shortcode || nanoid(6);

    if (shortcode) {
      const exists = await Url.findOne({ shortCode: shortcode });
      if (exists) {
        code = nanoid(6);
      }
    }

    const expiryTime = new Date(Date.now() + validity * 60 * 1000);

    const created = await Url.create({
      longUrl: url,
      shortCode: code,
      expiry: expiryTime,
    });

    const shortUrl = `${process.env.BASE_URL}/${code}`;

    return res.status(201).json({
      shortUrl,
      expiresAt: expiryTime,
    });
  } catch (err) {
    console.error("Error creating short link:", err);
    return res.status(500).json({ error: "Unable to generate short URL" });
  }
};


export const redirectUrl = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await Url.findOne({ shortCode: id });

    if (!record) {
      return res.status(404).json({ error: "This short link does not exist" });
    }

    if (record.expiry < new Date()) {
      return res.status(410).json({ error: "This short link has expired" });
    }

    record.clicks += 1;
    await record.save();

    return res.redirect(record.longUrl);
  } catch (err) {
    console.error("Error redirecting:", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
