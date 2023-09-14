import jwt from 'jsonwebtoken'
import UserModel from "../model/userModel.js";

export const auth = async (req, res, next) => {
    try{
        const token = req.headers.authorization


        if(!token) return res.status(400).json({message: 'Ошибка авторизации'})


        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN)


        if(!decoded)
            return res.status(400).json({message: 'Ошибка авторизации'})


        const user = await UserModel.findOne({_id: decoded._id})

        req.user = user

        next()
    }catch (err){
        return res.status(500).json({message: err.message})
    }
}