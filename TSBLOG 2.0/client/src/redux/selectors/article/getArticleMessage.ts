import {StateSchema} from "../../store";


export const getArticleMessage = (state: StateSchema) => state.article.message || ''