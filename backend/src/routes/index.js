const express = require("express");
const pagination = require("../middlewares/validation/pagination");
const checkHealth = require("../middlewares/handler/checkHealth");
const blacklistRoute = require("./blacklist.router");
const whitelistRoute = require("./whitelist.router");
const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Check health for Server
 *     tags: [Default]
 *     responses:
 *       200:
 *         description:
 */

router.get("/", checkHealth);
router.use(pagination);
router.use("/blacklists", blacklistRoute);
router.use("/whitelists", whitelistRoute);
module.exports = router;
