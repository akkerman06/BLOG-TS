import React, {ChangeEvent, FormEvent, useState} from 'react';
import cls from './auth.module.scss'
import {Button, Card, Input, Text} from "../../components";
import {AuthStateUserData} from "../../utils/typescript";
import {validAuthData} from "../../utils/valid";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/actions/authAction";
import {StateSchema, useAppDispatch} from "../../redux/store";
import {getAuthError} from "../../redux/selectors/auth/getAuthError";
const LoginPage = () => {
    const [userData, setUserData] = useState<AuthStateUserData>({
        username: '',
        password: '',
    })

    const [errors, setErrors] = useState<AuthStateUserData>({
        username: '',
        password: '',
        cf_password: ''
    })

    const dispatch = useAppDispatch()
    const authError = useSelector(getAuthError)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserData({...userData, [e.target.name]: e.target.value})
    }

    const onSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const errors: any = validAuthData(userData)

        if(errors.status !== 200){
            return setErrors(errors)
        }

        dispatch(login(userData))
    }

    return (
        <div className={cls.auth}>
            <Card className={cls.authCard}>
                <Text>Войти</Text>
                {authError && <Text as='span' size={12} fw={500} color='solid' >{authError}</Text>}
                <form noValidate className={cls.authForm} onSubmit={onSubmit}>
                    <Input
                        placeholder='Username'
                        name='username'
                        onChange={handleChange}
                        value={userData.username}
                        error={errors.username}
                    />
                    <Input
                        type='password'
                        name='password'
                        onChange={handleChange}
                        error={errors.password}
                        value={userData.password}
                        placeholder='Password'
                    />
                    <Button max type='submit'>Войти</Button>
                </form>
            </Card>
        </div>
    );
};

export default LoginPage;
