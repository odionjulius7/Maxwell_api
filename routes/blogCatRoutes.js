const {
  postTestimony,
  getTestimony,
  getATestimony,
  // updateABlogCat,
  // deleteABlogCat,
} = require("../controllers/blogCatCtrl");
// const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const blogCatRouter = require("express").Router();

blogCatRouter.post("/", postTestimony);
blogCatRouter.get("/all", getTestimony);
blogCatRouter.get("/:id", getATestimony);
// blogCatRouter.put("/:id", updateABlogCat);
// blogCatRouter.delete("/:id", deleteABlogCat);

module.exports = blogCatRouter;
