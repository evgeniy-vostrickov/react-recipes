import { IRecipe } from './../../models/models';
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface IRecipesPayload {
    recipes: IRecipe[],
    count: number
}

interface IRecipePayload {
    recipe: IRecipe
}

interface IRecipeId {
    _id: string
}

interface ICurrentPage {
    page: number
}

interface RecipeState {
    _id: string,
    loading: boolean,
    error: string,
    ITEMS_PER_PAGE: number,
    count: number,
    recipe: IRecipe | null,
    recipes: IRecipe[],
    isChangeRecipes: boolean,
    currentPage: number
}

const initialState: RecipeState = {
    _id: '',
    loading: false,
    error: '',
    ITEMS_PER_PAGE: 9,
    count: 0,
    recipe: null,
    recipes: [],
    isChangeRecipes: false,
    currentPage: 1
}

export const recipeSlice = createSlice({
    name: 'recipe',
    initialState,
    reducers: {
        hello(state) {
            console.log("Hello for recipeSlice")
        },
        feathing(state) {
            state.loading = true
        },
        fetchError(state, action: PayloadAction<Error>) {
            state.loading = false
            state.error = action.payload.message
        },
        fetchErrorNull(state) {
            state.error = ''
        },
        fetchRecipesSuccess(state, action: PayloadAction<IRecipesPayload>) {
            state.loading = false
            state.recipes = action.payload.recipes
            state.count = action.payload.count
            state.error = ''
        },
        fetchRecipeSuccess(state, action: PayloadAction<IRecipePayload>) {
            state.loading = false
            state.recipe = action.payload.recipe
            state.error = ''
        },
        fetchCreateRecipeSuccess(state, action: PayloadAction<IRecipeId>) {
            state.loading = false
            state._id = action.payload._id
            state.error = ''
        },
        changeFlagDeleteRecipes(state) {
            state.isChangeRecipes = !state.isChangeRecipes
        },
        setNullId(state) {
            state._id = ''
        },
        setNullRecipe(state) {
            state.recipe = null
        },
        changeCurrentPage(state, action: PayloadAction<ICurrentPage>) {
            state.currentPage = action.payload.page
        }
    }
})

export const recipeActions = recipeSlice.actions
export const recipeReducer = recipeSlice.reducer