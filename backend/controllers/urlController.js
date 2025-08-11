const Url = require("../models/Url");
const { nanoid } = require("nanoid");
const validator = require("validator");

async function generateUniqueShortCode() {
  let code, exists;
  do {
    code = nanoid(6);
    exists = await Url.findOne({ short_code: code });
  } while (exists);
  return code;
}

exports.shorten = async (req, res) => {
  try {
    let { original_url } = req.body;
    if (!original_url)
      return res.status(400).json({ error: "original_url required" });

    // auto add protocol if missing
    if (!/^https?:\/\//i.test(original_url))
      original_url = "https://" + original_url;

    if (!validator.isURL(original_url, { require_protocol: true })) {
      return res.status(400).json({ error: "Invalid URL" });
    }

    const short_code = await generateUniqueShortCode();
    const doc = await Url.create({ original_url, short_code });
    return res.json({
      short_url: `${process.env.BASE_URL}/${short_code}`,
      short_code,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

exports.redirect = async (req, res) => {
  try {
    const { shortcode } = req.params;
    const url = await Url.findOne({ short_code: shortcode });
    if (!url) return res.status(404).send("Not found");
    url.visits = (url.visits || 0) + 1;
    await url.save();
    return res.redirect(url.original_url);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
};

exports.adminList = async (req, res) => {
  try {
    const token = req.headers["x-admin-token"];

    // Check if ADMIN_TOKEN is configured
    if (!process.env.ADMIN_TOKEN) {
      console.error("ADMIN_TOKEN not configured in environment variables");
      return res.status(500).json({ error: "Server configuration error" });
    }

    // Validate token
    if (!token || token !== process.env.ADMIN_TOKEN) {
      return res
        .status(401)
        .json({ error: "Unauthorized: Invalid admin token" });
    }

    const urls = await Url.find().sort({ createdAt: -1 });
    return res.json(urls);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};
