// special Object is used to conditionally sort APIs results

const specialObject = {
  Book: 1,
  AdministrativeDivision: 2,
  Movie: 3,
  Financial: 4,
};

const tableSorter = function (apiInput) {
  const specialKey = sortingProducts(apiInput);
  return specialObject[specialKey];
};

const sortingProducts = function (inputString) {
  return inputString.split(",")[0];
};

module.exports = { tableSorter };
