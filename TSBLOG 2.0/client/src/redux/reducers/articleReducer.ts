import {
    ADD_ARTICLE,
    ARTICLE_MESSAGE,
    ArticleActionType,
    ArticleSchema,
    GET_ARTICLE,
    GET_ARTICLES,
    UPDATE_ARTICLE
} from "../types/articleTypes";

const initialState: ArticleSchema = {
    articles: [],
    message: '',
    firstLoad: false,
    posts: [],
    similars: []
}



export const articleReducer = (state = initialState, action: ArticleActionType) => {
    switch (action.type){
        case ADD_ARTICLE:
            return {
                ...state,
                articles: [...state.articles, action.payload],
                message: 'Статья создана.'
            }

        case GET_ARTICLE:
            return {
                ...state,
                posts: [...state.posts, action.payload.article],
                similars: action.payload.articles
            }

        case UPDATE_ARTICLE:
            return {
                ...state,
                posts: state.posts.map((post) => (
                    post._id === action.payload?._id ? action.payload : post
                ))
            }

        case ARTICLE_MESSAGE:
            return {
                ...state,
                message: action.payload
            }

        case GET_ARTICLES:
            return {
                ...state,
                articles: action.payload,
                firstLoad: true
            }
        default:
            return state
    }
}

export default articleReducer