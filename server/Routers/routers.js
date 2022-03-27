const express = require("express");
const router = express.Router();

const ctrl = require('../Controllers/controller');

router.get('/', ctrl.active);
router.post('/sign-in', ctrl.signIn);

module.exports = router;
