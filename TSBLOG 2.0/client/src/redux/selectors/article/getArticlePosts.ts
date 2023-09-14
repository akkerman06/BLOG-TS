import {StateSchema} from "../../store";


export const getArticlePosts = (state: StateSchema) => state.article.posts || []