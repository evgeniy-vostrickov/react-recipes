import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { createUpdateRecipe } from "../actionCreators/basicFunctionsRecipe";
import { fetchRecipe } from "../actionCreators/fetchRecipes";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { recipeSlice } from "../store/slices/recipeSlice";
import { Alert } from "@material-tailwind/react";
// import classes from './Page.module.css'

export type IRecipeForm = {
    title: string,
    NER: string,
    ingredients: string,
    directions: string,
    source: string,
    link: string,
    image: string,
}

type PropsType = {
    editMode: boolean
}

export const RecipeOperationPage: React.FC<PropsType> = ({ editMode }) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { id } = useParams<{ id?: string }>()
    const { _id, loading, recipe, error } = useAppSelector(state => state.recipe)

    let defaultValuesForm: IRecipeForm = {
        title: '',
        NER: '',
        ingredients: '',
        directions: '',
        source: '',
        link: '',
        image: '',
    };
    const { register, handleSubmit, formState: { errors }, reset } = useForm<IRecipeForm>({
        defaultValues: defaultValuesForm,
        mode: "onBlur"
    })

    useEffect(() => {
        if (id) 
            dispatch(fetchRecipe(id))
        
        return () => {
            dispatch(recipeSlice.actions.setNullId())
        }
    }, [])

    useEffect(() => {
        if (id && recipe) {
            let { title, source, link, image, ingredients, NER, directions } = recipe
            defaultValuesForm = { title, source, link, image, ingredients: ingredients.join('\n'), NER: NER.join(', '), directions: directions.join('\n') }
            reset(defaultValuesForm)
        }
    }, [recipe])

    useEffect(() => {
        if (!error && _id)
            navigate(`/recipe/${_id}`)
    }, [_id])

    // Возвращает массив ключей заданного объекта
    //     function typedKeys<T>(object: IRecipe): (keyof T)[] {
    //         return Object.keys(object) as (keyof T)[];
    //     }

    const onSubmit: SubmitHandler<IRecipeForm> = (formData) => {
        dispatch(createUpdateRecipe(formData, id))
    };

    if (loading) return <p>Loading...</p>
    return (
        <>
            {error &&
                <Alert color="red" style={{ margin: "5px auto", width: "99vw", zIndex: "10" }} onTap={() => dispatch(recipeSlice.actions.fetchErrorNull())} >
                    {error}
                </Alert>
            }
            <div className="block p-6 rounded-lg shadow-lg bg-white max-w-lg m-auto mt-10">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="text-center pb-3 font-bold text-lg">Создание рецепта</h1>
                    <div className="form-group mb-6">
                        <input type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal  text-gray-700  bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="title"
                            placeholder="Название рецепта" {...register("title",
                                {
                                    required: 'Поле обязательно для заполнения',
                                    maxLength: {
                                        value: 250,
                                        message: 'Число символов должно быть меньше 250'
                                    }
                                })} />
                        {errors.title && <p className="text-red-500 text-xs italic">{errors.title.message}</p>}
                    </div>
                    <div className="form-group mb-6">
                        <input type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal  text-gray-700  bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="NER"
                            placeholder="Составляющие" {...register("NER",
                                {
                                    required: 'Поле обязательно для заполнения',
                                    maxLength: {
                                        value: 500,
                                        message: 'Число символов должно быть меньше 500'
                                    }
                                })} />
                        {errors.NER && <p className="text-red-500 text-xs italic">{errors.NER.message}</p>}
                    </div>
                    <div className="form-group mb-6">
                        <textarea
                            className="form-control block w-full px-3 py-1.5 text-base font-normal  text-gray-700  bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="ingredients"
                            rows={5}
                            placeholder="Ингредиенты"
                            {...register("ingredients",
                                {
                                    required: 'Поле обязательно для заполнения',
                                    maxLength: {
                                        value: 500,
                                        message: 'Число символов должно быть меньше 500'
                                    }
                                })} ></textarea>
                        {errors.ingredients && <p className="text-red-500 text-xs italic">{errors.ingredients.message}</p>}
                    </div>
                    <div className="form-group mb-6">
                        <textarea
                            className="form-control block w-full px-3 py-1.5 text-base font-normal  text-gray-700  bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="directions"
                            rows={8}
                            placeholder="Описание"
                            {...register("directions",
                                {
                                    required: 'Поле обязательно для заполнения',
                                    maxLength: {
                                        value: 500,
                                        message: 'Число символов должно быть меньше 500'
                                    }
                                })} ></textarea>
                        {errors.directions && <p className="text-red-500 text-xs italic">{errors.directions.message}</p>}
                    </div>
                    <div className="form-group mb-6">
                        <input type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal  text-gray-700  bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="link"
                            placeholder="Ссылка на рецепт" {...register("link",
                                {
                                    maxLength: {
                                        value: 100,
                                        message: 'Число символов должно быть меньше 100'
                                    }
                                })} />
                        {errors.link && <p className="text-red-500 text-xs italic">{errors.link.message}</p>}
                    </div>
                    <div className="form-group mb-6">
                        <input type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal  text-gray-700  bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="image"
                            placeholder="Ссылка на фото рецепта" {...register("image",
                                {
                                    maxLength: {
                                        value: 100,
                                        message: 'Число символов должно быть меньше 100'
                                    }
                                })} />
                        {errors.image && <p className="text-red-500 text-xs italic">{errors.image.message}</p>}
                    </div>
                    <div className="form-group mb-6">
                        <input type="text" className="hidden" id="source" value="Gathered" {...register("source", {})} />
                    </div>
                    <button type="submit" className="w-full px-6 py-2.5  bg-blue-600  text-white font-medium text-xs leading-tight uppercase rounded shadow-md  hover:bg-blue-700 hover:shadow-lg  focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0  active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Сохранить</button>
                </form>
            </div>
            <NavLink className="absolute left-0 top-0 h-10 m-2 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded-full" to={'/'}>На главную</NavLink>
        </>
    )
}

