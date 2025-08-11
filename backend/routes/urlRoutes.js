const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/urlController");

router.post("/api/shorten", ctrl.shorten);
router.get("/api/admin", ctrl.adminList);

module.exports = router;
