const express = require('express')
const router = express.Router()

import { CreateRoom } from "../controller/room"

router.route('/create').post(CreateRoom)

module.exports = router
