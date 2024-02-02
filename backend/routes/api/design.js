const express = require("express");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");
const { singlePublicFileUpload, singleMulterUpload } = require("../../awsS3")
const { Design } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

//Most CRUD for desings can be added later again prioritize time on the features we have planned for frontend

// get all premade designs
router.get("/", async (req, res) => {
  const designs = await Design.findAll({
    attributes: ["id", "design_url", "text_layers", "design_price"],
  });
  if (!designs) {
    return res.status(500).json({ error: "Designs not found bad request" });
  }
  return res.json({ Designs: designs });
});


router.get("/:designId", async (req, res) => {
  const designs = await Design.findOne({
    where: {
      id: req.params.designId,
    },
    attributes: ["id", "design_url", "text_layers", "design_price"],
  });
  if (!designs) {
    return res
      .status(404)
      .json({ message: "Design not found bad request", statusCode: 404 });
  }
  return res.json(designs);
});


//Create a premade design for admin
//includes aws upload
router.post("/",
singleMulterUpload("image"),
requireAuth, async (req, res) => {
  const { user } = req;

  if (user.admin) {
    // const { design_url, text_layers, design_price } = req.body;

    // if (!design_url || !text_layers || !design_price) {
    //   return res.json({
    //     message: "Validation Error",
    //     statusCode: 400,
    //     errors: {
    //       design_url: "Design url is required",
    //       text_layers: "Text layer is required",
    //       design_price: "Design price is required",
    //     },
    //   });
    // }

    // const newDesign = await Design.create({
    //   design_url: design_url,
    //   text_layers: text_layers,
    //   design_price: design_price,
    // });

    const { text_layers, design_price } = req.body;
    const designImageUrl = await singlePublicFileUpload(req.file);
    const newDesign = await Design.create({
      design_url: designImageUrl,
      text_layers: text_layers,
      design_price: design_price,
    });



    res.status = 201;
    res.json(newDesign);
  } else {
    return res.json({
      message: "Forbidden",
      statusCode: 403,
    });
  }
});

// Update a design
router.put("/:designId", requireAuth, async (req, res) => {
  const { user } = req;

  if (user.admin) {
    const design = await Design.findOne({
      where: { id: req.params.designId },
      attributes: ["id", "design_url", "text_layers", "design_price"],
    });

    if (!design) {
      res.status(404);
      return res.json({
        message: "Design couldn't be found",
        statusCode: 404,
      });
    }

    const { design_url, text_layers, design_price } = req.body;

    if (!design_url || !text_layers || !design_price) {
      return res.json({
        message: "Validation Error",
        statusCode: 400,
        errors: {
          design_url: "Design url is required",
          text_layers: "Text layer is required",
          design_price: "Design price is required",
        },
      });
    }

    design.design_url = design_url;
    design.text_layers = text_layers;
    design.design_price = design_price;

    await design.save();

    res.status = 200;
    res.json(design);
  } else {
    return res.json({
      message: "Forbidden",
      statusCode: 403,
    });
  }
});

// Delete a design
router.delete("/:designId", requireAuth, async (req, res) => {
  const { user } = req;

  if (user.admin) {
    let design = await Design.findOne({
      where: { id: req.params.designId },
      attributes: ["id", "design_url", "text_layers", "design_price"],
    });

    if (!design) {
      res.status(404);
      return res.json({
        message: "Design couldn't be found",
        statusCode: 404,
      });
    }

    await design.destroy()


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
