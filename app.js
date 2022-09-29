const express = require("express");
const morgan = require("morgan");
const main = require('./views/main')
const app = express();
const { db,Page,User} = require('./models');

app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));

db.authenticate()
  .then(() => {
    console.log('connected to the database');
  })

app.get("/", (req, res) => {
  res.send(main(''));
});

const PORT = 1337;
const init = async () => {
  await db.sync({force: true})
  // await Page.sync();
  // await User.sync();
  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  })
};

init();


// async function wiki(){
// await db.sync()
// console.log('connected to server')
// }
// wiki();

// const db = new Sequelize('postgres://localhost:5432/wikistack', {
//     logging: false
// });