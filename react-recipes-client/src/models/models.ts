// interface IIngredient {
//     ingredient: string
// }
// interface IDirections {
//     direction: string
// }
// interface INer {
//     name: string
// }

export interface IRecipe {
    _id: string,
    title: string,
    ingredients: string[],
    directions: string[],
    link: string,
    source: string,
    NER: string[],
    image: string,
    kol_ingredients: number,
    kol_directions: number
}

export interface ServerResponseArray<T> {
    status: number,
    count: number,
    results: T[]
}

export interface ServerResponse<T> {
    status: number,
    results: T
}

export interface ServerResponseId {
    status: number,
    results: string
}