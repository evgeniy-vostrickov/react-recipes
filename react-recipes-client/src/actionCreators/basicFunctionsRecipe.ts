import { IRecipeForm } from '../pages/RecipeCreateUpdatePage';
import { recipeSlice } from '../store/slices/recipeSlice';
import { ServerResponseId, IRecipe } from '../models/models';
import axios from '../api/api'
import { AppDispatch } from "../store"

export const createUpdateRecipe = (formData: IRecipeForm, id: string | undefined) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(recipeSlice.actions.feathing())
            const { title, source, link, image } = formData
            let newRecipe = { title, source, link, image } as IRecipe
            newRecipe.NER = formData.NER.split(', ')
            newRecipe.ingredients = formData.ingredients.split('\n')
            newRecipe.directions = formData.directions.split('\n')
            newRecipe.kol_ingredients = newRecipe.ingredients.length
            newRecipe.kol_directions = newRecipe.directions.length
            console.log(newRecipe)

            const response = id ?
                await axios.put<ServerResponseId>('recipes', { newRecipe, id }) :
                await axios.post<ServerResponseId>('recipes', { newRecipe })

            console.log(response)
            dispatch(recipeSlice.actions.fetchCreateRecipeSuccess({
                _id: response.data.results,
            }))
        } catch (error) {
            dispatch(recipeSlice.actions.fetchError(error as Error))
        }
    }
}

export const deleteRecipe = (id: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await axios.delete<ServerResponseId>('recipes', {
                params: { id }
            })

            dispatch(recipeSlice.actions.changeFlagDeleteRecipes())

            console.log(response)
        } catch (error) {
            dispatch(recipeSlice.actions.fetchError(error as Error))
        }
    }
}