// backend/utils/validator.js

/**
 * validateFields(requiredFields, body)
 * 
 * Example:
 * validateFields(["title", "category"], req.body)
 */

function validateFields(required, body) {
  const missing = [];

  for (let field of required) {
    if (body[field] === undefined || body[field] === null || body[field] === "") {
      missing.push(field);
    }
  }

  return {
    ok: missing.length === 0,
    missing,
  };
}

module.exports = {
  validateFields,
};
