var unoconv = require("unoconv-promise");
function convert(file) {
  return unoconv.convert(file);
}

module.exports = convert;
