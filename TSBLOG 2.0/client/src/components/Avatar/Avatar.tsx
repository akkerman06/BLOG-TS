import React, {FC} from 'react';
import cls from './Avatar.module.scss'
import Text from '../Text/Text'

type AvatarSizezType = 'small' | 'middle' | 'big'
interface AvatarProps{
    size?: AvatarSizezType,
    src: string
    className?:string
    username?: string
}

const Avatar:FC<AvatarProps> = ({size = 'middle',src, className='', username}) => {

    const sizesClasses: Record<AvatarSizezType, string> = {
        small: cls.small,
        middle: cls.middle,
        big: cls.big
    }


    return (
        <div className={`${cls.avatar} ${sizesClasses[size]} ${className}`}>
            {
                src
                    ? <img src={src} alt="AvatarImage" />
                    : <Text as='span' size={16} fw={500}>
                        {username?.slice(0, 1)}
                    </Text>
            }
        </div>
    );
};


export default Avatar;
