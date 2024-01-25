const express = require("express");
const router = express.Router();
// const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { UserDesign } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

//Most CRUD for userdesings can be added later again prioritize time on the features we have planned for frontend

//get all user
router.get("/", async (req, res) => {
  const userDesigns = await UserDesign.findAll({
    attributes: ["id", "img_url", "userId"],
  });
  if (!userDesigns) {
    return res.status(500).json({ error: "Designs not found bad request" });
  }
  return res.json({ UserDesigns: userDesigns });
});

//get a single premade design
router.get("/:userDesignId", async (req, res) => {
  const userDesigns = await UserDesign.findOne({
    where: {
      id: req.params.userDesignId,
    },
    attributes: ["id", "img_url", "userId"],
  });
  if (!userDesigns) {
    return res
      .status(404)
      .json({ message: "Design not found bad request", statusCode: 404 });
  }
  return res.json({ UserDesigns: userDesigns });
});

module.exports = router;
