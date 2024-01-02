const express = require("express");
const pagination = require("../middlewares/validation/pagination");
const checkHealth = require("../middlewares/handler/checkHealth");
const blacklistRoute = require("./blacklist.router");
const whitelistRoute = require("./whitelist.router");
const challengeRouter = require("./challenge.router");
const errorRouter = require("./error.router");
const successRouter = require("./success.router");
const configRouter = require("./config.router");
const thresholdRouter = require("./threshold.router");
const dnsRouter = require("./dns.router");
const emailRouter = require("./email.router");
const databaseRouter = require("./database.router");
const backupRouter = require("./backup.router");
const roleRouter = require("./role.router");
const userRouter = require("./user.router");
const departmentRouter = require("./department.router");

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
router.use("/configs", configRouter);
router.use("/thresholds", thresholdRouter);
router.use("/dnss", dnsRouter);
router.use("/emails", emailRouter);
router.use("/databases", databaseRouter);
router.use("/backups", backupRouter);
router.use("/roles", roleRouter);
router.use("/users", userRouter);
router.use("/departments", departmentRouter);
module.exports = router;
