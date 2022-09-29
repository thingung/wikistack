const express = require("express");
const morgan = require("morgan");
const main = require('./views/main')
const { db, Page, User} = require('./models');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/users');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));



app.use('/wiki', wikiRouter);

db.authenticate()
  .then(() => {
    console.log('connected to the database');
  })

app.get("/", (req, res, next) => res.redirect('/wiki'));

const PORT = 3000;
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
