import React, {ButtonHTMLAttributes, FC, ReactNode} from 'react';
import cls from './Button.module.scss'
import {Link} from "react-router-dom";


type VariantType = 'outline' | 'default'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    children: ReactNode,
    to?: string
    variant?: VariantType
    className?: string
    max?: boolean
}
const Button:FC<ButtonProps> = (
    {
        children,
        to,
        type,
        onClick,
        variant='default',
        className= '',
        max = false
    }
) => {

    const variantClasses: Record<VariantType, string> = {
        outline: cls.outline,
        default: cls.default
    }




    return (
        <>
            {
                to
                    ? <Link to={to} className={`${cls.btn} ${max && cls.max} ${className} ${variantClasses[variant]}`}>{children}</Link>
                    : <button className={`${cls.btn} ${max && cls.max} ${className} ${variantClasses[variant]}`} type={type} onClick={onClick}>{children}</button>
            }
        </>
    );
};

export default Button;
