const Sequelize = require("sequelize");
const db = new Sequelize("postgres://localhost:5432/wikistack", {logging: false});

function generateSlug (title) {
  // Removes all non-alphanumeric characters from title
  // And make whitespace underscore
  return title.replace(/\s+/g, '_').replace(/\W/g, '');
}

const Page = db.define("page", {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
    unique:true,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM("OPEN", "CLOSED"),
  },
});

const User = db.define("user", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique:true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique:true,
    validate:{isEmail: true}
  },
});

Page.addHook('beforeValidate', (user, options) => {
  user.slug = generateSlug(user.title);
});

module.exports = {
  db,
  Page,
  User
};
