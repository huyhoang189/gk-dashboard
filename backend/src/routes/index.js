const express = require("express");
const pagination = require("../middlewares/validation/pagination");
const checkHealth = require("../middlewares/handler/checkHealth");
const blacklistRoute = require("./blacklist.router");
const whitelistRoute = require("./whitelist.router");
const challengeRouter = require("./challenge.router");
const errorRouter = require("./error.router");
const successRouter = require("./success.router");
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
router.use("/challenges", challengeRouter);
router.use("/errors", errorRouter);
router.use("/successs", successRouter);
module.exports = router;
