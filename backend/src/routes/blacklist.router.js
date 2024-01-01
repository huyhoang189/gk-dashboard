const express = require("express");
const { asyncHandler } = require("../middlewares/handler/asyncHandler");
const BlacklistController = require("../controllers/blacklist.controller");

const router = express.Router();
const blacklistController = new BlacklistController();

router.get("/", asyncHandler(blacklistController.getAll));

router.post("/", asyncHandler(blacklistController.create));

router.delete("/:ip", asyncHandler(blacklistController.delete));

module.exports = router;
