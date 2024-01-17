import React, { useEffect } from 'react'
import { NavLink, useParams } from "react-router-dom";
import { fetchRecipe } from '../actionCreators/fetchRecipes';
import { useAppDispatch, useAppSelector } from "../hooks/redux";

export const RecipeDetailPage = () => {
  const params = useParams<'id'>()
  const dispatch = useAppDispatch()
  const { loading, recipe } = useAppSelector(state => state.recipe)

  useEffect(() => {
    dispatch(fetchRecipe(params.id!))
  }, [dispatch, params.id])

  if (loading) return <p>Loading...</p>

  return (
    <>
      <div className="flex justify-center mx-auto my-5 w-2/3">
        <div className="flex relative flex-col md:flex-row w-4/5 rounded-lg bg-white shadow-lg">
          <img className=" w-full h-96 md:h-auto object-cover md:w-64 rounded-t-lg md:rounded-none md:rounded-l-lg" src={recipe?.image} alt="" />
          <div className="p-6 flex flex-col justify-start">
            <h5 className="text-gray-900 text-xl font-medium mb-2 text-center">{recipe?.title}</h5>
            <p className="text-gray-700 text-base mb-4">Состав: {recipe?.NER.map((n: string, num: number) => (
              <span key={num}>{n}, </span>
            ))}</p>
            <div className="text-black text-base mb-4">Ингредиенты: {
              recipe?.ingredients.map((ingredient: string, num: number) => (
                <div key={num}>{++num + ") " + ingredient}</div>
              ))
            }</div>
            <div className="text-black text-base mb-4">Шаги: {
              recipe?.directions.map((step: string, num: number) => (
                <div key={num}>{++num + ") " + step}</div>
              ))
            }</div>
            <p className="text-gray-600 text-xs">{recipe?.link}</p>
          </div>
        </div>
      </div>
      <NavLink className="absolute left-0 top-0 h-10 m-2 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded-full" to={'/'}>На главную</NavLink>
    </>
  )
}