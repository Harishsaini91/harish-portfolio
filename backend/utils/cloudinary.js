const cloudinary = require("cloudinary").v2;
const dns = require("dns");
const https = require("https");

// Force IPv4 DNS resolution globally for Cloudinary
dns.setDefaultResultOrder("ipv4first");

// Custom lookup to completely disable IPv6 lookups
function ipv4Lookup(hostname, options, callback) {
  return dns.lookup(hostname, { family: 4, all: false }, callback);
}

// HTTPS Agent that forces IPv4
const agent = new https.Agent({
  family: 4,
  lookup: ipv4Lookup
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
  http_agent: agent,
  https_agent: agent
});

module.exports = cloudinary;
 