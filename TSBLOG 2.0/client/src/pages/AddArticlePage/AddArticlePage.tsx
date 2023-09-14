import React, {ChangeEvent, FormEvent, useState} from 'react';
import cls from './AddArticlePage.module.scss'
import {Button, Card, Input, Text} from "../../components";
import {useAppDispatch} from "../../redux/store";
import {createArticle} from "../../redux/actions/articleAction";
import {useSelector} from "react-redux";
import {getArticleMessage} from "../../redux/selectors/article/getArticleMessage";
const AddArticlePage = () => {
    const [file, setFile] = useState<File | null>(null)
    const [data, setData] = useState({
        title: '',
        category: '',
        content: ''
    })

    const dispatch = useAppDispatch()
    const successMessage = useSelector(getArticleMessage)

    const handleChangeFile = (e: ChangeEvent) => {
        const target:any = e.target as HTMLInputElement
        const file:File = target.files[0]
        if(file){
            setFile(file)
        }
    }

    const handleChange = (e: any) => {
        const {name, value} = e.target
        setData({...data, [name]: value})
    }


    const onSumbit = async (e: FormEvent) => {
        e.preventDefault()

        await dispatch(createArticle(data, file))

        setData({
            title: '',
            category: '',
            content: ''
        })
        setFile(null)
    }

    return (
        <Card padding={20}>
            <Text>Добавить Пост</Text>
            {
                successMessage && <Text size={16} color='solid'>{successMessage}</Text>
            }


            <form noValidate className={cls.addForm} onSubmit={onSumbit}>
                <label htmlFor="file" className={cls.fileLabel}>
                    <input type="file" id='file' onChange={handleChangeFile}/>
                    <span className={cls.fileText}>Выберите файл</span>
                </label>

                {
                    file && <img className={cls.image} src={URL.createObjectURL(file)} alt=""/>
                }
                <Input placeholder='Введите название поста' name='title' value={data.title} onChange={handleChange} />


                <select name="category" id="" className={cls.select} value={data.category} onChange={handleChange}>
                    <option value="">Выберите категорию</option>
                    <option value="React">React</option>
                    <option value="Vue">Vue</option>
                    <option value="Angular">Angular</option>
                    <option value="Node">Node</option>
                    <option value="Nest">Nest</option>
                </select>

                <Input placeholder='Введите описание поста' name='content' textarea value={data.content} onChange={handleChange}/>



                <Button type='submit' max>Добавить</Button>

            </form>

        </Card>
    );
};

export default AddArticlePage;
