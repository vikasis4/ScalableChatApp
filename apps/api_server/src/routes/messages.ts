const express = require('express');
const router = express.Router();

import { getMessages } from "../controller/messages";

router.route('/fetch/:roomId/:num').get(getMessages)


module.exports = router