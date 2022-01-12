// Insert
const insertResult = (userInput, sortingResult, db) => {
  const queryString = `
  INSERT INTO to_do_lists (name, category_id)
  VALUES($1, $2);
  `;

  return db.query(queryString, [userInput, sortingResult]).then((data) => {
    console.log("this is the  special data y'all ---->", data);
    const message = `insert Result in app.js was succesful. This is what was added: ${data}`;
    console.log(message);
    return message;
  });
};

//Simple helper function that is fetching database information from toDo Lists
const fetchToDoProducts = function(db) {
  const queryString = `
  SELECT * FROM to_do_lists
  WHERE category_id = 2
  `;

  return db.query(queryString)
    .then((data) => {
      if (data) {
        return data.rows;
      }
    })
    .catch((error) => {
      console.log("Looks like we ran into an error:", error);
      return error;
    });
};

const fetchToDoBooks = function(db) {
  const queryString = `
  SELECT * FROM to_do_lists
  WHERE category_id = 1
  `;

  return db.query(queryString)
    .then((data) => {
      if (data) {
        return data.rows;
      }
    })
    .catch((error) => {
      console.log("Looks like we ran into an error:", error);
      return error;
    });
};

module.exports = { insertResult, fetchToDoProducts, fetchToDoBooks };
