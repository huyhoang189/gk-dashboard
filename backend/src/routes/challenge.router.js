const express = require("express");
const { asyncHandler } = require("../middlewares/handler/asyncHandler");
const controller = require("../controllers/challenge.controller");

const router = express.Router();

router.get("/", asyncHandler(controller.getAll));

module.exports = router;
