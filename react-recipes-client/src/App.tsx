import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { RecipeDetailPage } from './pages/RecipeDetailPage';
// import { AuthPage } from './pages/AuthPage';
import { MainPage } from './pages/MainPage';
// import { Navigation } from './components/Navigation';
import { useAppDispatch } from './hooks/redux';
import { RecipeOperationPage } from './pages/RecipeCreateUpdatePage';

// React.FC(FunctionComponent) - явно говорим, что App является функцией
const App: React.FC = () => {
  const dispatch = useAppDispatch()

  // useEffect(() => {
  //   dispatch(fetchHandbooks())
  // }, [dispatch])

  return (
    <div>
      {/* <Navigation /> */}
      <Routes>
        <Route path="/" element={ <MainPage /> }></Route>
        <Route path="/recipe/:id" element={ <RecipeDetailPage /> }></Route>
        <Route path="/recipe/create" element={ <RecipeOperationPage editMode={false} /> }></Route>
        <Route path="/recipe/update/:id" element={ <RecipeOperationPage editMode={true} /> }></Route>
        {/* <Route path="/airport/:id" element={ <AirportDetailPage /> }></Route> */}
      </Routes>
    </div>
  )
}

export default App;
