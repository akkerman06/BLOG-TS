import {createStore, combineReducers, applyMiddleware, AnyAction} from 'redux'
import thunk, {ThunkDispatch} from "redux-thunk";
import {composeWithDevTools} from 'redux-devtools-extension'
import authReducer from "./reducers/authReducer";
import {useDispatch} from 'react-redux'
import {AuthSchema} from './types/authTypes'
import globalReducer from "./reducers/globalReducer";
import {GlobalSchema} from "./types/globalTypes";
import articleReducer from "./reducers/articleReducer";
import {ArticleSchema} from "./types/articleTypes";


const rootReducers = combineReducers({
    auth: authReducer,
    global: globalReducer,
    article: articleReducer
})

export interface StateSchema {
    auth: AuthSchema,
    global: GlobalSchema,
    article: ArticleSchema
}

export const store = createStore(rootReducers, composeWithDevTools(applyMiddleware(thunk)))


type AppState = ReturnType<typeof rootReducers>

type TypedDispatch<T> = ThunkDispatch<T, any, AnyAction>

export const useAppDispatch = () => useDispatch<TypedDispatch<AppState>>()