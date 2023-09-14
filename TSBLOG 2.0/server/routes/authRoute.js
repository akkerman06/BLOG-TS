import express from "express";
import {login, logout, refreshToken, register, updateUser} from "../controllers/authCtrl.js";
import {auth} from "../middleware/auth.js";


const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/refreshToken', refreshToken)
router.get('/logout', logout)
router.patch('/updateUser', auth, updateUser)

export default router