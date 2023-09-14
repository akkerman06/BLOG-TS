import React, {useEffect} from 'react';
import cls from './HomePage.module.scss'
import {ArticleCard, Text} from "../../components";
import {useAppDispatch} from "../../redux/store";
import {$api} from "../../api";
import {getArticles} from "../../redux/actions/articleAction";
import {useSelector} from "react-redux";
import {getArticlesData} from "../../redux/selectors/article/getArticlesData";
import {getArticleFirstLoad} from "../../redux/selectors/article/getArticleFirstLoad";
const HomePage = () => {
    const dispatch = useAppDispatch()
    const articles = useSelector(getArticlesData)
    const firstLoad = useSelector(getArticleFirstLoad)


    useEffect(() => {
        if(!firstLoad){
            dispatch(getArticles())
        }
    }, [dispatch]);



    return (
        <div className={cls.home}>
            <Text as='h1'>Blog</Text>

            <div className={cls.homeItems}>
                {
                    articles.length > 0 ? articles.map((article) => (
                        <ArticleCard
                            key={article._id}
                            id={article._id}
                            title={article.title}
                            content={article.content}
                            createdAt={article.createdAt}
                        />
                    ))
                        :
                        <Text>Статьей нет</Text>
                }

            </div>
        </div>
    );
};

export default HomePage;
