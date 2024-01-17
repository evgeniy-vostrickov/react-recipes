import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import ReactPaginate from 'react-paginate';
import { RecipeCard } from "../components/Recipes/RecipeCard";
import { fetchRecipes } from "../actionCreators/fetchRecipes";
import { RecipesSearch } from "../components/Recipes/RecipeSearch";
import { useNavigate } from "react-router-dom";
import { recipeSlice } from "../store/slices/recipeSlice";

export type ISort = {
   [field: string]: number
}

export const MainPage = () => {
   const dispatch = useAppDispatch()
   const navigate = useNavigate()

   const [search, setSearch] = useState("")
   const [sort, setSort] = useState<ISort>({})

   const { recipes, currentPage, ITEMS_PER_PAGE, loading, count, error, isChangeRecipes } = useAppSelector(state => state.recipe)

   const pageCount = Math.ceil(count / ITEMS_PER_PAGE)

   const pageChangeHandler = ({ selected }: { selected: number }) => {
      dispatch(recipeSlice.actions.changeCurrentPage({page: selected + 1}))
      dispatch(fetchRecipes(selected + 1, ITEMS_PER_PAGE, search, sort))
   }

   const createNewRecipe = () => (navigate(`/recipe/create`))

   useEffect(() => {
      dispatch(fetchRecipes(currentPage, ITEMS_PER_PAGE, search, sort))
   }, [dispatch, isChangeRecipes])

   return (
      <div className="container mx-auto p-4 flex justify-center">
         <div>
            <RecipesSearch ITEMS_PER_PAGE={ITEMS_PER_PAGE} search={search} setSearch={setSearch} sort={sort} setSort={setSort} />

            {error && <p className="text-red-600">{error}</p>}

            <div className="min-w-[1024px]">
               {loading && <p className="text-center">Loading...</p>}

               {
                  count > 0
                     ? recipes.map(recipe => (
                        <RecipeCard key={recipe._id} recipe={recipe} />
                     ))
                     : <p className="text-center">No items</p>
               }

               {pageCount && <ReactPaginate
                  breakLabel="..."
                  nextLabel=">"
                  onPageChange={pageChangeHandler}
                  pageRangeDisplayed={3}
                  pageCount={pageCount}
                  forcePage={currentPage - 1}
                  previousLabel="<"
                  containerClassName="flex"
                  pageClassName="border py-1 px-3 mr-2"
                  activeClassName="bg-gray-500 text-white"
                  previousClassName="border py-1 px-3 mr-2"
                  nextClassName="border py-1 px-3"
               />}
            </div>
         </div>
         <button onClick={createNewRecipe} className="absolute right-0 h-12 m-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full">
            Создать рецепт
         </button>
      </div>
   )
}