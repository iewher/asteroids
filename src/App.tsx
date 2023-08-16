import React from "react";
import "./scss/app.scss";
import Main from "./components/main/main.tsx";
import PageAsteroids from "./components/page-asteroids/page-asteroid.tsx";
import SendPage from "./components/send/send-page.tsx";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AppRoute } from "./components/const";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.ROOT} element={<Main />} />
        <Route path={AppRoute.ASTEROID_PAGE} element={<PageAsteroids />} />
        <Route path={AppRoute.SEND_PAGE} element={<SendPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
