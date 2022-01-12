// Insert 
const insertResult = (userInput, sortingResult, db) => {

  const queryString = `
  INSERT INTO to_do_lists (name, category_id)
  VALUES($1, $2);`;

  return db
    .query(queryString, [userInput, sortingResult])
    .then((data) => {
      console.log("this is the  special data y'all ---->", data);
      const message = `insert Result in app.js was succesful. This is what was added: ${data}`;
      console.log(message);
      return message;
    });
};

module.exports = {insertResult};
