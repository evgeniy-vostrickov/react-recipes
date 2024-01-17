import { ObjectID } from 'bson';
import { IRecipe } from './../models/models';
import { Request, Response, Express } from 'express'
import * as mongoDB from "mongodb";

const response = require('../settings/response')
const writeFile = require('../settings/writeFileRecipes')
module.exports = (app: Express, db: mongoDB.Db) => {
    app.get('/recipes', async (req: Request<{}, { recipes: IRecipe[] }, {}, { count: string, page: string, search: string, sort: string }>, res: Response<{ recipes: IRecipe[] }, {}>) => {
        try {
            const collection = db.collection("test_recipes")

            // Функция обновление данных для превращения строки массивов в просто массив
            // let updateRecipes = await collection.find().toArray()
            // for (let recipe of updateRecipes) {
            //     collection.updateOne(recipe, {$set: {NER : JSON.parse(recipe.NER), ingredients: JSON.parse(recipe.ingredients), directions: JSON.parse(recipe.directions)}})
            // }

            // Добавление новых полей в файл csv
            // let allListRecipes = await collection.find().toArray() as IRecipe[]
            // writeFile.writeFileRecipes(allListRecipes)

            let ingredients = req.query.search ? req.query.search.split(', ') : []
            const fieldSort = req.query.sort ? JSON.parse(req.query.sort) : {}
            const fieldFind = req.query.search ? { NER: { $all: ingredients } } : {}
            let recipes: IRecipe[] = []
            let count = 0

            recipes = await collection.find(fieldFind).sort(fieldSort).limit(+req.query.count).skip(+req.query.count * (+req.query.page - 1)).toArray() as IRecipe[]
            let allRecipes = await collection.find(fieldFind).toArray() as IRecipe[]
            count = allRecipes.length

            let data = { "results": recipes, "count": count }
            response.status(200, data, res)
        } catch (error: any) {
            console.log(error.message, error.stack)
            response.status(400, { "message": error.message }, res)
        }
    })
    app.get('/recipes/:id', async (req: Request<{ id: string }, { recipes: IRecipe }, {}, {}>, res: Response<{ recipes: IRecipe }, {}>) => {
        try {
            const collection = db.collection("test_recipes")
            let recipe = await collection.findOne({ _id: new ObjectID(req.params.id) })

            let data = { "results": recipe }
            response.status(200, data, res)
        } catch (error: any) {
            console.log(error.message, error.stack)
            response.status(400, { "message": error.message }, res)
        }
    })
    app.post('/recipes/', async (req: Request<{}, { data: string }, { newRecipe: IRecipe }, {}>, res: Response<{ data: string }, {}>) => {
        try {
            // console.log(req.body)
            const collection = db.collection("test_recipes")
            let insertRecipe = await collection.insertOne(req.body.newRecipe)

            let data = { "results": insertRecipe.insertedId }
            response.status(200, data, res)
        } catch (error: any) {
            console.log(error.message, error.stack)
            response.status(400, { "message": error.message }, res)
        }
    })
    app.put('/recipes/', async (req: Request<{}, { data: string }, { newRecipe: IRecipe, id: string }, {}>, res: Response<{ data: string }, {}>) => {
        try {
            console.log(req.body.newRecipe)
            console.log(req.body.id)
            const collection = db.collection("test_recipes")
            let oldRecipe = await collection.findOne({ _id: new ObjectID(req.body.id) })
            if (oldRecipe)
                collection.replaceOne(oldRecipe, req.body.newRecipe)

            let data = { "results": req.body.id }
            response.status(200, data, res)
        } catch (error: any) {
            console.log(error.message, error.stack)
            response.status(400, { "message": error.message }, res)
        }
    })
    app.delete('/recipes/', async (req: Request<{}, { data: string }, {}, { id: string }>, res: Response<{ data: string }, {}>) => {
        try {
            console.log(req.query)
            const collection = db.collection("test_recipes")
            let recipe = await collection.findOne({ _id: new ObjectID(req.query.id) })
            if (recipe)
                collection.deleteOne(recipe)

            let data = { "results": `Рецепт под id: ${req.query.id} успешно удален!` }
            response.status(200, data, res)
        } catch (error: any) {
            console.log(error.message, error.stack)
            response.status(400, { "message": error.message }, res)
        }
    })
}