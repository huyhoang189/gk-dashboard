const express = require("express");
const { asyncHandler } = require("../middlewares/handler/asyncHandler");
const controller = require("../controllers/email-header.controller");

const router = express.Router();

router.get("/", asyncHandler(controller.getAll));
router.put("/", asyncHandler(controller.update));

module.exports = router;
