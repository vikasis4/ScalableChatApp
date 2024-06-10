const express = require('express');
const router = express.Router();

import {HandleAuth, verifyToken} from "../controller/auth";

router.route('/handleAuth').post(HandleAuth)
router.route('/verifyToken').post(verifyToken)

module.exports = router