// backend/utils/deleteCloudinary.js

const cloudinary = require("./cloudinary");

/**
 * deleteFromCloudinary
 * Deletes file (image/video) by public_id
 */

async function deleteFromCloudinary(publicId, resourceType = "image") {
  if (!publicId) return;

  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });

    return result;
  } catch (err) {
    console.error("Cloudinary delete error:", err.message);
    return null;
  }
}

module.exports = deleteFromCloudinary;
