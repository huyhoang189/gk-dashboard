const express = require("express");
const { asyncHandler } = require("../middlewares/handler/asyncHandler");
const controller = require("../controllers/user.controller");

const router = express.Router();

router.get("/", asyncHandler(controller.getAll));
router.post("/login", asyncHandler(controller.login));
router.post("/", asyncHandler(controller.create));
router.put("/", asyncHandler(controller.update));
router.delete("/:id", asyncHandler(controller.deleteItem));
module.exports = router;
