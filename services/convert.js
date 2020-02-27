var unoconv = require("unoconv-promise");
function convert(file) {
  return unoconv.convert(file, { timeout: 120 });
}

module.exports = convert;
