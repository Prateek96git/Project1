import React from 'react'
import{ BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './component/Home';   // default import
import Menu from './component/Menu';
import Pnf from './component/Pnf';
import Track from './component/Track';

function App() {
  return (
    <BrowserRouter>
     <Menu/>
     <Routes>
      <Route exact path={'/'} element={<Home/>} />
      <Route exact path={'/home'} element={<Home/>} />
      <Route exact path={'/track/:trackId'} element={<Track/>} />
      <Route exact path={'/*'} element={<Pnf/>} />
     </Routes>
    </BrowserRouter>
  );
}

export default App;
// without curly bracket in component is called import default or export default
// with curly bracket in component is called constant import or constant export 
// constant import and constant export will not have any default keyword
// while exporting we use export keyword
// while importing we use curly bracket and it is not for components but it is for objects, functions and api or constant variables