import React, { ChangeEvent, useEffect, useState } from 'react'
import { Select, Option } from "@material-tailwind/react";
import { useDebounce } from "../../hooks/debounce";
import axios from '../../api/api';
import { IRecipe, ServerResponseArray } from "../../models/models";
import classes from './Component.module.css'
import { useNavigate } from "react-router-dom";
import { fetchRecipes } from '../../actionCreators/fetchRecipes';
import { useAppDispatch } from '../../hooks/redux';
import { ISort } from '../../pages/MainPage';
import { recipeSlice } from '../../store/slices/recipeSlice';

type PropsType = {
  ITEMS_PER_PAGE: number,
  search: string,
  setSearch: (search: string) => void,
  sort: ISort,
  setSort: (sort: ISort) => void,
}

export const RecipesSearch: React.FC<PropsType> = ({ ITEMS_PER_PAGE, search, setSearch, sort, setSort }) => {
  const [results, setResults] = useState<IRecipe[]>([])
  const navigate = useNavigate()
  const [dropdown, setDropdown] = useState(false)
  const dispatch = useAppDispatch()

  const debounced = useDebounce<string>(search, 500)

  async function searchRecipes(search: string) {
    // console.log(search)
    const res = await axios.get<ServerResponseArray<IRecipe>>(`recipes`, {
      params: {
        count: 10,
        page: 1,
        search
      }
    })
    setResults(res.data.results)
  }

  useEffect(() => {
    if (debounced.length >= 3) {
      searchRecipes(debounced).then(() => setDropdown(true))
    } else {
      setDropdown(false)
    }
  }, [debounced])

  function changeHandler(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value)
  }

  function renderDropdown() {
    if (results.length === 0) {
      return <p className="text-center">No results!</p>
    }

    return results.map(recipe => (
      <li
        key={recipe._id}
        onClick={() => navigate(`/recipe/${recipe._id}`)}
        className="cursor-pointer hover:bg-gray-500 hover:text-white py-2 px-4"
      >{recipe.title}</li>
    ))
  }

  async function submitHandler() {
    setDropdown(false)
    dispatch(fetchRecipes(1, ITEMS_PER_PAGE, search, sort))
  }

  function sortHandler(fieldSort: any) {
    let tempObject: ISort = {}
    if (fieldSort !== "notSort")
      tempObject[fieldSort] = 1
    setSort(tempObject)
    dispatch(fetchRecipes(1, ITEMS_PER_PAGE, search, tempObject))
    dispatch(recipeSlice.actions.changeCurrentPage({page: 1}))
  }

  // interface SelectStylesType {
  //   styles: {
  //     base: {
  //       container: {
  //         position: "relative",
  //         width: "w-full",
  //         minWidth: "min-w-[150px]",
  //       },
  //     };
  //   };
  // }

  return (
    // <div className="mb-4 relative">
    //   <input
    //     className="border px-4 py-2 w-full outline-0 h-[42px]"
    //     type="text"
    //     onChange={changeHandler}
    //     onSubmit={submitHandler}
    //     value={search}
    //     placeholder="Search for airport..."
    //   />

    //   {
    //      dropdown && <ul className={classes.dropdown}> { renderDropdown() } </ul> 
    //   }
    // </div>
    <div className="flex justify-center">
      <div className="mb-3 xl:w-4/6">
        <div className="input-group relative flex items-stretch w-full mb-4">
          <input type="search" className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mr-1" placeholder="Набор составляющих" aria-label="Search" aria-describedby="button-addon2"
            onChange={changeHandler}
            onSubmit={submitHandler}
            value={search} />
          <button className="btn px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center" type="button" id="button-addon2"
            onClick={submitHandler}>
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" className="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
            </svg>
          </button>
          {
            dropdown && <ul className={classes.dropdown}> {renderDropdown()} </ul>
          }
          <div className="w-64 ml-2">
            <Select label="Отсортировать" color="purple" onChange={sortHandler}>
              <Option value="title">По Названию</Option>
              <Option value="kol_ingredients">По Ингридиентам</Option>
              <Option value="kol_directions">По Этапам</Option>
              <Option value="notSort">Не сортировать</Option>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )
}