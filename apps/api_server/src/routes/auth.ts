const express = require('express');
const router = express.Router();

import {HandleAuth, verifyToken, getUser} from "../controller/auth";

router.route('/handleAuth').post(HandleAuth)
router.route('/verifyToken/:token').get(verifyToken)
router.route('/finduser/:email').get(verifyToken)

module.exports = router