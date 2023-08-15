import React from "react";
import "./scss/app.scss";
import Main from "./components/main/main.tsx";
import PageAsteroids from "./components/pageAsteroids/page-asteroid.tsx";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AppRoute } from "./components/const";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.ROOT} element={<Main />} />
        <Route path={AppRoute.ASTEROID_PAGE} element={<PageAsteroids />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
