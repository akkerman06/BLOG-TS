import {FC, InputHTMLAttributes, useState} from 'react';
import cls from './Input.module.scss'
import {Text} from "../index";

interface InputProps extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>{
    error?: string,
    textarea?: boolean
}



const Input:FC<InputProps> = (
    {
        type='text',
        placeholder,
        value,
        name,
        onChange,
        error = '',
        textarea
    }) => {

    const [show, setShow] = useState<boolean>(false)

    const onShow = () => {
        setShow(!show)
    }

    return (
        <div className={cls.field}>
            {
                textarea
                    ? <textarea
                        className={cls.input}
                        placeholder={placeholder}
                        name={name}
                        value={value || ''}
                        onChange={onChange}
                        cols={30}
                        rows={10}
                    />
                    : <input
                        className={cls.input}
                        type={type === 'password' && show ? 'text' : type}
                        placeholder={placeholder}
                        name={name}
                        value={value || ''}
                        onChange={onChange}
                    />
            }


            {
                type === 'password' && <span onClick={onShow} className={cls.show}>
                {
                    show ? 'Скрыть' : 'Показать'
                }
            </span>
            }

            {error &&  <Text as='span' color='solid' size={12} fw={500} className={cls.error}>{error}</Text>}
        </div>
    );
};
export default Input;
