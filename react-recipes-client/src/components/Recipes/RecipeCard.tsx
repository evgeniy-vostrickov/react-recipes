import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { deleteRecipe } from "../../actionCreators/basicFunctionsRecipe";
import { useAppDispatch } from "../../hooks/redux";
import { IRecipe } from "../../models/models";

type PropsType = {
    recipe: IRecipe,
}

export const RecipeCard: React.FC<PropsType> = ({ recipe }) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const updateRecipe = (id: string) => {
        return () => navigate(`/recipe/update/${id}`)
    }

    const deleteSelectRecipe = (id: string) => {
        return () => dispatch(deleteRecipe(id))
    }
    return (
        <div className="flex justify-center my-5">
            <div className="flex relative flex-col md:flex-row w-4/5 rounded-lg bg-white shadow-lg">
            <NavLink className="flex" to={'/recipe/' + recipe._id}><img className=" w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg" src={recipe.image} alt="" /></NavLink>
                <div className="p-6 flex flex-col justify-start">
                    <NavLink className="text-gray-900 text-xl font-medium mb-2" to={'/recipe/' + recipe._id}>{recipe.title}</NavLink>
                    {
                        recipe.ingredients.map((ingredient: string, num: number) => (
                            <div className="text-gray-700 text-base" key={num}>{++num + ") " + ingredient}</div>
                        ))
                    }
                    <p className="text-gray-600 text-xs mt-4">{recipe.link}</p>
                </div>
                <div className="absolute right-0 bottom-0">
                    <button onClick={updateRecipe(recipe._id)} className="h-1/6 m-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full">
                        Изменить
                    </button>
                    <button onClick={deleteSelectRecipe(recipe._id)} className="h-1/6 m-2 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded-full">
                        Удалить
                    </button>
                </div>
            </div>
        </div>
    )
}