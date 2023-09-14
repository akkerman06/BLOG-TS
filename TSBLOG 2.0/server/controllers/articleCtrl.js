import ArticleModel from "../model/articleModel.js";


export const createArticle = async(req, res) => {
    try{
        const {title} = req.body

        const newArticle = await ArticleModel.create({
            ...req.body,
            user: req.user._id,
            title: title.toLowerCase()
        })


        res.json({
            message: 'Success',
            article: {...newArticle._doc}
        })

    }catch (err){
        console.log(err)
    }
}

export const getArticles = async(req, res) => {
    try{
        const articles = await ArticleModel.find()

        res.json({
            message: 'Success',
            articles
        })
    }catch (err){
        console.log(err)
    }
}

export const getArticle = async(req, res) => {
    try{
        const article = await ArticleModel.findById({_id: req.params.id}).populate("user", "username avatar")

        const articles = await ArticleModel.find({category: article.category}).limit(2)

        const newData = articles.filter((item) => item._id !== article._id)

        res.json({
            article,
            articles: newData
        })

    }catch (err){
        console.log(err)
    }
}


export const likePost = async(req ,res) => {
    try{
         await ArticleModel.findOneAndUpdate(
            {_id: req.params.id},
            {
                $push: {likes: req.user._id}
            }
        )
        res.json({
            message: 'Like Post'
        })
    }catch (err){
        console.log(err)
    }
}

export const unlikePost = async(req ,res) => {
    try{
        await ArticleModel.findOneAndUpdate(
            {_id: req.params.id},
            {
                $pull: {likes: req.user._id}
            }
        )
        res.json({
            message: 'Like Post'
        })
    }catch (err){
        console.log(err)
    }
}