import {Dispatch} from "redux";
import {GlobalLoadingType, LOADING} from "../types/globalTypes";
import {uploadImage} from "../../utils/uploadImage";
import {$api} from "../../api";
import {
    ADD_ARTICLE, Article,
    ARTICLE_MESSAGE,
    ArticleAddFetch,
    ArticleAddType, ArticleDetailType,
    ArticleGetType,
    ArticleMessageType, ArticlesDetailFetch, ArticlesGetFetch, ArticleUpdateType, GET_ARTICLE,
    GET_ARTICLES, UPDATE_ARTICLE
} from "../types/articleTypes";
import {User} from "../types/authTypes";


export const createArticle = (data:any, image:any) => async(dispatch:Dispatch<GlobalLoadingType | ArticleAddType | ArticleMessageType>) => {
    let media: any = []

    try {
        dispatch({type: ARTICLE_MESSAGE, payload: ''})

        dispatch({type: LOADING, payload: true})

        if(image) media = await uploadImage([image])

        const res = await $api.post<ArticleAddFetch>('/create', {...data, image: media[0].url})

        dispatch({
            type: ADD_ARTICLE,
            payload: res.data.article
        })

        dispatch({type: LOADING,payload: false})

    }catch (err: any){
        dispatch({type: LOADING,payload: false})
    }
}



export const getArticles = () => async(dispatch: Dispatch<GlobalLoadingType | ArticleGetType>) => {
    try {

        dispatch({type: LOADING,payload: true})

        const res = await $api.get<ArticlesGetFetch>('getArticles')

        dispatch({
            type: GET_ARTICLES,
            payload: res.data.articles
        })

        dispatch({type: LOADING,payload: false})

    }catch (err: any){
        dispatch({type: LOADING,payload: false})
    }
}


export const getArticle = (id: string, posts: Article[]) => async(dispatch: Dispatch<GlobalLoadingType | ArticleDetailType>) => {

    if(posts.every((post) => post._id !== id)) {
        try {
            dispatch({type: LOADING,payload: true})

            const res = await $api.get<ArticlesDetailFetch>(`/article/${id}`)

            dispatch({
                type: GET_ARTICLE,
                payload: {
                    article: res.data.article,
                    articles: res.data.articles
                }
            })


            dispatch({type: LOADING,payload: false})

        }catch (err: any){
            dispatch({type: LOADING,payload: false})
        }
    }
}


export const likeArticle = (post: Article, auth: User | null ) => async(dispatch: Dispatch<ArticleUpdateType>) => {
    try {
        const newPost = {...post, likes: [...post.likes, auth?._id]}

        dispatch({
            type: UPDATE_ARTICLE,
            payload: newPost
        })

        const res = await $api.patch(`/article/${post._id}/like`)


        console.log(res)

    }catch (err: any){
        console.log(err)
    }
}

export const unlikeArticle = ( post: Article, auth: User | null) => async(dispatch: Dispatch<ArticleUpdateType>) => {
    try {
        const newPost = {
            ...post,
            likes: post.likes.filter((item) => item !== auth?._id)
        }

        dispatch({
            type: UPDATE_ARTICLE,
            payload: newPost
        })

        const res = await $api.patch(`/article/${post._id}/unlike`)

    }catch (err: any){
        console.log(err)
    }
}