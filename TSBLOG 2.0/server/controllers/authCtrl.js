import UserModel from "../model/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register = async(req, res) => {
    try{
        const {username, password} = req.body

        const user = await UserModel.findOne({username: username})

        if(user) return res.status(400).json({
            message: 'Пользователь с таким именем уже есть!'
        })

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = await UserModel.create({
            ...req.body, password: hashPassword
        })

        res.status(200).json({
            message: 'Success',
            newUser
        })

    }catch (err){
        console.log(err)
    }
}
export const login = async(req, res) => {
    try{
        const {username, password} = req.body

        const user = await UserModel.findOne({username})

        if(!user) return res.status(400).json({
            message: 'Пользователь с таким именем нет!'
        })

        const isCorrect = await bcrypt.compare(password, user.password)

        if(!isCorrect) return res.status(400).json({
            message: 'Неправильный пароль.'
        })

        const accessToken = jwt.sign(
            {_id: user._id},
            process.env.ACCESS_TOKEN,
            {
                expiresIn: '1d'
            }
        )

        const refreshToken = jwt.sign(
            {_id: user._id},
            process.env.REFRESH_TOKEN,
            {
                expiresIn: '10d'
            }
        )

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            path: '/api/refreshToken'
        })

        res.status(200).json({
            message: 'Success',
            user: {...user._doc, password: ''},
            accessToken
        })

    }catch (err){
        console.log(err)
    }
}

export const logout = async(req, res) => {
    res.clearCookie('refreshToken', {path: '/api/refreshToken'})
    res.status(200).json({message: 'Логаут'})
}

export const refreshToken = async (req, res) => {
    try {
        const rfToken = req.cookies.refreshToken
        if(!rfToken) return res.status(400).json({message: 'Пожалуйста войдите!'})

        jwt.verify(rfToken, process.env.REFRESH_TOKEN, async (err, result) => {
            console.log(result)

            if(err) return res.status(400).json({message: 'Пожалуйста войдите!'})


            const user = await UserModel.findOne({_id: result._id})


            if(!user) return res.status(400).json({message: 'Нет пользователя!'})

            const accessToken = jwt.sign(
                {_id: result._id},
                process.env.ACCESS_TOKEN,
                {
                    expiresIn: '1d'
                }
            )

            res.status(200).json({
                message: 'Success',
                user: {...user._doc, password: ''},
                accessToken
            })
        })
    }catch (err){
        return res.status(500).json({message: err.message})
    }

};


export const updateUser = async(req, res) => {
    try{
        await UserModel.findOneAndUpdate(
            {_id: req.user._id},
            {...req.body}
        )
        res.status(200).json({
            message: 'Success Update Profile.',
        })
    }catch (err){
        console.log(err)
    }
}