// special Object is used to conditionally sort APIs results

const specialObject = {
  Book: 1,
  AdministrativeDivision: 2,
  Movie: 3,
  Financial: 4,
};
//helper function that uses specialObject to determine what table the apiInput
//should be placed into
const tableSorter = function (apiInput) {
  const specialKey = sortingProducts(apiInput);
  return specialObject[specialKey];
};

const sortingProducts = function (inputString) {
//   if(inputString.includes('%20')) {
//   inputString.split('%20').join(' ')
// }
  return inputString.split(" ")[0];
};

module.exports = { tableSorter };
