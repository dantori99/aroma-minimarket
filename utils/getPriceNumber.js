const getPriceNumber = (string) => {
  const result = string.replace(/\D/g, '');
  return result;
};

module.exports = getPriceNumber;