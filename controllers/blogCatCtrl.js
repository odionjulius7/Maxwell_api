const asyncHandler = require("express-async-handler");
const Testimony = require("../models/blogCatModel");
const { validateMongoDBId } = require("../config/validateMongoDBId");
const { default: slugify } = require("slugify");

const postTestimony = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    }
    const postTestimony = await Testimony.create(req.body);
    res.status(200).json({
      status: true,
      message: "Testimony created successfully!",
      postTestimony,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getTestimony = asyncHandler(async (req, res) => {
  try {
    const getTestimony = await Testimony.find();
    res.status(200).json({
      status: true,
      message: "All Testimonies Fetched Successfully!..",
      getTestimony,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getATestimony = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDBId(id);
  try {
    const getATestimony = await Testimony.findById(id);
    res.status(200).json({
      status: true,
      message: "Testimony Found!",
      getATestimony,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// const deleteABlogCat = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   validateMongoDBId(id);
//   try {
//     const deleteBlogCat = await BlogCat.findByIdAndDelete(id);
//     res.status(200).json({
//       status: true,
//       message: "Blog Category deleted!",
//       deleteBlogCat,
//     });
//   } catch (error) {
//     throw new Error(error);
//   }
// });

// const updateABlogCat = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   validateMongoDBId(id);
//   try {
//     if (req.body.title) {
//       req.body.slug = slugify(req.body.title.toLowerCase());
//     }
//     const updateBlogCat = await BlogCat.findByIdAndUpdate(id, req.body, {
//       new: true,
//     });
//     res.status(200).json({
//       status: true,
//       message: "Blog Category updated!",
//       updateBlogCat,
//     });
//   } catch (error) {
//     throw new Error(error);
//   }
// });

module.exports = {
  postTestimony,
  getTestimony,
  getATestimony,
  // deleteABlogCat,
  // updateABlogCat,
};
