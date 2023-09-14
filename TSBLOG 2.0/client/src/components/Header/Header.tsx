import cls from './Header.module.scss'
import {Button} from "../index";
import {useSelector} from "react-redux";
import {getAuthData} from "../../redux/selectors/auth/getAuthData";
import {useState} from "react";
import {Link} from "react-router-dom";
import {useAppDispatch} from "../../redux/store";
import {logout} from "../../redux/actions/authAction";


const Header = () => {
    const authData = useSelector(getAuthData)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const dispatch = useAppDispatch()

    const onOpen = () => {
        setIsOpen(!isOpen)
    }


    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <header className={cls.header}>
            <div className="container">
                <div className={cls.headerWrap}>
                    <Link to='/' className={cls.headerlogo}></Link>


                    {
                        authData ? <div className={cls.authData}>
                                <Button to='/addPost'>Добавить пост</Button>
                                <div onClick={onOpen} className={cls.dropDown}>
                                    {
                                        authData.avatar
                                            ? <img src={authData?.avatar} alt="" className={cls.avatar}/>
                                            : <div className={cls.avatar}>{authData.username.slice(0, 1)}</div>
                                    }

                                    {
                                        isOpen && <ul>
                                            <li>
                                                <Link to={`/profile`}>
                                                    Профиль
                                                </Link>
                                            </li>
                                            <li onClick={handleLogout}>Выход</li>
                                        </ul>
                                    }
                                </div>
                            </div>
                            :
                            <div className={cls.headerRight}>
                                <Button to='/login'>Войти</Button>
                                <Button to='/register' variant='outline'>Регистрация</Button>
                            </div>
                    }


                </div>
            </div>
        </header>
    );
};
export default Header