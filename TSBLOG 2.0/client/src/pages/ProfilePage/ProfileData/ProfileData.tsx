import React, {FC} from 'react';
import cls from './ProfileData.module.scss'
import {User} from "../../../redux/types/authTypes";
import {Card, Text} from "../../../components";

interface ProfileDataProps{
    user: User | null
}


const ProfileData:FC<ProfileDataProps> = ({user}) => {
    return (
        <Card padding={15}>
            <Text>Профиль</Text>

            <div className={cls.info}>
                <div className={cls.item}>
                    <Text as='span' size={16} fw={700}>Username: </Text>
                    <Text as='span' size={16} fw={500}>{user?.username}</Text>
                </div>
                <div className={cls.item}>
                    <Text as='span' size={16} fw={700}>Почта: </Text>
                    <Text as='span' size={16} fw={500}>{user?.email}</Text>
                </div>
                <div className={cls.item}>
                    <Text as='span' size={16} fw={700}>Сайт: </Text>
                    <Text as='span' size={16} fw={500}>{user?.website}</Text>
                </div>
                <div className={cls.item}>
                    <Text as='span' size={16} fw={700}>Описание: </Text>
                    <Text as='span' size={16} fw={500}>{user?.story}</Text>
                </div>
            </div>


        </Card>
    );
};

export default ProfileData;
