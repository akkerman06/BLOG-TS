import express from "express";
import {auth} from "../middleware/auth.js";
import {createArticle, getArticle, getArticles, likePost, unlikePost} from "../controllers/articleCtrl.js";



const router = express.Router()

router.post('/create', auth, createArticle)
router.get('/getArticles', auth, getArticles)
router.get('/article/:id', auth, getArticle)
router.patch('/article/:id/like', auth, likePost)
router.patch('/article/:id/unlike', auth, unlikePost)

export default router