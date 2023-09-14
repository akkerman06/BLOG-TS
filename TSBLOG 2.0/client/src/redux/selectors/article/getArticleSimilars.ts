import {StateSchema} from "../../store";


export const getArticleSimilars = (state: StateSchema) => state.article.similars || []