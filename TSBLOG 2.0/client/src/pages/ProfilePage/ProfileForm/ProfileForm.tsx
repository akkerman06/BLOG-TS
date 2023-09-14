import React, {ChangeEvent, FC, FormEvent, useState} from 'react';
import cls from './ProfileForm.module.scss'
import {User} from "../../../redux/types/authTypes";
import {Avatar, Button, Card, Input, Text} from "../../../components";
import {UpdateProfileStateData} from "../../../utils/typescript";
import {useAppDispatch} from "../../../redux/store";
import {updateProfile} from "../../../redux/actions/authAction";

interface ProfileFormProps{
    user: User | null
}

const ProfileForm: FC<ProfileFormProps> = ({user}) => {
    const [avatar, setAvatar] = useState<any>()
    const [userData, setUserData] = useState<UpdateProfileStateData>({
        username: '',
        email: '',
        website: '',
        story: '',
    })

    const dispatch = useAppDispatch()

    const handleAvatarChange = (e: any) => {
        const file = e.target.files[0]

        if (file) {
            setAvatar(file)
        }
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setUserData({...userData, [name]: value})
    }
    const clearAvatar = () => {
        setAvatar('')
    }


    const onSubmit = (e: FormEvent) => {
        e.preventDefault()
        dispatch(updateProfile(userData, avatar, user))
    }


    return (
        <Card padding={15} className={cls.card}>

            <Text>Изменить профиль</Text>

            <form noValidate className={cls.form} onSubmit={onSubmit}>
                <label htmlFor='file' className={cls.label}>
                    <Avatar src={avatar ? URL.createObjectURL(avatar) : user?.avatar || ''} size='big'
                            username={user?.username}/>
                    <input type="file" id='file' onChange={handleAvatarChange}/>

                    {
                        avatar && <span className={cls.close} onClick={clearAvatar}>&times;</span>
                    }
                </label>

                <Input placeholder='Username' name='username' value={userData.username} onChange={handleChange}/>
                <Input placeholder='Почта' name='email' value={userData.email} onChange={handleChange}/>
                <Input placeholder='Сайт' name='website' value={userData.website} onChange={handleChange}/>
                <Input placeholder='Описание' name='story' value={userData.story} textarea onChange={handleChange}/>

                <Button type='submit' max>Сохранить</Button>
            </form>
        </Card>
    );
};

export default ProfileForm;
