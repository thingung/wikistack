const express = require("express");
const  addPage  = require('../views/addPage');
const { Page } = require('../models');
const router = express.Router();


// GET /wiki/
router.get('/', (req, res, next) => {
  res.send('Hello');
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

    res.redirect('/');

  } catch (err) {
    next(err);
  }
});

// GET /wiki/add
router.get('/add', (req, res, next) => {
  res.send(addPage());
});

module.exports = router;
