import { IRecipe } from './../models/models';
const lineReader = require('line-reader')
const fs = require("fs");
const join = require("path").join
const oldDataRecipes = join(__dirname, '..', 'test_data.csv')
const newDataRecipes = join(__dirname, '..', 'new_test_data.csv')

function chooseRandUrlImage() {
    const masUrlImage = [
        "https://avatars.dzeninfra.ru/get-zen-logos/201842/pub_60bbb0ab546bf850ad49b8ee_60c88fcffec57a5bead7e8e4/xxh",
        "https://img.foto-receptik.ru/recipe/3/323/322634.jpg",
        "https://kalpavriksha.by/wp-content/uploads/2020/06/TORTIK-800x800.jpg",
        "https://i.pinimg.com/originals/16/03/4e/16034e61e57760ef5a799c036e6d18c9.jpg",
        "https://i.pinimg.com/originals/6e/ba/01/6eba01eb1af9a2b06d36dfb35efcd18e.jpg",
        "https://www.sclipire.ro/wp-content/uploads/2018/01/192916.qcshkc.840.jpg",
        "https://yankelevitch.ru/wp-content/uploads/6/a/c/6acbed4340e01f0b88db27ff064ae3d0.jpeg",
        "https://maxvps.ru/wp-content/uploads/4/9/3/49322d87a78ab20c8210485ee7eb3782.jpeg",
        "https://heaclub.ru/tim/f7940ad47727017b3e0e130051ffa185/salat-quotcarskii-ruletquot.jpg",
        "https://i.pinimg.com/originals/97/8f/99/978f998f3c7533a4262d6d9ee76b1566.jpg",
        "https://i.pinimg.com/originals/3a/9d/9c/3a9d9c509c3de78a8828401ff220272d.jpg",
        "https://i.ytimg.com/vi/b_bqsur2XUw/maxresdefault.jpg?7857057827",
        "https://vladtime.ru/uploads/posts/2020-12/1608315463_bignbcwphjl4x89oyf1ik3z07t2a56urmdsvgeq.jpeg",
        "https://i.pinimg.com/736x/22/de/79/22de796a068a0cd0342313cc1d54f98b--image-search.jpg",
        "https://travel-dom.ru/wp-content/uploads/2018/06/mushrooms.jpg",
        "https://eda.sb.by/upload/resize_cache/iblock/e45/850_850_0/e458577d4d1152526c32df37c86e9fa1.jpg",
        "https://kartoshkaplus.ru/wp-content/uploads/2020/02/salat-s-kartoshkoj-i-kuritsej-1-3.jpg",
    ]
    var rand = Math.floor(Math.random() * masUrlImage.length);
    return masUrlImage[rand];
}

exports.writeFileRecipes = (allRecipes: IRecipe[]) => {
    let masInsertDataRecipes = [""]
    // fs.appendFileSync(newDataRecipes, "");
    allRecipes.forEach(recipe => {
        let urlImage = chooseRandUrlImage()
        let kolIngredients = recipe.ingredients.length
        let kolDirections = recipe.directions.length
        masInsertDataRecipes.push("," + urlImage + "," + kolIngredients + "," + kolDirections)
    });

    lineReader.eachLine(oldDataRecipes, async function (line: string) {
        fs.appendFileSync(newDataRecipes, line + masInsertDataRecipes.shift() + '\n');
    });
}