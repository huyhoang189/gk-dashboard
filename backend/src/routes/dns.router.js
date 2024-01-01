const express = require("express");
const { asyncHandler } = require("../middlewares/handler/asyncHandler");
const controller = require("../controllers/dns.controller");

const router = express.Router();

router.get("/", asyncHandler(controller.getAll));

router.post("/", asyncHandler(controller.create));

router.put("/", asyncHandler(controller.update));

router.delete("/:ip", asyncHandler(controller.deleteItem));

module.exports = router;
