const express = require("express");
const { asyncHandler } = require("../middlewares/handler/asyncHandler");
const BlacklistController = require("../controllers/whitelist.controller");

const router = express.Router();
const whitelistController = new BlacklistController();

router.get("/", asyncHandler(whitelistController.getAll));

router.post("/", asyncHandler(whitelistController.create));

router.delete("/:ip", asyncHandler(whitelistController.delete));

module.exports = router;
