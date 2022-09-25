console.log(process.env.PORT);

module.exports = {
  // URI: "mongodb://localhost:27017/contacts_list",
  URI: process.env.URI,
  Secret: process.env.Secret,
  // URI: "mongodb://localhost:27017/portfolio",
};
