import React from 'react';
import cls from './ProfilePage.module.scss'
import ProfileForm from "./ProfileForm/ProfileForm";
import ProfileData from "./ProfileData/ProfileData";
import {useSelector} from "react-redux";
import {getAuthData} from "../../redux/selectors/auth/getAuthData";
const ProfilePage = () => {
    const user = useSelector(getAuthData)

    return (
        <div className={cls.profile}>
            <ProfileData user={user}/>
            <ProfileForm user={user}/>
        </div>
    );
};

export default ProfilePage;
