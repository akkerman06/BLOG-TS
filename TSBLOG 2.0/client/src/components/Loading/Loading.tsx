import React from 'react';
import './loading.scss'
import {useSelector} from "react-redux";
import {getGlobalLoading} from "../../redux/selectors/global/getGlobalLoading";

const Loading = () => {
    const loading = useSelector(getGlobalLoading)

    if(loading){
       return <div className='global_loading'>
           <div className="lds-dual-ring"></div>
       </div>
    }

    return null
};

export default Loading;
