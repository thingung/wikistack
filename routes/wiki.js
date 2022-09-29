const express = require("express");
const  addPage  = require('../views/addPage');
const wikipage = require('../views/wikipage');
const main = require('../views/main');
const { Op } = require("sequelize");
const { Page } = require('../models');
const router = express.Router();


// GET /wiki/
router.get('/', async (req, res, next) => {
  try {
   const page = await Page.findAll();
   res.send(main(page));
    // console.log(page);

  } catch(err) {
    next(err);
  }
});

// POST /wiki/
router.post('/', async (req, res, next) => {
  // console.log(req.body);
  // res.json((req.body));
  const page_info = req.body;

  try {
    const page = await Page.create({
      title: page_info.title,
      content: page_info.content,
      status: page_info.status
    })

    res.redirect(`/wiki/${page.slug}`);

  } catch (err) {
    next(err);
  }
});

// GET /wiki/add
router.get('/add', (req, res, next) => {
  res.send(addPage());
});

// GET /wiki/:slug
router.get('/:slug', async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug
      }
    });
    res.send(wikipage(page, ''));

  } catch(err) {
    next(err);
  }

});

module.exports = router;
