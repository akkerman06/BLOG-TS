export const GET_ARTICLES = 'GET_ARTICLES'
export const ADD_ARTICLE = 'ADD_ARTICLE'
export const ARTICLE_MESSAGE = 'ARTICLE_MESSAGE'
export const GET_ARTICLE = 'GET_ARTICLE'
export const UPDATE_ARTICLE = 'UPDATE_ARTICLE'

export interface Article{
    category:string
    content:string
    createdAt:Date
    image:string
    likes:string[]
    title:string
    user:{
        _id: string,
        avatar: string,
        username: string
    }
    __v:number
    _id:string
}


export interface ArticleSchema{
    articles: Article[],
    message?: string,
    firstLoad?:boolean
    posts: Article[] ,
    similars: Article[]
}

export interface ArticleAddFetch {
    article: Article,
    message?: string
}

export interface ArticlesGetFetch {
    articles: Article[],
    message?: string
}

export interface ArticlesDetailFetch {
    article: Article,
    articles: Article[]
}


export interface ArticleMessageType {
    type: typeof ARTICLE_MESSAGE,
    payload: string
}

export interface ArticleUpdateType {
    type: typeof UPDATE_ARTICLE,
    payload: any
}

export interface ArticleGetType {
    type: typeof GET_ARTICLES,
    payload: Article[]
}

export interface ArticleAddType {
    type: typeof ADD_ARTICLE,
    payload: Article
}

export interface ArticleDetailType {
    type: typeof GET_ARTICLE,
    payload: {
        article: Article,
        articles: Article[]
    }
}

export type ArticleActionType = ArticleGetType | ArticleAddType | ArticleMessageType | ArticleDetailType | ArticleUpdateType