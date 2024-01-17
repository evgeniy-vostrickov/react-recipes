import { recipeSlice } from '../store/slices/recipeSlice';
import { ServerResponse, ServerResponseArray, IRecipe } from '../models/models';
import axios from '../api/api'
import { AppDispatch } from "../store"

export const fetchRecipes = (page: number, count: number, search: string, sort: object) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(recipeSlice.actions.feathing())
            const response = await axios.get<ServerResponseArray<IRecipe>>('recipes', {
                params: { page, count, search, sort: JSON.stringify(sort) }
            })
            console.log(response)
            dispatch(recipeSlice.actions.fetchRecipesSuccess({
                recipes: response.data.results,
                count: response.data.count
            }))
        } catch (error) {
            dispatch(recipeSlice.actions.fetchError(error as Error))
        }
    }
}

export const fetchRecipe = (id: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(recipeSlice.actions.feathing())
            
            const response = await axios.get<ServerResponse<IRecipe>>(`recipes/${id}`)
            console.log(response)
            dispatch(recipeSlice.actions.fetchRecipeSuccess({
                recipe: response.data.results
            }))
        } catch (error) {
            dispatch(recipeSlice.actions.fetchError(error as Error))
        }
    }
}