import {StateSchema} from "../../store";


export  const getArticleFirstLoad = (state: StateSchema) => state.article.firstLoad || false