import {Route, Routes} from "react-router-dom";
import {AddArticlePage, DetailArticlePage, HomePage, LoginPage, ProfilePage, RegisterPage} from '../../pages'
import AppLayout from "../AppLayout/AppLayout";
import AuthLayout from "../AuthLayout/AuthLayout";



export const router = () => {
    return (
        <Routes>


            <Route element={<AuthLayout/>}>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/register' element={<RegisterPage/>}/>
            </Route>


            <Route element={<AppLayout/>}>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/addPost' element={<AddArticlePage/>}/>
                <Route path='/article/:id' element={<DetailArticlePage/>}/>
                <Route path='/profile' element={<ProfilePage/>}/>
            </Route>
        </Routes>
    )
}