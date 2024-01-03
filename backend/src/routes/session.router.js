const express = require("express");
const { asyncHandler } = require("../middlewares/handler/asyncHandler");
const controller = require("../controllers/session.controller");

const router = express.Router();

router.get("/", asyncHandler(controller.getAll));
router.put("/", asyncHandler(controller.update));

module.exports = router;
