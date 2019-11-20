const processQuery = require("../lib/dbPool").processQuery;

exports.indexPage = (req, res) => {
    res.render("index.ejs");
};
exports.listArticles = async (req, res) => {
    try{
        const pageNum = parseInt(req.params.pageNum);
        if(pageNum === 0) {
            res.sendStatus(404);
            return;
        }

        const articlesPerPage = 20;
        const sql = "select * from `article` where is_active=1 and is_deleted=0 order by pk desc";
        const result = await processQuery(sql);

        const articles = result.slice(articlesPerPage * (pageNum - 1), articlesPerPage * pageNum);
        res.render("articlesIndex.ejs", {
            page: pageNum,
            articles: articles,
            hasPrev: false,
            hasNext: false,
        });
    } catch (e) {
        throw e;
    }
};
exports.latestArticles = (req, res) => {
    res.redirect("/articles/page/1");
};
