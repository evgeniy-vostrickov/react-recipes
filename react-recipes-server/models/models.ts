import {ObjectID} from 'bson';

export interface IRecipe {
    _id: ObjectID,
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