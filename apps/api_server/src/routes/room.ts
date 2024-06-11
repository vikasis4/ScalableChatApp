import { CreateRoom } from "../controller/room"

const express = require('express')
const router = express.Router()

router.route('/create').post(CreateRoom)

export default router
