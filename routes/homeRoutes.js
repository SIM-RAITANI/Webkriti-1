const express = require("express");
const router = express.Router();
const postModel = require("../models/postModel");
const feedbackModel = require("../models/feedbackModel");
const isLoggedIn = require("../middlewares/isLoggedIn");

router.get("/about", function (req, res) {
  res.render("about");
});

router.get("/stories", async function (req, res) {
  let sampleSize = 4;
  const technology = await postModel.aggregate([
    { $match: { category: "Technology" } }, // Filter by category
    { $sample: { size: sampleSize } }, // Sample based on the calculated size
  ]);
  const science = await postModel.aggregate([
    { $match: { category: "Science" } }, // Filter by category
    { $sample: { size: sampleSize } }, // Sample based on the calculated size
  ]);
  const travel = await postModel.aggregate([
    { $match: { category: "Travel" } }, // Filter by category
    { $sample: { size: sampleSize } }, // Sample based on the calculated size
  ]);
  const beauty = await postModel.aggregate([
    { $match: { category: "Beauty" } }, // Filter by category
    { $sample: { size: sampleSize } }, // Sample based on the calculated size
  ]);
  const fashion = await postModel.aggregate([
    { $match: { category: "Fashion" } }, // Filter by category
    { $sample: { size: sampleSize } }, // Sample based on the calculated size
  ]);
  const sport = await postModel.aggregate([
    { $match: { category: "Sport" } }, // Filter by category
    { $sample: { size: sampleSize } }, // Sample based on the calculated size
  ]);
  const lifestyle = await postModel.aggregate([
    { $match: { category: "Lifestyle" } }, // Filter by category
    { $sample: { size: sampleSize } }, // Sample based on the calculated size
  ]);
  const others = await postModel.aggregate([
    { $match: { category: "Others" } }, // Filter by category
    { $sample: { size: sampleSize } }, // Sample based on the calculated size
  ]);
  const food = await postModel.aggregate([
    { $match: { category: "Food" } }, // Filter by category
    { $sample: { size: sampleSize } }, // Sample based on the calculated size
  ]);
  //   let food=await postModel.find({category:"Home"});
  //   let technology=await postModel.find({category:"Technology"});
  //   let science=await postModel.find({category:"Science"});
  //   let travel=await postModel.find({category:"Travel"});
  //   let beauty=await postModel.find({category:"Beauty"});
  //   let sport=await postModel.find({category:"Sport"});
  //   let fashion=await postModel.find({category:"Fashion"});
  //   let lifestyle=await postModel.find({category:"Lifestyle"});
  //   let others=await postModel.find({category:"Others"});

  res.render("stories", {
    food,
    technology,
    science,
    travel,
    beauty,
    sport,
    fashion,
    lifestyle,
    others,
  });
});

router.get("/view-all/:category", async function (req, res) {
  let category = req.params.category;
  console.log("category:", category);
  if (category === "technology") {
    category = "Technology";
  } else if (category === "food") {
    category = "Food";
  }
  let posts = await postModel.find({ category: category });
  res.render("view-all", { posts });
});

router.get("/feedback", function (req, res) {
  res.render("feedback", { msg: "" });
});
router.post("/feedback", isLoggedIn, async function (req, res) {
  try {
    let usermail = req.user.email;
    let email = req.body.email;
    let feed = req.body.feedback;
    let user = req.user._id;
    console.log(feed);

    if (usermail === email) {
      let feedback = await feedbackModel.create({
        user: user,
        feedback: feed,
      });
      res.redirect("/home");
    } else {
      res.render("feedback", {
        msg: "**Please enter your registered mail only**",
      });
    }
  } catch (error) {
    console.log(error);
  }
});
router.get("/search", isLoggedIn, function (req, res) {
  res.render("search");
});
router.get("/search-post", isLoggedIn, async function (req, res) {
  const query = req.query.query;
  try {
    const results = await postModel
      .find({
        $or: [
          { title: { $regex: query, $options: "i" } },
          { content: { $regex: query, $options: "i" } },
          { author: { $regex: query, $options: "i" } },
          { authorEmail: { $regex: query, $options: "i" } },
          { category: { $regex: query, $options: "i" } },
        ],
      })
      .limit(10); // Limit the number of results for autocomplete
    if (req.xhr) {
      // If the request is AJAX (for autocomplete), send JSON data
      return res.json(results);
    } else {
      // If the request is a full page request (form submission), render the search results
      return res.render("searchResults", { results, searchQuery:query });
    }
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
