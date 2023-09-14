import React, {FC, useState} from 'react';
import cls from './ArticleCard.module.scss'
import {Link} from "react-router-dom";
import {Text} from "../";
import {sliceText} from "../../utils/sliceText";
import vector from '../../assets/Vector.svg'

interface ArticleCardProps{
    title: string,
    createdAt: Date,
    content: string,
    id: string
    scrollTop?: boolean
}

const ArticleCard:FC<ArticleCardProps> = ({title, content, createdAt, id, scrollTop}) => {
    const [isOpen , setIsOpen] = useState(false)


    const onScrollTop = () => {
        if(scrollTop){
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        }
    }
    const onOpen = (e : any ) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };

        return (
        <Link to={`/article/${id}`} className={cls.card} onClick={onScrollTop}>
            <Text className={cls.title} color='solid'>{sliceText(30, title)}</Text>
            <Text as='span' size={12} fw={500}>{createdAt.toString()}</Text>
            <Text as='p' size={16} fw={500}>{sliceText(100, content)}</Text>



        </Link>
    );
};

export default ArticleCard;
