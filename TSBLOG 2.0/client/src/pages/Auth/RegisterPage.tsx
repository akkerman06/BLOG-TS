import React, {ChangeEvent, FormEvent, useState} from 'react';
import cls from './auth.module.scss'
import {Button, Card, Input, Text} from "../../components";
import {AuthStateUserData} from "../../utils/typescript";
import {validAuthData} from "../../utils/valid";
import axios from 'axios'
import {useAppDispatch} from "../../redux/store";
import {register} from "../../redux/actions/authAction";
import {useNavigate} from "react-router-dom";

const RegisterPage = () => {
    const [userData, setUserData] = useState<AuthStateUserData>({
        "username": '',
        'password': '',
        'cf_password': ''
    })

    const [errors, setErrors] = useState<AuthStateUserData>({
        username: '',
        password: '',
        cf_password: ''
    })

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserData({...userData, [e.target.name]: e.target.value})
    }

    const onSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const errors: any = validAuthData(userData)

        if(errors.status !== 200){
            return setErrors(errors)
        }

        delete userData.cf_password

        dispatch(register(userData, navigate))

    }


    return (
        <div className={cls.auth}>
            <Card className={cls.authCard}>
                <Text>Регистрация</Text>

                <form noValidate onSubmit={onSubmit} className={cls.authForm}>
                    <Input
                        placeholder='Username'
                        name='username'
                        onChange={handleChange}
                        value={userData.username}
                        error={errors.username}
                    />
                    <Input
                        type='password'
                        placeholder='Password'
                        name='password'
                        onChange={handleChange}
                        value={userData.password}
                        error={errors.password}
                    />
                    <Input
                        type='password'
                        placeholder='Confirm Password'
                        name='cf_password'
                        onChange={handleChange}
                        value={userData.cf_password}
                        error={errors.cf_password ? errors.cf_password : ''}
                    />
                    <Button max type='submit'>Регистрация</Button>
                </form>
            </Card>
        </div>
    );
};

export default RegisterPage;
