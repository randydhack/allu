const express = require("express");
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { UserDesign } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

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

//Create a user design
router.post("/", requireAuth, async (req, res) => {
  const { user } = req;

  if (user) {
    const { img_url } = req.body;

    if (!img_url) {
      return res.json({
        message: "Validation Error",
        statusCode: 400,
        errors: {
          img_url: "Image url is required"
        },
      });
    }

    const newUserDesign = await UserDesign.create({
      img_url: img_url,
      userId: user.id
    });

    res.status = 201;
    res.json(newUserDesign);
  } else {
    return res.json({
      message: "Forbidden",
      statusCode: 403,
    });
  }
});

// Update a user design
router.put("/:userDesignId", requireAuth, async (req, res) => {
  const { user } = req;

  const userDesign = await UserDesign.findOne({
    where: {
      id: req.params.userDesignId,
    },
    attributes: ["id", "img_url", "userId"],
  });

  if (!userDesign) {
    res.status(404);
    return res.json({
      message: "Design couldn't be found",
      statusCode: 404,
    });
  }

  if (user && (user.id == userDesign.userId)) {

    const { img_url } = req.body;

    if (!img_url) {
      return res.json({
        message: "Validation Error",
        statusCode: 400,
        errors: {
          img_url: "Image url is required",
        },
      });
    }

    userDesign.img_url = img_url;
    userDesign.userId = user.id

    await userDesign.save();

    res.status = 200;
    res.json(userDesign);
  } else {
    return res.json({
      message: "Forbidden",
      statusCode: 403,
    });
  }
});

// Delete a user design
router.delete("/:userDesignId", requireAuth, async (req, res) => {
  const { user } = req;

  const userDesign = await UserDesign.findOne({
    where: { id: req.params.userDesignId },
    attributes: ["id", "img_url", "userId"],
  });

  if (!userDesign) {
    res.status(404);
    return res.json({
      message: "Design couldn't be found",
      statusCode: 404,
    });
  }

  if (user && (user.id == userDesign.userId)) {

    await userDesign.destroy()


    res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  } else {
    return res.json({
      message: "Forbidden",
      statusCode: 403,
    });
  }
});


module.exports = router;
