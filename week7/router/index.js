const express = require("express");
const router = express.Router();

const indexCtrl = require("./index.ctrl");
//const article = require("./article");

router.get("/", indexCtrl.indexPage);
router.get("/articles/page/:pageNum(\\d+)", indexCtrl.listArticles); // 문자열 안받고 정수만 받음
router.get("/articles", indexCtrl.latestArticles);


//router.use("/article", article);

module.exports = router;