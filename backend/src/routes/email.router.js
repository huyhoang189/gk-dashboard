const express = require("express");
const { asyncHandler } = require("../middlewares/handler/asyncHandler");
const controller = require("../controllers/email.controller");

const router = express.Router();

router.get("/", asyncHandler(controller.getAll));
router.post("/", asyncHandler(controller.create));
router.delete("/:email", asyncHandler(controller.deleteItem));
module.exports = router;
