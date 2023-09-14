import React, {useEffect, useState} from 'react';
import cls from './DetailArticlePage.module.scss'
import {useParams} from "react-router-dom";
import {useAppDispatch} from "../../redux/store";
import {getArticle} from "../../redux/actions/articleAction";
import {useSelector} from "react-redux";
import {getArticlePosts} from "../../redux/selectors/article/getArticlePosts";
import {Article} from "../../redux/types/articleTypes";
import {ArticleCard, Avatar, FavoriteBtn, Text} from "../../components";
import Eyes from '../../assets/Eyes.svg'
import Like from '../../assets/Like.svg'
import {getArticleSimilars} from "../../redux/selectors/article/getArticleSimilars";



const DetailArticlePage = () => {
    const [article, setArticle] = useState<Article[]>()
    const {id} = useParams<{id: string}>()
    const dispatch = useAppDispatch()
    const posts = useSelector(getArticlePosts)
    const similars = useSelector(getArticleSimilars)


    useEffect(() => {
        if(id){
            dispatch(getArticle(id, posts))
        }
    },[id])


    useEffect(() => {
        if(id){
            const newData = posts.filter((post) => post._id === id)
            if(newData.length){
                setArticle(newData)
            }
        }
    }, [id, posts]);


    console.log(article)


    return (
        <>
            {
                article?.map((item) => (
                    <div className={cls.detail} key={item._id}>
                        <div className={cls.image}>
                            <img src={item.image} alt=""/>
                            <FavoriteBtn className={cls.favorite} post={item} />
                        </div>

                        <div className={cls.info}>
                            <Text>{item.title}</Text>
                            <Text as='span' size={12} fw={500}>{item.createdAt.toString()}</Text>
                            <Text as='p' size={16} fw={500}>{item.content}</Text>
                        </div>
                        <div className={cls.footer}>
                            <div className={cls.footerUser}>
                                <Avatar src={item.user.avatar} size='small' username={item.user.username}/>
                                <Text as='span' size={12} fw={700}>{item.user.username}</Text>
                            </div>

                            <div className={cls.footerIcons}>
                                <div>
                                    <img src={Like} alt=""/>
                                    <Text as='span' size={12} fw={500}>{item.likes.length}</Text>
                                </div>
                                <div>
                                    <img src={Eyes} alt=""/>
                                    <Text as='span' size={12} fw={500}>0</Text>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }


                <div className={cls.similar} >
                    {
                        similars.map((article) => (
                            <ArticleCard key={article._id} scrollTop title={article.title} createdAt={article.createdAt} content={article.content} id={article._id}/>
                        ))
                    }
                </div>

        </>
    );
};

export default DetailArticlePage;
